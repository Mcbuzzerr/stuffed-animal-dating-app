import React from "react";
import { ConversationWindow } from "./conversationWindow";

export default {
    title: "Components/ConversationWindow",
    component: ConversationWindow,
};

const Template = (args) => <ConversationWindow {...args} />;
export const Default = Template.bind({});
Default.args = {
    userProfile: {
        "name": "Bertrum", //Show
        "age": 27, //Show
        "_id": "645c192153a317484dda15e8",
        "profileGUID": "018807c2-2ae8-7df8-921d-fedcc238ccd5",
        "bio": "A really cool guy looking for love in unexpected and expected places", //Show
        "pronouns": ["He", "Him"], //Show
        "pictures": ["https://preview.redd.it/8sgoyzj9rga21.jpg?width=640&crop=smart&auto=webp&v=enabled&s=14208e2f17b3ddcc9a106ec1874490869d926dbe", "https://i.pinimg.com/originals/a1/60/78/a160788677a4d8c6ca68fa2386763b07.jpg", "https://images-cdn.ubuy.co.in/63c69819001e6b042c5259e2-fuggler-funny-ugly-monster-9-inch.jpg"], //Show
        "interests": ["Skiing", "Gaming", "Cartoons", "turtles", "Dogs", "supercalifragilisticexpialidotious"], //Show
        "lookingFor": "Friends", //Show
        "matches": [],
        "likes": [],
        "dislikes": [],
        "doNotifs": true,
        "agePrefs": [
            18,
            100
        ],
        "isHidden": false
    },
    matchProfile: {
        "name": "Sleev Johnson",
        "age": 19,
        "profileGUID": "01883544-ec5e-71de-b3f0-175ac52b7ad6",
        "bio": "Super cool sexyman (not from tumblr)",
        "pronouns": [
            "he/him"
        ],
        "pictures": [],
        "interests": [
            "Acting"
        ],
        "lookingFor": "Fun",
        "matches": [
            "018806c6-f091-7d44-8b85-2425aa863178",
            "018807c2-2ae8-7df8-921d-fedcc238ccd5",
            "0188073d-35e4-7184-b2f9-f9a6ea83bcec",
            "0188073f-f09c-75a3-b33e-f44642e91e11"
        ],
        "likes": [
            {
                "message": "I wanna eat ur jorts",
                "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
            },
            {
                "message": "woah",
                "recipientGUID": "018807c2-2ae8-7df8-921d-fedcc238ccd5"
            },
            {
                "message": "skadoosh",
                "recipientGUID": "0188073d-35e4-7184-b2f9-f9a6ea83bcec"
            },
            {
                "message": "skadoosh",
                "recipientGUID": "0188073f-f09c-75a3-b33e-f44642e91e11"
            },
            {
                "message": "wow",
                "recipientGUID": "01880746-2583-75f5-aed2-1674cd038afc"
            }
        ],
        "dislikes": [
            "018806ca-c595-7538-a7be-68ac915384db",
            "018806ca-c9a8-7cea-b195-8c15cb2596df",
            "018806ca-cd5f-7e99-b54e-756e953a4f85",
            "018806ca-d1d5-7b65-8304-a73a8db1772f"
        ],
        "doNotifs": true,
        "agePrefs": [
            18,
            38
        ],
        "isHidden": false
    }
};
