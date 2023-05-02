import React from 'react';

import { StoryFn } from '@storybook/react';

import { ProfileCard } from './profileCard';

export default {
    title: 'ProfileCard',
    component: ProfileCard,
};

const Template = (args) => <ProfileCard {...args} />;

export const Default = Template.bind({});

Default.args = {
    user: {
        "name": "John Doe",
        "email": "email@website.com",
        "phone": "123-456-7890",
    }
};