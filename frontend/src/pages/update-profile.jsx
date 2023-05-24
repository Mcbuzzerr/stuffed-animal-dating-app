import { ProfileEdit } from "@/components/profileEdit";
import { ProfileCard } from "@/components/profileCard";
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [userProfile, setUserProfile] = useState("");

    useEffect(() => {
        JSON.parse(localStorage.getItem("profile")) != null ? setUserProfile(JSON.parse(localStorage.getItem("profile"))) : setUserProfile(null);
    }, [])

    if (userProfile == null) {
        window.location.href = "/sign-in";
    }


    return (<Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        minHeight: "100vh",
        padding: "1rem"
    }}>
        {userProfile && (<>
            <Box sx={{
                position: "relative",
                // top: "1vh",
                // left: "5vw",
            }}>
                <ProfileEdit userProfile={userProfile} setUserProfileFunction={setUserProfile} />
            </Box>
            <Box sx={{
                position: "sticky",
                top: "50%",
                transform: "translateY(-50%)",
                // right: "10vw",
            }}>
                <ProfileCard user={userProfile} preview />
            </Box>
        </>)}
    </Box>)
}