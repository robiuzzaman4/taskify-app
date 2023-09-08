import axios from "axios";
import Button from "./Button";
import useAllTasks from "../hooks/useAllTasks";
import toast from "react-hot-toast";

const TaskCard = ({ _id, title, description, date, priority, assignedTo, status }) => {

    const { refetch } = useAllTasks();

    const handleStatus = (id, status) => {
        axios.patch(`https://taskify-app-backend.vercel.app/api/tasks/${id}`, { status })
            .then((res) => {
                if (res.data.updatedTask) {
                    toast.success(res.data.message);
                    refetch();
                } else {
                    toast.error(res.data.message);
                }
            })
    }

    return (
        <div className="w-full bg-white shadow hover:shadow-md transition rounded-lg p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    {
                        status === "pending" &&
                        <span className="py-1 px-2 rounded-full bg-orange-200/50 text-orange-500 text-xs">Pending</span> ||
                        status === "in-progress" &&
                        <span className="py-1 px-2 rounded-full bg-purple-200/50 text-purple-500 text-xs">In Progress</span> ||
                        status === "complete" &&
                        <span className="py-1 px-2 rounded-full bg-emerald-200/50 text-emerald-500 text-xs">Complete</span>
                    }
                </div>
            </div>
            <h2 className={`text-xl font-bold 
            ${priority === "High" && "text-red-500" || priority === "Medium" && "text-orange-500" || priority === "Low" && "text-emerald-500"}
            `}>
                {title}
            </h2>
            <div className="grid gap-2">
                <p>
                    {description}
                </p>
                <p>
                    Assigned to: {assignedTo}
                </p>
                <p>
                    Due Date: {date}
                </p>
                <p>
                    Priority: {priority}
                </p>
            </div>
            <Button onClick={() => handleStatus(_id, status)}>
                {
                    status === "pending" && <span>Make In Progress</span> ||
                    status === "in-progress" && <span>Make Complete</span> ||
                    status === "complete" && <span>Make Archive</span>
                }
            </Button>
        </div>
    );
};

export default TaskCard;