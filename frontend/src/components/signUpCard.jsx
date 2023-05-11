import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField } from "@mui/material";


export const SignUpCard = ({ }) => {
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
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Sign Up</Typography>
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Name" size="small" />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Age" size="small" />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Email" size="small" />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Password" type="password" size="small" />

            <Button variant="contained" sx={{ marginTop: 1, width: "80%" }}>Sign Up</Button>
            <Button variant="text" color="secondary" sx={{ marginTop: 1 }}>Sign In</Button>
        </Card>
    </>)
}