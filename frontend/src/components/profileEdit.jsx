import React, { useEffect, useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField, ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Head from "next/head";

export const ProfileEdit = ({ userProfile, setUserProfileFunction }) => {
    const [nameField, setNameField] = useState(userProfile.name)
    const [ageField, setAgeField] = useState(userProfile.age)
    const [bioField, setBioField] = useState(userProfile.bio)
    if (userProfile.pronouns == null) {
        console.log("null")
        userProfile.pronouns = []
    }
    const [pronouns, setPronouns] = useState(userProfile.pronouns)
    const [pronounField, setPronounField] = useState("")
    if (userProfile.interests == null) {
        console.log("null")
        userProfile.interests = []
    }
    const [interests, setInterests] = useState(userProfile.interests)
    if (userProfile.lookingFor == null) {
        console.log("null")
        userProfile.lookingFor = []
    }
    const [lookingFor, setLookingFor] = useState(userProfile.lookingFor)
    if (userProfile.pictures == null) {
        console.log("null")
        userProfile.pictures = []
    }
    const [pictures, setPictures] = useState(userProfile.pictures)

    const [possible_interests, setPossibleInterests] = useState(null);
    const [possible_lookingFor, setPossibleLookingFor] = useState(null);

    const [file, setFile] = useState(null);

    useEffect(() => {
        const asyncFunction = async () => {
            const response = await fetch("http://localhost:5041/profile/enum/interests", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => {
                return res.json()
            })
                .then(data => {
                    return data
                })
            let output = []
            for (let i = 0; i < response.interests.length; i++) {
                if (!interests.includes(response.interests[i])) {
                    output[i] = response.interests[i]
                }
            }
            setPossibleInterests(output)
        }
        asyncFunction()
    }, [])

    useEffect(() => {
        const asyncFunction = async () => {
            const lookingFor = await fetch("http://localhost:5041/profile/enum/lookingFor", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => {
                return res.json()
            })
                .then(data => {
                    return data
                })
            let output = []
            for (let i = 0; i < lookingFor.lookingFor.length; i++) {
                output[i] = lookingFor.lookingFor[i]
            }
            setPossibleLookingFor(output)
        }
        asyncFunction()
    }, [])

    const handleNameFieldChange = (e) => {
        setNameField(e.target.value);
        let userProfileUpdate = {
            name: e.target.value,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests,
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handleAgeFieldChange = (e) => {
        setAgeField(e.target.value)
        let userProfileUpdate = {
            name: nameField,
            age: e.target.value,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests,
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handleBioFieldChange = (e) => {
        setBioField(e.target.value)
        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: e.target.value,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests,
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handlePronounFieldChange = (e) => {
        setPronounField(e.target.value)
    }

    const handleRemovePronoun = (pronoun) => {
        setPronouns(pronouns.filter((p) => p !== pronoun))
        console.log(pronouns)
        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns.filter((p) => p !== pronoun),
            interests: interests,
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handleAddPronoun = () => {
        if (pronouns == null) {
            setPronouns([])
        }
        setPronouns(pronouns.concat(pronounField))
        setPronounField("")

        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns.concat(pronounField),
            interests: interests,
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handleRemoveInterest = (interest) => {
        setInterests(interests.filter((i) => i !== interest))
        setPossibleInterests(possible_interests.concat(interest).sort())
        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests.filter((i) => i !== interest),
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handleAddInterest = (interest) => {
        setInterests(interests.concat(interest))
        setPossibleInterests(possible_interests.filter((i) => i !== interest))
        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests.concat(interest),
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handleChangeLookingfor = (lookingFor_in) => {
        setLookingFor(lookingFor_in)
        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests,
            lookingFor: lookingFor_in,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const updatePreview = () => {
        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests,
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }

        setUserProfileFunction(userProfileUpdate)
    }

    const handleSubmit = async () => {
        if (nameField === "") {
            alert("Name cannot be empty.")
            return
        }
        if (ageField < 18) {
            alert("You must be 18 or older to use this app.")
            return
        } else if (ageField == "") {
            alert("Age cannot be empty.")
            return
        }

        let userProfileUpdate = {
            name: nameField,
            age: ageField,
            bio: bioField,
            pictures: userProfile.pictures,
            pronouns: pronouns,
            interests: interests,
            lookingFor: lookingFor,
            matches: userProfile.matches,
            likes: userProfile.likes,
            dislikes: userProfile.dislikes,
            doNotifs: userProfile.doNotifs,
            agePrefs: userProfile.agePrefs,
            isHidden: userProfile.isHidden,
        }
        const profileGUID = JSON.parse(localStorage.getItem("user")).profileGUID;
        let response = await fetch(`http://localhost:5041/profile/${profileGUID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": undefined,
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(userProfileUpdate),
        }).then(res => {
            return res.json()
        })
            .then(data => {
                localStorage.setItem("profile", JSON.stringify(userProfileUpdate))
                window.location.href = "/main"
            }).catch(err => {
                console.log(err)
            })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUploadImage = async (e) => {
        const profileGUID = JSON.parse(localStorage.getItem("user")).profileGUID;
        const formData = new FormData();
        formData.append("picture", file);
        fetch(`http://localhost:5041/profile/${profileGUID}/add_picture`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message == "Picture added") {
                    alert("Upload successful!")
                    let userProfileUpdate = {
                        name: userProfile.name,
                        age: userProfile.age,
                        bio: userProfile.bio,
                        pictures: userProfile.pictures.concat(data.URL),
                        pronouns: userProfile.pronouns,
                        interests: userProfile.interests,
                        lookingFor: userProfile.lookingFor,
                        matches: userProfile.matches,
                        likes: userProfile.likes,
                        dislikes: userProfile.dislikes,
                        doNotifs: userProfile.doNotifs,
                        agePrefs: userProfile.agePrefs,
                        isHidden: userProfile.isHidden,
                    }
                    setUserProfileFunction(userProfileUpdate)
                    localStorage.setItem("profile", JSON.stringify(userProfileUpdate))
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDeleteImage = (index) => {
        const profileGUID = JSON.parse(localStorage.getItem("user")).profileGUID;
        fetch(`http://localhost:5041/profile/${profileGUID}/delete_picture/${index}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message == "Picture deleted") {
                    let userProfileUpdate = {
                        name: userProfile.name,
                        age: userProfile.age,
                        bio: userProfile.bio,
                        pictures: userProfile.pictures.filter((p, i) => i !== index),
                        pronouns: userProfile.pronouns,
                        interests: userProfile.interests,
                        lookingFor: userProfile.lookingFor,
                        matches: userProfile.matches,
                        likes: userProfile.likes,
                        dislikes: userProfile.dislikes,
                        doNotifs: userProfile.doNotifs,
                        agePrefs: userProfile.agePrefs,
                        isHidden: userProfile.isHidden,
                    }
                    setUserProfileFunction(userProfileUpdate)
                    localStorage.setItem("profile", JSON.stringify(userProfileUpdate))
                }
            }).catch(err => console.log(err))
    }
    return (<>
        <Head>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css' />
        </Head>
        <Card sx={{
            width: "450px",
            padding: "1rem",
            // margin: "1rem",
        }}>
            <Typography variant="h4">Edit Profile</Typography>
            {/* Once image uploads are available, use MUI image grid for the display */}
            <Typography variant="h5">Pictures</Typography>
            <ImageList cols={3} rowHeight={150} sx={{ width: "450px" }}>
                {userProfile.pictures.map((picture, index) => (
                    <ImageListItem key={picture}>
                        <ImageListItemBar position="bottom" actionIcon={
                            <IconButton onClick={() => handleDeleteImage(index)} sx={{ color: "white" }}>
                                <DeleteForeverIcon />
                            </IconButton>
                        } />
                        <Box sx={{ width: "100%", height: "100%", backgroundImage: `url(${picture})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></Box>
                    </ImageListItem>
                ))}
            </ImageList>
            <Typography variant="h5">Upload Picture(s)</Typography>
            <input type="file" onChange={handleFileChange} accept=".png, .jpeg, .jpg, .gif" />
            <Button variant="contained" size="small" onClick={handleUploadImage}>Upload</Button>
            <TextField size="small" label="Name" fullWidth value={nameField} onChange={handleNameFieldChange} sx={{ marginTop: "10px" }} />
            <TextField size="small" label="Age" type="number" value={ageField} onChange={handleAgeFieldChange} sx={{ marginTop: "10px" }} />
            <TextField size="small" label="Bio" fullWidth multiline minRows={3} value={bioField} onChange={handleBioFieldChange} sx={{ marginTop: "10px" }} />
            <Typography variant="h5" sx={{ marginTop: "10px" }}>Pronouns</Typography>
            {/* Do a map of pronouns */}
            <Box sx={{
                display: "inline-flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px"
            }}>
                {pronouns && pronouns.map((pronoun) => (
                    <Typography key={pronoun} variant="body1"
                        onClick={() => { handleRemovePronoun(pronoun) }}
                        sx={{
                            border: "solid 1px #bbb",
                            padding: "0 3px",
                            borderRadius: "5px",
                            backgroundColor: "#fbfbfb",
                            userSelect: "none",
                        }}
                    >{pronoun} <span style={{ fontWeight: "bold", color: "red" }}>X</span></Typography>
                ))}
            </Box>
            <TextField label="Pronoun" onChange={handlePronounFieldChange} value={pronounField} fullWidth sx={{ marginTop: "10px" }} />
            <Button variant="contained" onClick={handleAddPronoun} color="secondary" sx={{ marginTop: "10px" }}>Add Pronoun</Button>
            <Typography variant="h5" sx={{ marginTop: "10px" }}>Looking For</Typography>
            <Box sx={{
                display: "inline-flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px"
            }}>
                {possible_lookingFor && possible_lookingFor.map((lookingFor_mapped) => (
                    <Typography variant="body1" key={lookingFor_mapped}
                        onClick={() => { handleChangeLookingfor(lookingFor_mapped) }}
                        sx={{
                            border: "solid 1px #bbb",
                            padding: "0 3px",
                            borderRadius: "5px",
                            backgroundColor: "#fbfbfb",
                            userSelect: "none",
                            color: (lookingFor === lookingFor_mapped) ? "green" : "black",
                            fontWeight: (lookingFor === lookingFor_mapped) ? "bold" : "normal"
                        }}
                    >{lookingFor_mapped}</Typography>
                ))}
            </Box>
            <Typography variant="h5" sx={{ marginTop: "10px" }}>Your Interests</Typography>
            {/* Do a map of interests */}
            <Box sx={{
                display: "inline-flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px"
            }}>
                {interests && interests.map((interest) => (
                    <Typography key={interest} variant="body1"
                        onClick={() => { handleRemoveInterest(interest) }}
                        sx={{
                            border: "solid 1px #bbb",
                            padding: "0 3px",
                            borderRadius: "5px",
                            backgroundColor: "#fbfbfb",
                            userSelect: "none"
                        }}
                    >{interest} <span style={{ fontWeight: "bold", color: "red" }}>X</span></Typography>
                ))}
            </Box>
            {/* Do a map of all available interests, maybe only show a certain amount with a show more button */}
            <Typography variant="h5" sx={{ marginTop: "10px" }}>Available Interests</Typography>
            <Box sx={{
                display: "inline-flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px",
                overflowY: "auto",
                height: "300px"
            }}>
                {possible_interests && possible_interests.map((interest) => (
                    <Typography key={interest} variant="body1"
                        onClick={() => { handleAddInterest(interest) }}
                        sx={{
                            border: "solid 1px #bbb",
                            padding: "0 3px",
                            borderRadius: "5px",
                            backgroundColor: "#fbfbfb",
                            userSelect: "none"
                        }}
                    >{interest} <span style={{ fontWeight: "bold", color: "green" }}>+</span></Typography>
                ))}
            </Box>
            {/* <Button variant="contained" onClick={updatePreview} color="secondary" sx={{ marginTop: "10px" }}>Update Preview</Button> */}
            <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: "10px" }}>Save Profile</Button>
            <Button variant="text" color="error" sx={{ marginTop: "10px", marginLeft: "1rem" }} href="main">Cancel</Button>
        </Card >
    </>
    )

}