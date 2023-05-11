from pydantic import BaseModel, Field
from typing import Optional
from uuid6 import uuid7
from enum import Enum


class Looking_for(str, Enum):
    Friends = "Friends"
    Fun = "Fun"
    Long_term = "A Long Term Relationship"
    Short_term = "A Short Term Relationship"
    Adventures = "Adventures"
    Casual_dates = "Casual Dates"
    Activity_partner = "An Activity Partner"
    Dont_know_yet = "Don't Know Yet"
    Cuddle_buddy = "A Cuddle Buddy"
    Other = "Other"


class Interests(str, Enum):
    # List of interests
    Acting = "Acting"
    Agriculture = "Agriculture"
    Animating = "Animating"
    Anime = "Anime"
    Being_a_goblin = "Being a Goblin"
    Being_a_gremlin = "Being a Gremlin"
    Building_things = "Building Things"
    Cartoons = "Cartoons"
    Coding = "Coding"
    Collecting_things = "Collecting Things"
    Computer_science = "Computer Science"
    DIY_projects = "DIY Projects"
    Doing_drugs = "Doing Drugs"
    Drinking = "Drinking"
    Engineering = "Engineering"
    Making_art = "Making Art"
    Making_games = "Making Games"
    Making_music = "Making Music"
    Making_things = "Making Things"
    Making_video = "Making Videos/Films"
    Math = "Math"
    Memes = "Memes"
    Numbers = "Numbers"
    Partying = "Partying"
    Performing = "Performing"
    Playing_with_explosives = "Playing with Explosives"
    Playing_with_fire = "Playing with Fire"
    Playing_with_magnets = "Playing with Magnets"
    Playing_with_pets = "Playing with Pets"
    Rock_climbing = "Rock Climbing"
    School = "School"
    Science = "Science"
    Sewing = "Sewing"
    Smoking = "Smoking"
    Spontaneous_adventures = "Spontaneous Adventures"
    Studying = "Studying"
    Swimming = "Swimming"
    Tabletop_games = "Tabletop Games"
    Urban_exploration = "Urban Exploration"

    # GPT Generated Stuffed Animal Specific
    Crafts = "Crafts"
    Cuddling = "Cuddling"
    Legos = "Legos"
    Making_pillow_forts = "Making Pillow Forts"
    Meditation = "Meditation"
    Picnics = "Picnics"
    Playing_dress_up = "Playing Dress Up"
    Playing_hide_and_seek = "Playing Hide and Seek"
    Playing_outside = "Playing Outside"
    Playing_tag = "Playing Tag"
    Playing_with_bubbles = "Playing with Bubbles"
    Playing_with_toys = "Playing with Toys"
    Reading_bedtime_stories = "Reading Bedtime Stories"
    Taking_naps = "Taking Naps"
    Tea_parties = "Tea Parties"

    # GPT Generated
    Archery = "Archery"
    Badminton = "Badminton"
    Baking = "Baking"
    Baseball = "Baseball"
    Basketball = "Basketball"
    Biking = "Biking"
    Bowling = "Bowling"
    Cooking = "Cooking"
    Cosplay = "Cosplay"
    Dancing = "Dancing"
    Drawing = "Drawing"
    Fashion = "Fashion"
    Fishing = "Fishing"
    Football = "Football"
    Gardening = "Gardening"
    Golf = "Golf"
    Hiking = "Hiking"
    Hockey = "Hockey"
    Hunting = "Hunting"
    Knitting = "Knitting"
    Listening_to_music = "Listening to music"
    Makeup = "Makeup"
    Meditating = "Meditating"
    Painting = "Painting"
    Pickleball = "Pickleball"
    Photography = "Photography"
    Playing_board_games = "Playing board games"
    Playing_card_games = "Playing card games"
    Playing_instruments = "Playing instruments"
    Playing_sports = "Playing Sports"
    Playing_video_games = "Playing video games"
    Pool = "Pool"
    Reading = "Reading"
    Running = "Running"
    Shopping = "Shopping"
    Singing = "Singing"
    Skiing = "Skiing"
    Skateboarding = "Skateboarding"
    Snowboarding = "Snowboarding"
    Soccer = "Soccer"
    Surfing = "Surfing"
    Table_tennis = "Table tennis"
    Tennis = "Tennis"
    Traveling = "Traveling"
    Volleyball = "Volleyball"
    Watching_movies = "Watching movies"
    Watching_sports = "Watching Sports"
    Watching_tv = "Watching TV"
    Working_out = "Working Out"
    Writing = "Writing"
    Yoga = "Yoga"


class Like(BaseModel):
    # GUID of recipient
    recipientGUID: str
    # Message to send
    message: str


class Profile(BaseModel):
    profileGUID: str = Field(default_factory=uuid7())  # Will generate GUID on creation
    # User's name
    name: str
    # User's age
    age: int
    # User's bio
    bio: str
    # User's pronouns
    pronouns: list[str] = []
    # List of URLs to pictures
    pictures: list[str] = []
    # List of interests (should be changed to a list of Enums later)
    interests: list[Interests] = []
    # What the user is looking for (should be changed to an Enum later) (Fun/Friends/LongTerm/ShortTerm/etc.)
    lookingFor: Looking_for = None
    # List of IDs corresponding to matches
    matches: Optional[list[str]] = []
    # List of IDs corresponding to liked users
    likes: Optional[list[Like]] = []
    # List of IDs corresponding to diliked users
    dislikes: Optional[list[str]] = []
    # Whether or not to send notifications
    doNotifs: bool = True
    # List of age preferences (min, max)
    agePrefs: Optional[list[int]] = []
    # Whether or not to hide profile from other users
    isHidden: bool = False
