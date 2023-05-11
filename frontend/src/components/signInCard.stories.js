import React from 'react';

import { SignInCard } from './signInCard';

export default {
    title: 'SignInCard',
    component: SignInCard,
};

const Template = (args) => <SignInCard {...args} />;
export const Default = Template.bind({});
Default.args = {
};