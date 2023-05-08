from pydantic import BaseModel, Field
from typing import Optional


class user_auth(BaseModel):
    # GUID of user_auth
    user_authGUID: str = Field(...)
    # Email of user
    email: str
    # Password of user
    password: str
    # GUID of profile
    profileGUID: str
    # Whether or not the user is deleted
    isDeleted: bool = False
