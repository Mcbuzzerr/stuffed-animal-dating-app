import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, Switch, FormGroup, FormControlLabel, Slider } from "@mui/material";
import Head from "next/head";

export const SettingsMenu = ({ userProfile }) => {
    const [expanded, setExpanded] = useState(false);
    const [ageRange, setAgeRange] = useState(userProfile ? userProfile.agePrefs : [18, 60]);
    const [doNotifs, setDoNotifs] = useState(userProfile ? userProfile.doNotifs : true);
    const [isHidden, setIsHidden] = useState(userProfile ? userProfile.isHidden : true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDoNotifsChange = (event) => {
        setDoNotifs(event.target.checked);
    };

    const handleAgePrefsChange = (event, newValue) => {
        setAgeRange(newValue);
    };

    const handleIsHiddenChange = (event) => {
        setIsHidden(event.target.checked);
    };


    return (
        <Card sx={{
            position: "absolute",
            top: 0,
            right: 0,
            botttom: 0,
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            overflowY: "auto",
        }}>
            <Box sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "calc(100% - 2rem)",
                borderBottom: expanded ? "2px solid #ebebeb" : "none",
            }}>
                {userProfile ? (
                    <Box sx={{ width: 56, height: 56, display: "inline-block", borderRadius: "50%", marginRight: "1rem", backgroundColor: "grey", backgroundImage: `url(${userProfile.pictures[0]})`, backgroundSize: "cover" }}> </Box>
                ) : <Box sx={{ width: 56, height: 56, display: "inline-block", borderRadius: "50%", marginRight: "1rem", backgroundColor: "grey" }}> </Box>}
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }}>{userProfile ? userProfile.name : "User Not Found"}</Typography>
                <Button variant="contained" color="primary" sx={{ width: "100px" }} onClick={handleExpandClick}>{expanded ? "Save" : "Settings"}</Button>
            </Box>
            {expanded ? (
                <Box sx={{
                    padding: "1rem",
                    width: "calc(100% - 2rem)",
                }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>Settings</Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>Profile</Typography>
                    <Button color="secondary" variant="contained" href="update-profile">Edit Profile</Button>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>Preferences</Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>Age Range</Typography>
                    <Slider value={ageRange} onChange={handleAgePrefsChange} valueLabelDisplay="auto" marks={true} min={18} max={60} />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>Notifications</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={doNotifs} onChange={handleDoNotifsChange} />} label={doNotifs ? "yes" : "no"} />
                    </FormGroup>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>Hide Profile?</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={isHidden} onChange={handleIsHiddenChange} />} label={isHidden ? "yes" : "no"} />
                    </FormGroup>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>Account</Typography>
                    <Button>Update Email or Password</Button>
                    <Button color="error" variant="contained">Delete Account</Button>


                </Box>) : null}
        </Card>
    )
}