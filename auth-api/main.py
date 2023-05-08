from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from decouple import config

from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException

import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager


@asynccontextmanager
async def startup(app: FastAPI):
    # connect to SQL database

    await eureka_client.init_async(
        eureka_server="http://eureka:8761/eureka",
        app_name="user-api",
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
    if current_user is None:
        return {"message": "Hello World"}
    return {"message": f"Hello {current_user}"}
