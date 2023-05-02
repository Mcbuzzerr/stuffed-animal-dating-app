import { ProfileCard } from "../components/profileCard";

export default function Page() {
    return (
        <div>
            <h1>Beans</h1>
            page
            <ProfileCard user={{
                name: "Beans",
                email: "beans@gmail.com",
                phone: "1234567890"
            }} />
        </div>
    )
}