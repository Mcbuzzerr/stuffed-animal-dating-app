import Head from 'next/head'
import Image from 'next/image'
import { css } from '@emotion/react'
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      window.location.href = "/main";
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <main style={{
        backgroundImage: "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        minHeight: "calc(100vh - 10rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "10rem",
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: "200px", height: "200px" }} />
          <Typography variant="h1" style={{ color: "white" }}>Welcome to <span style={{ color: "#0033aa" }}>Stitch</span></Typography>
        </Box>
        <Typography variant="body1" style={{ color: "white" }}>This isn't the vibe I want the final product to have at all, this is just something I threw together</Typography>
        <Card sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          width: "150px",
          padding: "0 2rem",
          backgroundColor: "#eaeaea",
        }}>
          <Button variant="contained" color="primary" href="/sign-in" style={{ margin: "20px" }} fullWidth>Sign In</Button>
          <Button variant="contained" color="primary" href="/sign-up" style={{ margin: "20px" }} fullWidth>Sign Up</Button>
        </Card>
      </main>
    </>
  )
}