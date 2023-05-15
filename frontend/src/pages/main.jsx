import { SignInCard } from "@/components/signInCard"
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import { MessageBar } from "@/components/messageBar";
import { ProfileCard } from "@/components/profileCard";
import { useState } from "react";


export default function Page() {
    return (<Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    }}>
        <MessageBar />
        <ProfileCard
        // user={{
        //     "name": "Same McGuffin",
        //     "age": 20,
        //     "_id": "645bf961e3edb2af1381e7f9",
        //     "profileGUID": "01880746-2583-75f5-aed2-1674cd038afc",
        //     "bio": "",
        //     "pronouns": [],
        //     "pictures": ["https://cataas.com/cat?width=50&height=50"],
        //     "interests": [],
        //     "lookingFor": "",
        //     "matches": [
        //         "018806c6-f091-7d44-8b85-2425aa863178"
        //     ],
        //     "likes": [
        //         {
        //             "message": "Ur so hot and sexy ahahaha",
        //             "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
        //         }
        //     ],
        //     "dislikes": [],
        //     "doNotifs": true,
        //     "agePrefs": [],
        //     "isHidden": false
        // }}
        />
    </Box>)
}