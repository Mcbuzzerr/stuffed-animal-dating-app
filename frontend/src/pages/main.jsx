import { SignInCard } from "@/components/signInCard"
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import { MessageBar } from "@/components/messageBar";
import { SettingsMenu } from "@/components/SettingsMenu";
import { ProfileCard } from "@/components/profileCard";
import { useEffect, useState } from "react";


export default function Page() {

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("profile") != null) {
            setUserProfile(JSON.parse(localStorage.getItem("profile")));
        } else {
            window.location.href = "/sign-in";
        }
    }, [])



    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("profile");
        window.location.href = "/sign-in";
    }

    return (<Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    }}>
        <MessageBar />
        {userProfile && (<>
            <ProfileCard
                user={userProfile}
            />

            <SettingsMenu userProfile={userProfile} />
        </>)}
        <Button variant="contained" sx={{ position: "absolute", bottom: "1rem", right: "1rem" }} onClick={handleLogout}>Log Out</Button>
    </Box>)
}