import Container from "../components/Container";
import useAllTasks from "../hooks/useAllTasks";
import useAllUsers from "../hooks/useAllUsers";

const Dashboard = () => {
    const { allTasks } = useAllTasks();
    const { allUsers } = useAllUsers();

    const pendingTasks = allTasks?.filter((task) => task.status === "pending");
    const inProgressTasks = allTasks?.filter((task) => task.status === "in-progress");
    const completeTasks = allTasks?.filter((task) => task.status === "complete");
    const archiveTasks = allTasks?.filter((task) => task.status === "archive");

    const tableHead = ["Photo", "Name", "Username", "Email", "Bio",];

    return (
        <section className="pt-32 pb-16">
            <Container>
                <div className="grid gap-8">

                    <h1 className="text-2xl font-bold">
                        Summary of all statistics:
                    </h1>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

                        {/* total users */}
                        <div className="w-full bg-blue-100 shadow rounded-lg p-8 flex flex-col gap-4">
                            <p>Total Team Members:</p>
                            <h3 className="text-3xl text-blue-500 text-center font-medium">
                                {
                                    allUsers?.length < 10 ?
                                        <>
                                            0{allUsers?.length}
                                        </>
                                        :
                                        <>
                                            {allUsers?.length}
                                        </>
                                }
                            </h3>
                        </div>

                        {/* total tasks */}
                        <div className="w-full bg-violet-100 shadow rounded-lg p-8 flex flex-col gap-4">
                            <p>Total Assigned Tasks:</p>
                            <h3 className="text-3xl text-violet-500 text-center font-medium">
                                {
                                    allTasks?.length < 10 ?
                                        <>
                                            0{allTasks?.length}
                                        </>
                                        :
                                        <>
                                            {allTasks?.length}
                                        </>
                                }
                            </h3>
                        </div>

                        {/* total pending tasks */}
                        <div className="w-full bg-orange-100 shadow rounded-lg p-8 flex flex-col gap-4">
                            <p>Total Pending Tasks:</p>
                            <h3 className="text-3xl text-orange-500 text-center font-medium">
                                {
                                    pendingTasks?.length < 10 ?
                                        <>
                                            0{pendingTasks?.length}
                                        </>
                                        :
                                        <>
                                            {pendingTasks?.length}
                                        </>
                                }
                            </h3>
                        </div>

                        {/* total in progress tasks */}
                        <div className="w-full bg-purple-100 shadow rounded-lg p-8 flex flex-col gap-4">
                            <p>Total In Progress Tasks:</p>
                            <h3 className="text-3xl text-purple-500 text-center font-medium">
                                {
                                    inProgressTasks?.length < 10 ?
                                        <>
                                            0{inProgressTasks?.length}
                                        </>
                                        :
                                        <>
                                            {inProgressTasks?.length}
                                        </>
                                }
                            </h3>
                        </div>

                        {/* total completed tasks */}
                        <div className="w-full bg-emerald-100 shadow rounded-lg p-8 flex flex-col gap-4">
                            <p>Total Completed Tasks:</p>
                            <h3 className="text-3xl text-emerald-500 text-center font-medium">
                                {
                                    completeTasks?.length < 10 ?
                                        <>
                                            0{completeTasks?.length}
                                        </>
                                        :
                                        <>
                                            {completeTasks?.length}
                                        </>
                                }
                            </h3>
                        </div>

                        {/* total archive tasks */}
                        <div className="w-full bg-red-100 shadow rounded-lg p-8 flex flex-col gap-4">
                            <p>Total Archived Tasks:</p>
                            <h3 className="text-3xl text-red-500 text-center font-medium">
                                {
                                    archiveTasks?.length < 10 ?
                                        <>
                                            0{archiveTasks?.length}
                                        </>
                                        :
                                        <>
                                            {archiveTasks?.length}
                                        </>
                                }
                            </h3>
                        </div>

                    </div>

                    <h1 className="text-2xl font-bold">
                        Team Members Info:
                    </h1>

                    <div className="relative overflow-x-auto shadow rounded-lg w-full" id="tableParent">
                        <table className="min-w-full text-sm text-left ">
                            <thead className="text-xs uppercase bg-neutral-100">
                                <tr>
                                    {
                                        tableHead.map((head) => <th
                                            key={head}
                                            className="p-4 whitespace-nowrap">{head}</th>)
                                    }
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {
                                    allUsers?.map((user, index) => <tr
                                        key={user._id}
                                        className={`${index === length - 1 ? "" : "border-b border-neutral-200"}`}>
                                        <th scope="row" className={`p-4 font-medium whitespace-nowrap`}>
                                            <img 
                                            src={user.photo} 
                                            alt="user profile"
                                            className="w-9 h-9 rounded-full object-cover shrink-0" />
                                        </th>
                                        <td className="p-4 whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {user.username}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {user.bio}
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default Dashboard;