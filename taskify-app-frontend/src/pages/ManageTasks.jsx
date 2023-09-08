import { useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import TaskModalForm from "../components/TaskModalForm";
import useAllTasks from "../hooks/useAllTasks";
import TaskCard from "../components/TaskCard";

const ManageTasks = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { allTasks } = useAllTasks();

    const pendingTasks = allTasks?.filter((task) => task.status === "pending");
    const inProgressTasks = allTasks?.filter((task) => task.status === "in-progress");
    const completeTasks = allTasks?.filter((task) => task.status === "complete");

    return (
        <section className="pt-32 pb-16">
            <Container>
                <div className="grid gap-8">
                    <Button onClick={() => setIsOpen(true)} className="w-fit">
                        Add New Task
                    </Button>
                    {/* Modal */}
                    <TaskModalForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />

                    {/* all tasks */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* pending tasks */}
                        <div className="flex flex-col gap-8">
                            <div className="w-full bg-white shadow h-16 rounded-lg p-4">
                                <h1 className="text-xl font-bold">Pending Tasks: {pendingTasks?.length}</h1>
                            </div>

                            <div className="grid gap-8 md:max-h-[600px] md:overflow-y-auto" id="tasksContainer">
                                {
                                    pendingTasks?.map((task) => (
                                        <TaskCard key={task._id} {...task}/>
                                    ))
                                }
                            </div>
                        </div>

                        {/* in progress tasks */}
                        <div className="flex flex-col gap-8">
                            <div className="w-full bg-white shadow h-16 rounded-lg p-4">
                                <h1 className="text-xl font-bold">In Progress Tasks: {inProgressTasks?.length}</h1>
                            </div>
                            <div className="grid gap-8 md:max-h-[600px] md:overflow-y-auto" id="tasksContainer">
                                {
                                    inProgressTasks?.map((task) => (
                                        <TaskCard key={task._id} {...task}/>
                                    ))
                                }
                            </div>
                        </div>

                        {/* complete tasks */}
                        <div className="flex flex-col gap-8">
                            <div className="w-full bg-white shadow h-16 rounded-lg p-4">
                                <h1 className="text-xl font-bold">Completed Tasks: {completeTasks?.length}</h1>
                            </div>
                            <div className="grid gap-8 md:max-h-[600px] md:overflow-y-auto" id="tasksContainer">
                                {
                                    completeTasks?.map((task) => (
                                        <TaskCard key={task._id} {...task}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ManageTasks;