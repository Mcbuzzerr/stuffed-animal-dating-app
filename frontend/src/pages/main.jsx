import { SignInCard } from "@/components/signInCard"
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, Modal } from "@mui/material";
import { MessageBar } from "@/components/messageBar";
import { SettingsMenu } from "@/components/SettingsMenu";
import { ProfileCard } from "@/components/profileCard";
import { ConversationWindow } from "@/components/conversationWindow";
import { useEffect, useState } from "react";


export default function Page() {

    const [userProfile, setUserProfile] = useState(null);
    const [matches, setMatches] = useState(null);
    const [profileQueue, setProfileQueue] = useState(null);
    const [queuePosition, setQueuePosition] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [doneForDay, setDoneForDay] = useState(false);
    const [openChat, setOpenChat] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("profile") != null) {
            setUserProfile(JSON.parse(localStorage.getItem("profile")));
        } else {
            window.location.href = "/sign-in";
        }
        const asyncWorkaround = async () => {
            const profileGUID = JSON.parse(localStorage.getItem("user")).profileGUID;
            fetch(`http://localhost:5041/profile/${profileGUID}/get_matches`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => res.json()).then(data => {
                if (data != null) {
                    setMatches(data);
                }
            })
            fetch(`http://localhost:5041/profile/${profileGUID}/get_batch/10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => res.json()).then(data => {
                let profiles = data.profiles;
                let profileSortIndex = data.profileSortIndex;
                let sortedProfiles = [];
                for (let i = 0; i < profileSortIndex.length; i++) {
                    for (let j = 0; j < profiles.length; j++) {
                        if (profiles[j].profileGUID == profileSortIndex[i].profile) {
                            sortedProfiles.push(profiles[j]);
                        }
                    }
                }
                if (data != null) {
                    console.log(sortedProfiles);
                    if (sortedProfiles.length == 0) {
                        setDoneForDay(true);
                    }
                    setProfileQueue(sortedProfiles);
                }
            })
        }
        asyncWorkaround();
    }, [trigger])

    useEffect(() => {
        if (userProfile != null) {
            localStorage.setItem("profile", JSON.stringify(userProfile));
        }
    }, [userProfile])

    const getNewBatch = () => {
        setTrigger(!trigger)
    }

    if (queuePosition == profileQueue?.length && profileQueue?.length > 0) {
        console.log("ACK")
        setQueuePosition(0);
        getNewBatch();
    }

    return (<Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    }}>
        <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "58px",
            padding: "1rem",
            backgroundColor: "white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <img src="/images/logo.png" style={{ height: "100%" }} />
            <Typography variant="h4" sx={{ display: "inline-block" }}>Stitch</Typography>
        </Box>
        <MessageBar matches={matches} setOpenChat={setOpenChat} openChat={openChat} />
        {userProfile && (<>
            {(userProfile.bio == "" || userProfile.lookingFor == "" || userProfile.pronouns.length == 0 || userProfile.interests == 0) ? (<>
                <Modal open={true}>
                    <Card sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "500px",
                        textAlign: "center"
                    }}>
                        <CardHeader title="Looks like your profile is incomplete!" />
                        <CardContent>
                            <Typography variant="body1">Chances are you're new here, let's go flesh out your profile! If you're not new, let's go flesh out your profile anyways! (How else are people supposed to get a feel for you?)</Typography>
                            <Button variant="contained" href="update-profile" sx={{ marginTop: "1rem" }}>Edit Profile</Button>
                        </CardContent>
                    </Card>
                </Modal>
            </>) : (null)}
            {
                !openChat && profileQueue && profileQueue.length > 0 && queuePosition < profileQueue.length && (<>
                    <ProfileCard
                        user={profileQueue[queuePosition]}
                        setQueuePosition={setQueuePosition}
                        queuePosition={queuePosition}
                        matches={matches}
                        setMatches={setMatches}
                    />
                </>)
            }
            {openChat && <ConversationWindow userProfileGUID={JSON.parse(localStorage.getItem("user")).profileGUID} matchProfile={openChat} />}

            {
                !openChat && doneForDay && (<>
                    <Card sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "500px",
                        textAlign: "center",
                        zIndex: 0
                    }}>
                        <CardHeader title="Looks like you're out of profiles for today!" sx={{ userSelect: "none" }} />
                        <CardContent>
                            <Typography variant="body1" sx={{ userSelect: "none" }}>Come back tomorrow for more!</Typography>
                        </CardContent>
                    </Card>
                </>)
            }

            <SettingsMenu userProfile={userProfile} setUserProfile={setUserProfile} />
        </>)}
    </Box>)
}