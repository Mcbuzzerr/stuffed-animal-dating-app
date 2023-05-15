import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField } from "@mui/material";


export const SignInCard = ({ }) => {
    return (<>
        <Card sx={{
            width: "300px",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            backgroundColor: "#f5f5f5"
        }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Sign In</Typography>
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Email" size="small" />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Password" size="small" type="password" />

            <Button variant="contained" sx={{ marginBottom: "1rem", width: "80%" }}>Sign In</Button>
            <Button variant="text" color="secondary" href="/sign-up">Sign Up</Button>

        </Card>
    </>)
}