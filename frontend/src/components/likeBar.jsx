import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField } from "@mui/material";
import Head from "next/head";

export const LikeBar = ({ isDisabled, profileID }) => {
    const handleLike = () => {
        console.log("liked " + profileID)
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
            <TextField size="small" placeholder={isDisabled ? 'Come back tomorrow!' : "Your message here"} disabled={isDisabled} sx={{ backgroundColor: "white", borderRadius: "5px" }} />
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
                    color: isDisabled ? "#a0a0a0" : "#3ded97",
                    "&:hover": {
                        cursor: isDisabled ? "default" : "pointer",
                        color: isDisabled ? "#a0a0a0" : "#13cb71",
                        backgroundColor: isDisabled ? "#ebebeb" : "#c5c5c5",
                    },
                    "&:active": {
                        color: isDisabled ? "#a0a0a0" : "#02ba60",
                        backgroundColor: isDisabled ? "#ebebeb" : "#b4b4b4",
                    }
                }}>
                <i class="fi fi-ss-heart" style={{ height: "24px" }}></i>
            </Box>
        </Box>
    </Box>)
}