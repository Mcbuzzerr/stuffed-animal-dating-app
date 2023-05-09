from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from decouple import config
from beanie import init_beanie, PydanticObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager
from models.profile_models import Profile, Profile_create


@asynccontextmanager
async def startup(app: FastAPI):
    # connect to MongoDB
    # client = AsyncIOMotorClient("mongodb://root:pass@profile-db:27017")
    # await init_beanie(
    #     database=client.profiles,
    #     document_models=[Profile],
    # )

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


app.post("/profile")


async def create_profile(profile: Profile_create):
    new_profile = Profile(**profile.dict())
    # await new_profile.insert() #copilot line, not sure if it works
    # check if profile exists
    # if so, return error
    # if not, create profile


@app.patch("/profile/{profile_id}")
async def update_profile(
    profile_id: str, profile: Profile, Authorize: AuthJWT = Depends()
):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # check if profile exists
    # if not, return error
    # if so, check if user is owner of profile (or admin)
    # if not, return error
    # if so, update profile
    pass


@app.delete("/profile/{profile_id}")
async def delete_profile(profile_id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # check if profile exists
    # if not, return error
    # if so, check if user is owner of profile (or admin)
    # if not, return error
    # if so, delete profile
    pass


@app.post("/like/{profile_id}")
async def like_profile(profile_id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # check if profile exists
    # if not, return error
    # if so, add profile to liked list
    # check if profile likes current user
    # if so, add profile to matches list for both users
    pass


@app.post("/dislike/{profile_id}")
async def dislike_profile(profile_id: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # check if profile exists
    # if not, return error
    # if so, dislike profile
    pass


@app.get("/profile/get/{count}")
async def get_profiles(count: int, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # get batch of profiles
    # Make sure to exclude profiles that have already been liked/disliked
    # Make sure to exclude profiles that have already been matched
    # Make sure to exclude profiles that have been hidden
    # Make sure to exclude profiles that are outside of age preferences
    # Sort Profiles by "likeness score" (how many interests they share with current user * a multiplier if they are looking for the same thing)
    # Return batch of profiles
    # If no profiles are found, return error
    # I think the way to do this is to get a bit more than the count, then filter out the ones that don't match the criteria
    # then if there are still more than count, return count, otherwise grab more and repeat


@app.get("/profile/get_matches")
async def get_matches(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # Get logged in user
    # Get list of matches
    # Return list of matches
