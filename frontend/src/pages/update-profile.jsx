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
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: "100vh"
    }}>
        {userProfile && (<>
            <ProfileEdit userProfile={userProfile} setUserProfileFunction={setUserProfile} />
            <ProfileCard user={userProfile} preview />
        </>)}
    </Box>)
}