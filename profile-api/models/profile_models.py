from pydantic import BaseModel, Field
from typing import Optional
from uuid6 import uuid7
from beanie import Document
from uuid import UUID


class Like_in(BaseModel):
    # Message to send
    message: str


class Like(Like_in):
    # GUID of recipient
    recipientGUID: str


class Profile_create(BaseModel):
    # User's name
    name: str
    # User's age
    age: int


class Profile(Document, Profile_create):
    profileGUID: UUID = Field(default_factory=uuid7)  # Will generate GUID on creation
    # User's bio
    bio: str = ""
    # List of URLs to pictures
    pictures: list[str] = []
    # List of interests (should be changed to a list of Enums later)
    interests: list[str] = []
    # What the user is looking for (should be changed to an Enum later) (Fun/Friends/LongTerm/ShortTerm/etc.)
    lookingFor: str = ""
    # List of IDs corresponding to matches
    matches: Optional[list[str]] = []
    # List of IDs corresponding to liked users
    likes: Optional[list[Like]] = []
    # List of IDs corresponding to diliked users
    dislikes: Optional[list[str]] = []
    # Whether or not to send notifications
    doNotifs: bool = True
    # List of age preferences (min, max)
    agePrefs: Optional[list[int]] = [18, 100]
    # Whether or not to hide profile from other users
    isHidden: bool = False
