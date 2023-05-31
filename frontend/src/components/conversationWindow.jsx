import React, { useEffect, useState, useRef } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, Input, TextField } from "@mui/material";
import Head from "next/head";

import { JsonHubProtocol, HubConnectionState, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import $ from "jquery";

export const ConversationWindow = ({ userProfileGUID, matchProfile }) => {
    const [messageField, setMessageField] = useState("");
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);
    const apiURL = "http://:7474/api"; //Change to the gateway URL when we have it 😀
    const messageBoxRef = useRef(null);

    const startSignalRConnection = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:7474/myhub") //Change to the gateway URL when we have it 😀
            .build();


        await connection.start()
            .then(() => {
                console.log("SignalR Connected.");

                //This groupName work?
                let sortedUserGUIDs = [userProfileGUID, matchProfile.profileGUID].sort();
                const groupName = sortedUserGUIDs[0] + "_" + sortedUserGUIDs[1];
                connection.invoke("AddToGroup", groupName).then(() => {
                }).catch((err) => console.log(err));

                connection.on("ReceiveMessage", (message) => {
                    console.log("Received message: ", message)
                    // Update messages state (should automatically cause rerender and visual update)
                    setMessages((prevMessages) => {
                        // console.log("prevMessages: ", prevMessages);
                        return [...prevMessages, message]
                    });
                })
            }).catch((err) => console.log(err));


        connection.onclose(() => {
            console.log("SignalR Disconnected.");
        })

        setConnection(connection);
    }


    const handleMessageFieldChange = (event) => {
        setMessageField(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {
        const message = {
            Sender: userProfileGUID,
            Recipient: matchProfile.profileGUID,
            Text: messageField
        };

        $.ajax({
            url: apiURL + "/send",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(message),
            success: function (data) {
                console.log(message);
                setMessageField("");
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    const handleRetrieveMessages = () => {
        $.ajax({
            url: `${apiURL}/retrieve?sender=${userProfileGUID}&receiver=${matchProfile.profileGUID}`,
            type: 'GET',
            success: function (data) {
                if (Array.isArray(data.messages)) {
                    data.messages.sort(function (a, b) {
                        // Convert timeSent strings to Date objects for comparison
                        const timeSentA = new Date(a.timeSent);
                        const timeSentB = new Date(b.timeSent);
                        return timeSentA - timeSentB;
                    });
                    setMessages(data.messages);
                }
            },
            error: function (error) {
                console.error('Error retrieving messages:', error);
            }
        });
    };

    const scrollToBottom = () => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    };

    const handleUnmatch = () => {
        console.log("unmatching: " + matchProfile.profileGUID);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Connect to signalR hub
        handleRetrieveMessages();
        startSignalRConnection();
        return () => {
            // Clean up the SignalR connection when the component unmounts
            if (connection && connection.state === HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, []);


    return (<>
        <Head>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css'></link>
        </Head>
        <Card sx={{
            width: "550px",
            height: "675px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: "100px",
            marginLeft: "300px",
            zIndex: 1,
        }}>
            <Box sx={{
                width: "calc(100% - 2rem)",
                borderBottom: "2px solid #ebebeb",
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
                <Box sx={{ width: 56, height: 56, display: "inline-block", borderRadius: "50%", marginRight: "1rem", backgroundColor: "grey", backgroundImage: `url(${matchProfile.pictures[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}> </Box>
                <Typography variant="h4" sx={{ display: "inline-block" }}>
                    {matchProfile.name}
                </Typography>
                <Button variant="contained" onClick={handleUnmatch}
                    sx={{
                        marginLeft: "auto",
                    }}>Unmatch</Button>
            </Box>
            <Box ref={messageBoxRef} sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflowY: "auto",
                width: "calc(100% - 2rem)",
                flexGrow: 1,
            }}>
                {messages.map((message, index) => {
                    if (message.sender == matchProfile.profileGUID) {
                        return (<Box key={message.timeSent} sx={{
                            alignSelf: "flex-start",
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                        }}>
                            <Typography variant="body2" sx={{
                                color: "#b0b0b0",
                                fontSize: "0.8rem",
                                marginRight: "0.5rem",
                            }}>
                                {message.timeSent}
                            </Typography>
                            <Box key={index} sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                marginTop: "8px",
                                padding: "10px",
                                maxWidth: "300px",
                                width: "fit-content",
                                color: "black",
                                borderRadius: "10px",
                                borderBottomRightRadius: "0",
                                backgroundColor: "#ebebeb",
                                alignSelf: "flex-end"
                            }}>
                                <Typography variant="body1">
                                    {message.text}
                                </Typography>
                            </Box>
                        </Box>
                        )
                    }
                    if (message.sender == userProfileGUID) {
                        return (<Box sx={{
                            alignSelf: "flex-start",
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                        }}>
                            <Box key={index} sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                marginTop: "8px",
                                padding: "10px",
                                maxWidth: "300px",
                                width: "fit-content",
                                color: "white",
                                borderRadius: "10px",
                                borderBottomLeftRadius: "0",
                                backgroundColor: "#065fb2"
                            }}>
                                <Typography variant="body1">
                                    {message.text}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{
                                color: "#b0b0b0",
                                fontSize: "0.8rem",
                                marginLeft: "0.5rem",
                            }}>
                                {message.timeSent}
                            </Typography>
                        </Box>
                        )
                    }
                })}
            </Box>
            <Box sx={{
                width: "calc(100% - 2rem)",
                borderTop: "2px solid #ebebeb",
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
                <TextField sx={{ flexGrow: 1 }} label="Message" variant="outlined" value={messageField} onChange={handleMessageFieldChange} onKeyDown={handleKeyDown} />
                <Button variant="contained" onClick={handleSendMessage} sx={{
                    fontSize: "2rem",
                    marginLeft: "1rem",
                }}>
                    <i className="fi fi-br-caret-right" style={{ height: "45px" }}></i>
                </Button>
            </Box>
        </Card >
    </>);
}