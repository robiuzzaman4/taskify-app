import Container from "../components/Container";
import useAuth from "../hooks/useAuth";
import useAllUsers from "../hooks/useAllUsers";

const MyProfile = () => {
    const { user } = useAuth();
    const { allUsers } = useAllUsers();

    const getCurrentUserData = allUsers?.find((singleUser) => singleUser?.email === user?.email);
    console.log("getCurrentUserData", getCurrentUserData);

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