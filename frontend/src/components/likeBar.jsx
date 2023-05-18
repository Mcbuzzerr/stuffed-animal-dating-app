import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField } from "@mui/material";
import Head from "next/head";

export const LikeBar = ({ isDisabled, profileID }) => {
    const [message, setMessage] = useState("");
    const [likeDisabled, setLikeDisabled] = useState(true);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        if (e.target.value != 0 && isDisabled == false) {
            setLikeDisabled(false);
        } else if (e.target.value == 0) {
            setLikeDisabled(true);
        }
    }

    const handleLike = () => {
        if (likeDisabled == true) return;
        console.log("liked " + profileID + " with message: " + message);
    }

    return (<Box sx={{ textAlign: "center", marginTop: "1rem" }}>
        <Head>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css' />
        </Head>
        <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
        }}>
            <TextField size="small" placeholder={isDisabled ? 'Come back tomorrow!' : "Your message here"} disabled={isDisabled} sx={{ backgroundColor: "white", borderRadius: "5px" }} onChange={handleMessageChange} />
            <Box
                onClick={handleLike}
                sx={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#ebebeb",
                    border: "solid 1px #a0a0a0",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginLeft: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    lineHeight: "24px",
                    color: likeDisabled ? "#a0a0a0" : "#3ded97",
                    "&:hover": {
                        cursor: likeDisabled ? "default" : "pointer",
                        color: likeDisabled ? "#a0a0a0" : "#13cb71",
                        backgroundColor: likeDisabled ? "#ebebeb" : "#c5c5c5",
                    },
                    "&:active": {
                        color: likeDisabled ? "#a0a0a0" : "#02ba60",
                        backgroundColor: likeDisabled ? "#ebebeb" : "#b4b4b4",
                    }
                }}>
                <i className="fi fi-ss-heart" style={{ height: "24px" }}></i>
            </Box>
        </Box>
    </Box>)
}