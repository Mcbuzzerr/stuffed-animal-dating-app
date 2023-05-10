from fastapi import FastAPI, Depends, HTTPException, Request, Body
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from decouple import config
from beanie import init_beanie, PydanticObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager
from models.profile_models import Profile, Profile_create, Like, Like_in
import uuid


@asynccontextmanager
async def startup(app: FastAPI):
    # connect to MongoDB
    client = AsyncIOMotorClient("mongodb://root:pass@profile-db:27017")
    await init_beanie(
        database=client.profiles,
        document_models=[Profile],
    )

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
    profiles = await Profile.find_all().to_list()
    for profile in profiles:
        print(profile)

    if current_user is None:
        return {"message": "Hello World"}
    return {"message": f"Hello {current_user}"}


@app.post("/profile")
async def create_profile(profile: Profile_create):
    if profile.age < 18:
        raise HTTPException(status_code=400, detail="User must be 18 or older")
    new_profile = Profile(**profile.dict())
    await new_profile.insert()
    return new_profile.profileGUID


@app.patch("/profile/{profileGUID}")
async def update_profile(
    profileGUID: str, profile_in: Profile, Authorize: AuthJWT = Depends()
):
    Authorize.jwt_required()
    profile = await Profile.find_one({"profileGUID": uuid.UUID(profileGUID)})
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")

    if profile_in.name is not None:
        profile.name = profile_in.name
    if profile_in.age is not None:
        profile.age = profile_in.age
    if profile_in.bio is not None:
        profile.bio = profile_in.bio
    if profile_in.pictures is not None:
        profile.pictures = profile_in.pictures
    if profile_in.interests is not None:
        profile.interests = profile_in.interests
    if profile_in.lookingFor is not None:
        profile.lookingFor = profile_in.lookingFor
    if profile_in.matches is not None:
        profile.matches = profile_in.matches
    if profile_in.likes is not None:
        profile.likes = profile_in.likes
    if profile_in.dislikes is not None:
        profile.dislikes = profile_in.dislikes
    if profile_in.doNotifs is not None:
        profile.doNotifs = profile_in.doNotifs
    if profile_in.agePrefs is not None:
        profile.agePrefs = profile_in.agePrefs
    if profile_in.isHidden is not None:
        profile.isHidden = profile_in.isHidden

    await profile.save()
    return {"message": "Profile updated"}


@app.delete("/profile/{profileGUID}")
async def delete_profile(profileGUID: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    await Profile.find_one({"profileGUID": uuid.UUID(profileGUID)}).delete()
    return {"message": "Profile deleted"}


@app.post("/like/{profileGUID}/to/{liked_profileGUID}")
async def like_profile(
    profileGUID: str,
    liked_profileGUID: str,
    message: Like_in = Body(...),
    Authorize: AuthJWT = Depends(),
):
    Authorize.jwt_required()

    profile = await Profile.find_one({"profileGUID": uuid.UUID(profileGUID)})
    liked_profile = await Profile.find_one(
        {"profileGUID": uuid.UUID(liked_profileGUID)}
    )
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    if liked_profile is None:
        raise HTTPException(status_code=404, detail="Liked Profile not found")

    profile.likes.append(Like(message=message.message, recipientGUID=liked_profileGUID))
    for like in liked_profile.likes:
        if like.recipientGUID == profileGUID:
            profile.matches.append(liked_profileGUID)
            liked_profile.matches.append(profileGUID)
            await profile.save()
            await liked_profile.save()
            # Call Message API to create a new chat
            return {"message": "Match!"}
    else:
        await profile.save()
        return {"message": "Profile liked"}
    # check if profile exists
    # if not, return error
    # if so, add profile to liked list
    # check if profile likes current user
    # if so, add profile to matches list for both users


@app.post("/dislike/{profileGUID}/to/{disliked_profileGUID}")
async def dislike_profile(
    profileGUID: str, disliked_profileGUID: str, Authorize: AuthJWT = Depends()
):
    Authorize.jwt_required()

    profile = await Profile.find_one({"profileGUID": uuid.UUID(profileGUID)})
    disliked_profile = await Profile.find_one(
        {"profileGUID": uuid.UUID(disliked_profileGUID)}
    )

    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    if disliked_profile is None:
        raise HTTPException(status_code=404, detail="Disliked Profile not found")

    profile.dislikes.append(disliked_profileGUID)
    await profile.save()

    return {"message": "Profile disliked"}


@app.get("/profile/{profileGUID}/get_batch/{count}")
async def get_profiles(profileGUID: str, count: int, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    user_profile = await Profile.find_one({"profileGUID": uuid.UUID(profileGUID)})

    profiles = []
    skip_count = 0

    # This loop should get a batch of profiles and filter them
    # It should then keep getting batches until it has enough profiles
    # After 5 attempts it should just return the profiles it has
    # This very heavily uses try/except because I'm not sure how to break out of the loops in the way I want
    while len(profiles) < count and skip_count < (5 * count):
        profiles += await Profile.find().skip(skip_count).limit(count).to_list()
        for profile in profiles:
            if profile.profileGUID == uuid.UUID(profileGUID):
                print("removing self")
                try:
                    profiles.remove(profile)
                except:
                    print("already removed")

            for like in user_profile.likes:
                if profile.profileGUID == uuid.UUID(like.recipientGUID):
                    print("removing like")
                    try:
                        profiles.remove(profile)
                    except:
                        print("already removed")

            for dislike in user_profile.dislikes:
                if profile.profileGUID == uuid.UUID(dislike):
                    print("removing dislike")
                    try:
                        profiles.remove(profile)
                    except:
                        print("already removed")

            for match in user_profile.matches:
                if profile.profileGUID == uuid.UUID(match):
                    print("removing match")
                    try:
                        profiles.remove(profile)
                    except:
                        print("already removed")

            if profile.isHidden:
                print("removing hidden")
                try:
                    profiles.remove(profile)
                except:
                    print("already removed")
            # if (
            #     profile.age < user_profile.agePrefs[0]
            #     or profile.age > user_profile.agePrefs[1]
            # ):
            #     profiles.remove(profile)
        skip_count += count

    profileSortIndex = []
    for profile in profiles:
        profileSortIndex.append(
            {
                "profile": profile.profileGUID,
                "score": len(
                    set(profile.interests).intersection(user_profile.interests)
                )
                * (2 if profile.lookingFor == user_profile.lookingFor else 1),
            }
        )

    profileSortIndex.sort(key=lambda x: x["score"], reverse=True)

    # Currently not returning the sorted profiles, just the unsorted ones
    return {
        "profiles": profiles,
        "profileSortIndex": profileSortIndex,
    }
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


@app.get("/profile/{profileGUID}/get_matches")
async def get_matches(profileGUID: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    profile = await Profile.find_one({"profileGUID": uuid.UUID(profileGUID)})

    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")

    output = []
    for match in profile.matches:
        match = await Profile.find_one({"profileGUID": uuid.UUID(match)})
        output.append(match)

    return output
    # Get logged in user
    # Get list of matches
    # Return list of matches
