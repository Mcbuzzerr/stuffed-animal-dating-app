import { css } from "@emotion/react";
import styled from "@emotion/styled";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Image } from "@mui/material";


export const ProfileCard = ({ user }) => {
    return (
        <Card sx={{ width: "300px", height: "500px" }}>
            <img src="https://picsum.photos/300/200" alt="profile picture" />
            <Typography variant="h5">Profile</Typography>
            <Typography variant="body1">Name: {user.name}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Phone: {user.phone}</Typography>
        </Card>
    );
}