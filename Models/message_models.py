from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid6 import uuid7


class Message_in(BaseModel):
    # Text content of message
    text: str
    # GUID of sender? Just their name? Whatever we need to identify who it is from
    sender: str
    # URL to attachment
    attachment: Optional[str] = None


class Message(Message_in):
    # Time the server received and processed the message
    timeSent: datetime


class Conversation(BaseModel):
    # GUID of conversation
    conversationGUID: str = Field(uuid7())
    # GUID of person 1
    person1: str
    # GUID of person 2
    person2: str
    # List of messages
    messages: list[Message] = []


class Email_Notification(BaseModel):
    # Recipient email address (can be changed to GUID if necesarry)
    recipient: str
    # Subject of email
    subject: str
    # Body of email
    body: str
