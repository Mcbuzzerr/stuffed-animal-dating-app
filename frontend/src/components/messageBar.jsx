import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import Head from "next/head";
import { display } from "@mui/system";


export const MessageBar = ({ matches }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandedToggle = () => {
        setExpanded(!expanded);
    };

    if (!matches) matches = [];

    return (
        <Card sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: expanded ? 0 : "none",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            overflowY: "auto",
            textAlign: matches == 0 ? "center" : "left",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: "none",
            zIndex: 3,
        }}>
            <Box sx={{ width: "calc(100% - 2rem)", padding: "1rem", borderBottom: expanded ? "2px solid #ebebeb" : "none", position: "sticky", display: "flex", justifyContent: "flex-start", height: "56px", alignItems: "center" }}>
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }}>Messages</Typography>
                <Button variant="contained" onClick={handleExpandedToggle} sx={{ marginLeft: "1rem" }}>{expanded ? "close" : "open"}</Button>
            </Box>
            {expanded ?
                (matches.length != 0 ? matches.map((match) => {
                    let PreviewMessage = "No messages yet";

                    for (let i = 0; i < match.likes.length; i++) {
                        if (match.likes[i].recipientGUID == JSON.parse(localStorage.getItem("user")).profileGUID) {
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
                                <Box sx={{ width: 56, height: 56, display: "inline-block", borderRadius: "50%", marginRight: "1rem", backgroundColor: "grey", backgroundImage: `url(${match.pictures[0]})`, backgroundSize: "cover" }}> </Box>
                                <Box sx={{}}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>{match.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{PreviewMessage}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                }) : <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold", padding: "1rem" }}>No matches yet<br />Time to get matching!</Typography>) : null}
        </Card>)
}