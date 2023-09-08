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

    // console.log(pendingTasks, inProgressTasks, completeTasks);


    // const tableHead = ["Title", "Description", "Due Date", "Priority", "Assigned to", "Status", "Action"];


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
                    {/* <div className="relative overflow-x-auto shadow rounded-lg w-full" id="tableParent">
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
                                    allTasks?.map((task, index) => <tr
                                        key={task._id}
                                        className={`${index === length - 1 ? "" : "border-b border-neutral-200"}`}>
                                        <th scope="row" className={`p-4 font-medium whitespace-nowrap`}>
                                            {task.title}
                                        </th>
                                        <td className="p-4 whitespace-nowrap">
                                            {task.description}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {task.date}
                                        </td>
                                        <td className={`p-4 whitespace-nowrap ${task.priority === "High" && "text-red-500" || task.priority === "Medium" && "text-orange-500" || task.priority === "Low" && "text-emerald-500"}`}>
                                            {task.priority}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {task.assignedTo}
                                        </td>
                                        <td className={`p-4 whitespace-nowrap 
                                        ${task.status === "pending" && "text-orange-500" || task.status === "in-progress" && "text-purple-500" || task.status === "complete" && "text-emerald-500"}`}>
                                            {
                                                task.status === "pending" && "Pending" ||
                                                task.status === "in-progress" && "In Progress" ||
                                                task.status === "complete" && "Complete"
                                            }
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <Menu>
                                                <Menu.Button className="h-9 w-9 grid place-items-center bg-neutral-100  hover:bg-neutral-200 rounded-lg">
                                                    <HiDotsVertical />
                                                </Menu.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 -mt-10 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="px-1 py-1 ">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        className={`${active && 'bg-neutral-900 text-neutral-50'
                                                                            } group flex items-center justify-center w-full rounded-lg px-2 py-2 text-sm`}
                                                                    >
                                                                        {
                                                                            task.status === "pending" && <span>Make In Progress</span> ||
                                                                            task.status === "in-progress" && <span>Make Complete</span> ||
                                                                            task.status === "complete" && <span>Make Archive</span> 
                                                                        }
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>

                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div> */}
                </div>
            </Container>
        </section>
    );
};

export default ManageTasks;