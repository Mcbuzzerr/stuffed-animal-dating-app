import React from 'react';

import { LikeBar } from './likeBar';

export default {
    title: 'Components/LikeBar',
    component: LikeBar,
};

const Template = (args) => <LikeBar {...args} />;
export const Default = Template.bind({});
Default.args = {
    isDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    isDisabled: true,
};