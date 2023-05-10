from pydantic import BaseModel, Field
from typing import Optional
from uuid6 import uuid7


class user_auth(BaseModel):
    # GUID of user_auth
    user_authGUID: str = Field(default_factory=uuid7())
    # Email of user
    email: str
    # Password of user
    password: str
    # GUID of profile
    profileGUID: str
    # Whether or not the user is deleted
    isDeleted: bool = False
    # Whether or not the user is an admin
    isAdmin: bool = False
