import React from 'react';

import { MessageBar } from './messageBar';

export default {
    title: 'Components/MessageBar',
    component: MessageBar,
};

const Template = (args) => <MessageBar {...args} />;
export const Default = Template.bind({});
Default.args = {
    matches: [
        {
            "name": "Same McGuffin",
            "age": 20,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038afc",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "Ur so hot and sexy ahahaha",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "John McGuffin",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038afd",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "What's up with beans?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Rick Jones",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038afe",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "You light up my world like nobody else, and I haven't even met you yet!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Larry Longwood",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Ya like jazz?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        }
    ]
};

export const NoMatches = Template.bind({});
NoMatches.args = {
    matches: []
};

export const YOverflow = Template.bind({});
YOverflow.args = {
    matches: [
        {
            "name": "Same McGuffin",
            "age": 20,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038afc",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "Ur so hot and sexy ahahaha",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "John McGuffin",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038afd",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "What's up with beans?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Rick Jones",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038afe",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "You light up my world like nobody else, and I haven't even met you yet!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Larry Longwood",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://cataas.com/cat?width=50&height=50"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Ya like jazz?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Guy Fieri",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://i.postimg.cc/kg6XXcjh/1-C4753311-tdy-121114-guy-fieri.jpg"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Lets go to flavor town!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Guy Fieri",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://i.postimg.cc/kg6XXcjh/1-C4753311-tdy-121114-guy-fieri.jpg"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Lets go to flavor town!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Guy Fieri",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://i.postimg.cc/kg6XXcjh/1-C4753311-tdy-121114-guy-fieri.jpg"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Lets go to flavor town!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Guy Fieri",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://i.postimg.cc/kg6XXcjh/1-C4753311-tdy-121114-guy-fieri.jpg"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Lets go to flavor town!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Guy Fieri",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://i.postimg.cc/kg6XXcjh/1-C4753311-tdy-121114-guy-fieri.jpg"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Lets go to flavor town!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        },
        {
            "name": "Guy Fieri",
            "age": 19,
            "_id": "645bf961e3edb2af1381e7f9",
            "profileGUID": "01880746-2583-75f5-aed2-1674cd038b00",
            "bio": "",
            "pronouns": [],
            "pictures": ["https://i.postimg.cc/kg6XXcjh/1-C4753311-tdy-121114-guy-fieri.jpg"],
            "interests": [],
            "lookingFor": "",
            "matches": [
                "018806c6-f091-7d44-8b85-2425aa863178"
            ],
            "likes": [
                {
                    "message": "What's up with tacos?",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa7fffff"
                },
                {
                    "message": "Lets go to flavor town!",
                    "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                }
            ],
            "dislikes": [],
            "doNotifs": true,
            "agePrefs": [],
            "isHidden": false
        }
    ]
};
