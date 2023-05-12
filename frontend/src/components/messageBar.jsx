import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import Head from "next/head";
import { display } from "@mui/system";


export const MessageBar = ({ matches }) => {



    return (
        <Card sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            overflowY: "auto",
        }}>
            <Box sx={{ width: "calc(100% - 2rem)", padding: "1rem", borderBottom: "2px solid #ebebeb", position: "sticky" }}>
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }}>Messages</Typography>
            </Box>
            {matches.map((match) => {
                let PreviewMessage = "No messages yet";

                for (let i = 0; i < match.likes.length; i++) {
                    if (match.likes[i].recipientGUID == "018806c6-f091-7d44-8b85-2425aa863178") { // HARD CODED CURRENT USER GUID FOR TESTING (should be replaced with a variable grabbed from the stored user in local storage)
                        PreviewMessage = match.likes[i].message;
                    }
                }

                return (
                    <Box onClick={() => { console.log("clicked " + match.profileGUID) }} sx={{ // turn this console.log into a function that opens a chat window with the selected match (whether that's a new page or change to the current page)
                        padding: "1rem",
                        width: "calc(100% - 2rem)",
                        borderBottom: "2px solid #ebebeb",
                        "&:hover": {
                            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
                            cursor: "pointer",
                            backgroundColor: "#efefef",
                        }

                    }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                                alt={match.name}
                                src={match.pictures[0]}
                                style={{ width: 56, height: 56, display: "inline-block", borderRadius: "50%", marginRight: "1rem", backgroundColor: "grey" }}
                            />
                            <Box sx={{}}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>{match.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{PreviewMessage}</Typography>
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </Card>)
}