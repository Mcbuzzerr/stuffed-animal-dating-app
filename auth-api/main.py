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

# TUTORIAL: https://docs.sqlalchemy.org/en/20/tutorial/metadata.html


@asynccontextmanager
async def startup(app: FastAPI):
    # connect to SQL database
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
@app.get("/hello")
async def root(Authorize: AuthJWT = Depends()):
    Authorize.jwt_optional()
    current_user = Authorize.get_jwt_subject()
    with Session(app.engine) as session:
        results = session.execute(text("SELECT * FROM UserAuth"))
        for result in results:
            print(result)
    #   session.execute("INSERT INTO Users (params) VALUES (params)", [{params},{params}])
    #   session.commit()

    if current_user is None:
        return {"message": "Hello World"}
    return {"message": f"Hello {current_user}"}


@app.post("/register")
async def register(user_in: User_create):
    new_user = User_auth(**user_in.dict())  # check if user exists
    # if so, return error
    # if not, create user


@app.post("/login")
async def login(user_in: User_create, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # check if user exists
    # if not, return error
    # if so, check if password matches
    # if not, return error
    # if so, return JWT token


@app.patch("/update/{user_id}")
async def update(user_auth: User_auth, user_id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # check if logged in user is the same as the user being updated (or if logged in user is admin)
    # check if target user exists (only if admin, otherwise it is implied)
    # if not, return error
    # if so, update user


@app.delete("/delete/{user_id}")
async def delete(user_id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # check if logged in user is the same as the user being deleted (or if logged in user is admin)
    # check if target user exists (only if admin, otherwise it is implied)
    # if not, return error
    # if so, delete user
