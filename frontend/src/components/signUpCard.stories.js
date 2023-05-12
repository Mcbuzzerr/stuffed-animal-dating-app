import React from 'react';

import { SignUpCard } from './signUpCard';

export default {
    title: 'Components/SignUpCard',
    component: SignUpCard,
};

const Template = (args) => <SignUpCard {...args} />;
export const Default = Template.bind({});
Default.args = {
};