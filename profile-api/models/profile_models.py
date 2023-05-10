from pydantic import BaseModel, Field
from typing import Optional
from uuid6 import uuid7
from beanie import Document
from uuid import UUID


class Profile_create(BaseModel):
    # User's name
    name: str
    # User's age
    age: int
    # User's bio
    bio: str


class Profile(Document, Profile_create):
    profileGUID: UUID = Field(uuid7())  # Will generate GUID on creation
    # List of URLs to pictures
    pictures: list[str] = []
    # List of interests (should be changed to a list of Enums later)
    interests: list[str] = []
    # What the user is looking for (should be changed to an Enum later) (Fun/Friends/LongTerm/ShortTerm/etc.)
    lookingFor: str = ""
    # List of IDs corresponding to matches
    matches: Optional[list[str]] = []
    # List of IDs corresponding to liked users
    likes: Optional[list[str]] = []
    # List of IDs corresponding to diliked users
    dislikes: Optional[list[str]] = []
    # Whether or not to send notifications
    doNotifs: bool = True
    # List of age preferences (min, max)
    agePrefs: Optional[list[int]] = []
    # Whether or not to hide profile from other users
    isHidden: bool = False
