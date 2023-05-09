from pydantic import BaseModel, Field
from typing import Optional
from uuid6 import uuid7


class User_create(BaseModel):
    # Email of user
    email: str
    # Password of user
    password: str


class User_auth(User_create):
    # GUID of user_auth
    user_authGUID: str = Field(uuid7())
    # GUID of profile
    profileGUID: str = ""
    # Whether or not the user is deleted
    isDeleted: bool = False
    # Whether or not the user is an admin
    isAdmin: bool = False
