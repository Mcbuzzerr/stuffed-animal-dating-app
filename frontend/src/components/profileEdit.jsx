import React, { useState } from "react";
// import common tags from material ui
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button, TextField } from "@mui/material";
import Head from "next/head";

export const ProfileEdit = ({ userProfile }) => {
    const [name, setName] = useState(userProfile.name)
    const [nameField, setNameField] = useState(name)
    const [age, setAge] = useState(userProfile.age)
    const [ageField, setAgeField] = useState(age)
    const [bio, setBio] = useState(userProfile.bio)
    const [bioField, setBioField] = useState(bio)
    const [pronouns, setPronouns] = useState(userProfile.pronouns)
    const [pronounField, setPronounField] = useState("")
    const [interests, setInterests] = useState(userProfile.interests)

    const handleNameFieldChange = (e) => {
        setNameField(e.target.value)
    }

    const handleAgeFieldChange = (e) => {
        setAgeField(e.target.value)
    }

    const handleBioFieldChange = (e) => {
        setBioField(e.target.value)
    }

    const handlePronounFieldChange = (e) => {
        setPronounField(e.target.value)
    }

    const handleRemovePronoun = (pronoun) => {
        setPronouns(pronouns.filter((p) => p !== pronoun))
        console.log(pronouns)
    }

    const handleAddPronoun = () => {
        setPronouns(pronouns.concat(pronounField))
        setPronounField("")
    }

    const handleRemoveInterest = (interest) => {
        setInterests(interests.filter((i) => i !== interest))
    }

    const handleAddInterest = (interest) => {
        setInterests(interests.concat(interest))
    }

    const handleSubmit = () => {
        if (nameField === "") {
            alert("Name cannot be empty.")
            return
        }
        setName(nameField)
        if (ageField < 18) {
            alert("You must be 18 or older to use this app.")
            return
        } else if (ageField == "") {
            alert("Age cannot be empty.")
            return
        }
        setAge(ageField)
        setBio(bioField)

    }

    return (<>
        <Head>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css' />
        </Head>
        <Card sx={{
            width: "400px",
            padding: "1rem",
        }}>
            <Typography variant="h4">Edit Profile</Typography>
            <Typography variant="h5">Upload Picture(s)</Typography>
            <input type="file" />
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
                {pronouns.map((pronoun) => (
                    <Typography variant="body1"
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
            <Typography variant="h5" sx={{ marginTop: "10px" }}>Your Interests</Typography>
            {/* Do a map of interests */}
            <Box sx={{
                display: "inline-flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px"
            }}>
                {interests.map((interest) => (
                    <Typography variant="body1"
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
            <p>LIST OF ALL AVAILABLE INTERESTS GO HERE</p>
            <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: "10px" }}>Save Profile</Button>
            <Button variant="text" color="secondary" sx={{ marginTop: "10px", marginLeft: "1rem" }} href="main">Cancel</Button>
        </Card>
    </>
    )

}