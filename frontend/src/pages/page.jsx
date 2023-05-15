import { ProfileCard } from "../components/profileCard";

export default function Page() {
    return (
        <div>
            <h1>Beans</h1>
            page
            <ProfileCard user={{
                "name": "Same McGuffin",
                "age": 20,
                "_id": "645bf961e3edb2af1381e7f9",
                "profileGUID": "01880746-2583-75f5-aed2-1674cd038afc",
                "bio": "",
                "pronouns": [],
                "pictures": ["https://cataas.com/cat?width=50&height=50"],
                "interests": [],
                "lookingFor": "",
                "matches": [
                    "018806c6-f091-7d44-8b85-2425aa863178"
                ],
                "likes": [
                    {
                        "message": "Ur so hot and sexy ahahaha",
                        "recipientGUID": "018806c6-f091-7d44-8b85-2425aa863178"
                    }
                ],
                "dislikes": [],
                "doNotifs": true,
                "agePrefs": [],
                "isHidden": false
            }} />
        </div>
    )
}