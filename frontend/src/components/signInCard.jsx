import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField } from "@mui/material";


export const SignInCard = ({ }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignIn = async () => {
        setError(false);
        const response = await fetch("http://localhost:5041/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data == null || data.detail == "User not found") {
                    setError(true);
                } else {
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
                return data;
            }).then(async (data) => {
                if (localStorage.getItem("token") != null) {
                    const profileGUID = JSON.parse(localStorage.getItem("user")).profileGUID;
                    console.log(profileGUID);
                    const profile = await fetch(`http://localhost:5041/profile/${profileGUID}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(res => {
                        return res.json()
                    })
                        .then(data => {
                            localStorage.setItem("profile", JSON.stringify(data));
                        })
                    window.location.href = "/main";
                }
            })
    }


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
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Email" size="small" value={email} onChange={handleEmailChange} />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Password" size="small" type="password" value={password} onChange={handlePasswordChange} />

            <Button variant="contained" sx={{ marginBottom: "1rem", width: "80%" }} onClick={handleSignIn}>Sign In</Button>
            {error && <Typography variant="body1" color={"error"} sx={{ marginBottom: "1rem" }}>Invalid login credentials</Typography>}
            <Button variant="text" color="secondary" href="/sign-up">Sign Up</Button>

        </Card>
    </>)
}