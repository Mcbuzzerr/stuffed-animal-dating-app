import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField } from "@mui/material";


export const SignUpCard = ({ }) => {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleAgeChange = (e) => {
        if (isNaN(e.target.value)) return;
        setAge(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignUp = () => {
        if (name.length < 1) return setError("Name is required");
        if (age.length < 1) return setError("Age is required");
        if (age < 18) return setError("You must be 18 or older to use this service");
        if (email.length < 1) return setError("Email is required");
        if (email.indexOf("@") < 0) return setError("Email is invalid");
        if (email.indexOf(".") < 0) return setError("Email is invalid");
        if (password.length < 1) return setError("Password is required");

        const response = fetch("http://localhost:5041/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                name,
                age
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.user != null) {
                window.location.href = "/sign-in";
            } else if (data.detail != null) {
                setError(data.detail);
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
            backgroundColor: "#f5f5f5",
            textAlign: "center"
        }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>Sign Up</Typography>
            {error && (<Typography variant="body1" color={"error"} sx={{ marginBottom: "1rem" }}>{error}</Typography>)}
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Name" size="small" value={name} onChange={handleNameChange} />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Age" size="small" value={age} onChange={handleAgeChange} />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Email" size="small" value={email} onChange={handleEmailChange} type="email" />
            <TextField sx={{ width: "80%", marginBottom: "1rem" }} placeholder="Password" type="password" size="small" value={password} onChange={handlePasswordChange} />

            <Button variant="contained" sx={{ marginTop: 1, width: "80%" }} onClick={handleSignUp}>Sign Up</Button>
            <Button variant="text" color="secondary" sx={{ marginTop: 1 }} href="/sign-in">Sign In</Button>
        </Card>
    </>)
}