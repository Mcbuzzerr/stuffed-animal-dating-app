from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from decouple import config

from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException

import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager

from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session

from models.user_auth_models import User_create, User_auth


@asynccontextmanager
async def startup(app: FastAPI):
    # connect to SQL database
    # NOTE I AM DOING THINGS THE LAZY WAY AND USING TEXT QUERIES INSTEAD OF ORM (I have only 4 endpoints and hate SQL ok? :P)
    app.engine = create_engine(
        "mssql+pyodbc://sa:Password123@auth-db/Users?driver=ODBC+Driver+17+for+SQL+Server",
        echo=True,
    )

    # un-comment this when we have a working eureka server
    await eureka_client.init_async(
        eureka_server="http://sada-eureka:8761/eureka",
        app_name="auth-api",
        instance_port=8000,
    )

    yield


app = FastAPI(lifespan=startup)


class Settings(BaseModel):
    authjwt_secret_key: str = config("jwt_secret_key")


@AuthJWT.load_config
def get_config():
    return Settings()


@app.exception_handler(AuthJWTException)
async def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message},
    )


# Hello World
@app.get("/hello", status_code=200)
async def root(Authorize: AuthJWT = Depends()):
    Authorize.jwt_optional()
    current_user = Authorize.get_jwt_subject()
    with app.engine.connect() as conn:
        results = conn.execute(text("SELECT * FROM UserAuth"))
        for user_authGUID, email, password, profileGUID, isDeleted, isAdmin in results:
            print(
                "USER: ",
                user_authGUID,
                email,
                password,
                profileGUID,
                isDeleted,
                isAdmin,
            )
    if current_user is None:
        return {"message": "Hello World"}
    return {"message": f"Hello {current_user}"}


@app.post("/register", status_code=201)
async def register(user_in: User_create):
    with app.engine.connect() as conn:
        results = conn.execute(
            text("SELECT * FROM UserAuth WHERE email = :email"),
            {"email": user_in.email},
        ).one_or_none()

        if results is not None:
            raise HTTPException(
                status_code=400, detail="User already exists with that email"
            )
        else:
            new_user = User_auth(**user_in.dict())  # check if user exists
            # print(new_user.user_authGUID)
            conn.execute(
                text(
                    "INSERT INTO UserAuth VALUES (:user_authGUID, :email, :password, :profileGUID, :isDeleted, :isAdmin)"
                ),
                {
                    "user_authGUID": new_user.user_authGUID,
                    "email": new_user.email,
                    "password": new_user.password,
                    "profileGUID": new_user.profileGUID,
                    "isDeleted": new_user.isDeleted,
                    "isAdmin": new_user.isAdmin,
                },
            )
            conn.commit()
            return {
                "message": "User created successfully",
                "user": {
                    "user_authGUID": new_user.user_authGUID,
                    "email": new_user.email,
                    "profileGUID": new_user.profileGUID,
                    "isAdmin": new_user.isAdmin,
                },
            }
    # if so, return error
    # if not, create user


@app.post("/login", status_code=200)
async def login(user_in: User_create, Authorize: AuthJWT = Depends()):
    with app.engine.connect() as conn:
        results = conn.execute(
            text("SELECT * FROM UserAuth WHERE email = :email"),
            {"email": user_in.email},
        ).one_or_none()

        if results is None:
            raise HTTPException(status_code=404, detail="User not found")
        else:
            if results.password == user_in.password:
                expires_time = timedelta(days=3)
                access_token = Authorize.create_access_token(
                    subject=user_in.email, expires_time=expires_time
                )
                return {
                    "access_token": access_token,
                    "user": {
                        "user_authGUID": results.user_authGUID,
                        "email": results.email,
                        "profileGUID": results.profileGUID,
                        "isAdmin": results.isAdmin,
                    },
                }
    # check if user exists
    # if not, return error
    # if so, check if password matches
    # if not, return error
    # if so, return JWT token


# entirely untested (Dave style 😎)
@app.patch("/update/{user_id}", status_code=200)
async def update(user_auth: User_auth, user_id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    print(current_user)  # I think this value is an email
    with app.engine.connect() as conn:
        results = conn.execute(
            text("SELECT * FROM UserAuth WHERE user_authGUID = :user_authGUID"),
            {"user_authGUID": user_id},
        ).one_or_none()

        if results is None:
            raise HTTPException(status_code=404, detail="User not found")
        else:
            if results.email != current_user and results.isAdmin == False:
                raise HTTPException(status_code=403, detail="Forbidden")
            else:
                conn.execute(
                    "UPDATE UserAuth SET email = :email password = :password profileGUID = :profileGUID isDeleted = :isDeleted isAdmin = :isAdmin WHERE user_authGUID = :user_authGUID",
                    {
                        "email": user_auth.email,
                        "password": user_auth.password,
                        "profileGUID": user_auth.profileGUID,
                        "isDeleted": user_auth.isDeleted,
                        "isAdmin": user_auth.isAdmin,
                        "user_authGUID": user_id,
                    },
                )
                conn.commit()
                return {"message": "User updated successfully"}
    # check if logged in user is the same as the user being updated (or if logged in user is admin)
    # check if target user exists (only if admin, otherwise it is implied)
    # if not, return error
    # if so, update user


# entirely untested (Dave style 😎)
@app.delete("/delete/{user_id}", status_code=204)
async def delete(user_id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    with app.engine.connect() as conn:
        results = conn.execute(
            text("SELECT * FROM UserAuth WHERE user_authGUID = :user_authGUID"),
            {"user_authGUID": user_id},
        ).one_or_none()

        if results is None:
            raise HTTPException(status_code=404, detail="User not found")
        else:
            if results.email != current_user and results.isAdmin == False:
                raise HTTPException(status_code=403, detail="Forbidden")
            else:
                conn.execute(
                    text(
                        "UPDATE UserAuth SET isDeleted = :isDeleted WHERE user_authGUID = :user_authGUID"
                    ),
                    {"isDeleted": True, "user_authGUID": user_id},
                )
                conn.commit()
                return {"message": "User deleted successfully"}
    # check if logged in user is the same as the user being deleted (or if logged in user is admin)
    # check if target user exists (only if admin, otherwise it is implied)
    # if not, return error
    # if so, delete user
