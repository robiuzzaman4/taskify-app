import Container from "../components/Container";
import useAuth from "../hooks/useAuth";
import useAllUsers from "../hooks/useAllUsers";
import useAllTasks from "../hooks/useAllTasks";
import TaskCard from "../components/TaskCard";
import { HiBadgeCheck } from "react-icons/hi";

const MyProfile = () => {
    const { user } = useAuth();
    const { allUsers } = useAllUsers();
    const { allTasks } = useAllTasks();

    const getCurrentUserData = allUsers?.find((singleUser) => singleUser?.email === user?.email);
    const myTasks = allTasks?.filter((task) => task?.assignedTo === getCurrentUserData?.name);

    return (
        <section className="pt-32 pb-16">
            <Container>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="shadow w-full max-h-52 bg-white rounded-lg p-6 flex flex-col gap-4">
                        <img
                            src={getCurrentUserData?.photo}
                            alt="User Photo"
                            className="w-16 h-16 rounded-full object-cover" />
                        <div className="grid -gap-1">
                            <h1 className="text-xl font-bold flex items-center gap-1">
                                <span>{getCurrentUserData?.name}</span>
                                <HiBadgeCheck />
                            </h1>
                            <p>
                                @{getCurrentUserData?.username}
                            </p>
                            <p className="font-medium">
                                {getCurrentUserData?.bio}
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:col-span-2 grid gap-8">
                        <h1 className="text-2xl font-bold">
                            My Tasks:
                        </h1>
                        {
                            <div className="grid lg:grid-cols-2 gap-8">
                                {
                                    myTasks?.map((task) => (
                                        <TaskCard key={task._id} {...task} />
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default MyProfile;