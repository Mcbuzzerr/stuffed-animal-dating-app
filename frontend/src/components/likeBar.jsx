import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField, Modal } from "@mui/material";
import Head from "next/head";

export const LikeBar = ({ isDisabled, profile, queuePosition, setQueuePosition, matches, setMatches }) => {
    const [message, setMessage] = useState("");
    const [likeDisabled, setLikeDisabled] = useState(true);
    const [matchPopup, setMatchPopup] = useState(false);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        if (e.target.value != 0 && isDisabled == false) {
            setLikeDisabled(false);
        } else if (e.target.value == 0) {
            setLikeDisabled(true);
        }
    }

    const handleLike = async () => {
        if (likeDisabled == true) return;
        console.log("liked " + profile.profileGUID + " with message: " + message);
        const profileGUID = JSON.parse(localStorage.getItem("user")).profileGUID;
        let response = await fetch(`http://localhost:5041/profile/like/${profileGUID}/to/${profile.profileGUID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                message: message
            })
        }).then(response => {
            if (response.status == 200) {
                setQueuePosition(queuePosition + 1);
            } else {
                console.log(response.json());
            }
            return response;
        }).then(data => data.json());
        console.log(response);
        if (response.message == "Match!") {
            console.log("matched!");
            setMatches([...matches, profile]);
            setMatchPopup(true);

            let liked_profile_message = "No message oops, that's a bug";

            for (let i = 0; i < profile.likes.length; i++) {
                if (profile.likes[i].recipientGUID == profileGUID) {
                    liked_profile_message = profile.likes[i].message;
                }
            }

        }
        setMessage("");
        setLikeDisabled(true);
        setQueuePosition(queuePosition + 1);
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
            {
                matchPopup && <Modal open={matchPopup} onClose={() => setMatchPopup(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                                You matched!
                            </Typography>
                        </CardContent>
                        <Button onClick={() => setMatchPopup(false)}>Close</Button>
                    </Card>
                </Modal>
            }
            <TextField size="small" placeholder={isDisabled ? 'Come back tomorrow!' : "Your message here"} disabled={isDisabled} sx={{ backgroundColor: "white", borderRadius: "5px" }} onChange={handleMessageChange} value={message} />
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