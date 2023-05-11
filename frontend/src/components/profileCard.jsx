import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import Head from "next/head";


export const ProfileCard = ({ user }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const interestsRef = React.createRef()
    const [interestsWidth, setInterestsWidth] = useState(0);
    const [pictureIndex, setPictureIndex] = useState(0);

    const handleScroll = (scrollAmount) => {
        const container = interestsRef.current;
        let newPosition = container.scrollLeft + scrollAmount;
        console.log(interestsRef.current)

        if (newPosition < 0) {
            newPosition = 0;
        }

        if (newPosition > container.scrollWidth) {
            newPosition = container.scrollWidth;
        }

        container.scroll({
            left: newPosition,
            behavior: 'smooth'
        });
        setScrollPosition(newPosition);
    }

    const handleChangePicture = (indexChange) => {
        let newIndex = pictureIndex + indexChange;
        if (newIndex < 0) {
            newIndex = 0;
        }
        if (newIndex > user.pictures.length - 1) {
            newIndex = user.pictures.length - 1;
        }
        setPictureIndex(newIndex);
    }

    React.useEffect(() => {
        setInterestsWidth(interestsRef.current.scrollWidth - interestsRef.current.clientWidth)
        console.log(interestsWidth)
    }, [])

    return (<>
        <Head>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css'></link>
        </Head>
        <Card sx={{ width: "300px" }}>
            <Box sx={{
                height: "300px",
                padding: 2,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                flexDirection: "column",
                color: "white",
                fontWeight: "bold",
                position: "relative"
            }}>
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}>
                    {user.pictures.map((picture, index) => (
                        <img src={picture} style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: index == pictureIndex ? 1 : 0,
                            transition: "opacity 0.4s ease-in-out",
                            position: "absolute",
                            top: 0,
                            left: 0
                        }} />
                    ))}
                </Box>
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundImage: "linear-gradient(0deg, rgba(0,0,50,0.8), rgba(0,0,0,0))"
                }}>
                    {pictureIndex > 0 ? <Box onClick={() => handleChangePicture(-1)} sx={{
                        fontSize: "5rem",
                        color: "black",
                        marginLeft: "-1rem"
                    }}><i class="fi fi-br-caret-left"></i></Box> : <Box></Box>}
                    {pictureIndex < user.pictures.length - 1 ? <Box onClick={() => handleChangePicture(1)} sx={{
                        fontSize: "5rem",
                        color: "black",
                        marginRight: "-1rem"
                    }}><i class="fi fi-br-caret-right"></i></Box> : <Box></Box>}
                </Box>
                <Typography variant="h5" sx={{ zIndex: 2 }}>{user.name}, {user.age}</Typography>
                <Typography variant="body2" sx={{ zIndex: 2 }}>{user.bio}</Typography>
            </Box>
            <Box sx={{ padding: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", display: "inline" }}>Pronouns: </Typography>
                <Box sx={{
                    display: "inline-flex",
                    flexDirection: "row",
                    gap: "10px"
                }}>
                    {user.pronouns.map((pronoun) => (
                        <Typography variant="body1" sx={{
                            border: "solid 1px #bbb",
                            padding: "0 3px",
                            borderRadius: "5px",
                            backgroundColor: "#fbfbfb",
                            userSelect: "none"
                        }}>{pronoun}</Typography>
                    ))}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", display: "block" }}>Interests: </Typography>
                <Box sx={{ position: "relative", margin: "5px 0" }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        gap: "10px",
                        overflowX: "hidden",
                        overflowY: "hidden"
                    }} ref={interestsRef}>
                        {user.interests.map((interest) => (
                            <Typography variant="body1" sx={{
                                border: "solid 1px #bbb",
                                padding: "0 3px",
                                borderRadius: "5px",
                                backgroundColor: "#fbfbfb",
                                userSelect: "none"
                            }}>{interest}</Typography>
                        ))}
                    </Box>
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}>
                        {scrollPosition > 0 && <Box onClick={() => handleScroll(-100)} sx={{
                            position: "absolute",
                            left: "-5px",
                            top: "-3px",
                            fontSize: "2rem"
                        }}><i class="fi fi-br-caret-left"></i></Box>}
                        {scrollPosition < interestsWidth && <Box onClick={() => handleScroll(100)} sx={{
                            position: "absolute",
                            right: "-5px",
                            top: "-3px",
                            fontSize: "2rem"
                        }}><i class="fi fi-br-caret-right"></i></Box>}
                    </Box>
                </Box>
                <Typography variant="body1" sx={{
                    fontWeight: "bold",
                    display: "inline"
                }}>Looking for: </Typography>
                <Typography variant="body2" sx={{
                    border: "solid 1px #bbb",
                    padding: "0 3px",
                    borderRadius: "5px",
                    backgroundColor: "#fbfbfb",
                    userSelect: "none",
                    display: "inline-block"
                }}>{user.lookingFor}</Typography>

            </Box>
        </Card >
    </>);
}