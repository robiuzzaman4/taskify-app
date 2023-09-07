import { useEffect, useState } from "react";
import Container from "../components/Container";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
    const [getAllUsers, setAllUsers] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://taskify-app-backend.vercel.app/api/users`)
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data.users);
            })
    }, [])

    const getCurrentUserData = getAllUsers.find((singleUser) => singleUser.email === user.email);
    console.log(getCurrentUserData);

    return (
        <section className="pt-32 pb-16">
            <Container>
                <div>
                    <div className="bg-gradient-to-r from-rose-50 to-teal-50 w-full max-w-xs bg-white rounded-lg p-6 grid gap-4">
                        <img
                            src={getCurrentUserData?.photo}
                            alt="User Photo"
                            className="w-16 h-16 rounded-full object-cover" />
                        <div className="grid -gap-1">
                            <h1 className="text-xl font-bold">
                                {getCurrentUserData?.name}
                            </h1>
                            <p>
                                @{getCurrentUserData?.username}
                            </p>
                            <p className="font-medium">
                                {getCurrentUserData?.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default MyProfile;