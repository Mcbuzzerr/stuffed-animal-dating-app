import { SignInCard } from "@/components/signInCard"
import { Avatar, Card, CardContent, CardHeader, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function Page() {
    return (<Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh"
    }}>
        <Link href={"/"} style={{ textDecoration: "none" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

            }}>
                <img src="/images/logo.png" alt="Logo" style={{ width: "200px", height: "200px" }} />
                <Typography variant="h1" sx={{ color: "#0033aa" }}>Stitch</Typography>
            </Box>
        </Link>
        <SignInCard />
        <Link href="/main">Dev Link to main page</Link>
    </Box>)
}