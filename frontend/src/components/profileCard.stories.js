import React from 'react';

// import { StoryFn } from '@storybook/react';

import { ProfileCard } from './profileCard';

export default {
    title: 'Components/ProfileCard',
    component: ProfileCard,
};

const Template = (args) => <ProfileCard {...args} />;

export const Default = Template.bind({});


let real_user = {
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
}


Default.args = {
    user: real_user
};

export const NoUser = Template.bind({});

NoUser.args = {
    user: null
};