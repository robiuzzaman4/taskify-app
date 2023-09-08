import { useForm } from "react-hook-form";
import Button from "./Button";
import Modal from "./Modal";
import useAllUsers from "../hooks/useAllUsers";
import axios from "axios";
import toast from "react-hot-toast";
import useAllTasks from "../hooks/useAllTasks";


const TaskModalForm = ({ isOpen, setIsOpen }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { allUsers } = useAllUsers();
    const { refetch } = useAllTasks();

    let allUsersNames = [];
    if (allUsers) {
        allUsersNames = allUsers?.map((user) => user.name);
    }

    const onCancel = () => {
        setIsOpen(!isOpen);
        reset();
    }

    const onSubmit = (data) => {
        const title = data.title;
        const description = data.description;
        const date = data.date;
        const priority = data.priority;
        const assignedTo = data.assignedTo;

        const newTask = {
            title,
            description,
            date,
            priority,
            assignedTo,
            status: "pending"
        }
        axios.post(`https://taskify-app-backend.vercel.app/api/tasks`, newTask)
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    reset();
                    refetch();
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.success(error.message);
            })

    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Add New Task">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-4">
                <label className="grid gap-1">
                    <span className="text-sm text-neutral-900 font-medium">Title:</span>
                    <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none rounded-lg bg-white "
                        {...register("title", { required: true })} />
                    {errors.title?.type === 'required' && <p role="alert" className="text-sm text-red-500">Title is required</p>}
                </label>
                <label className="grid gap-1">
                    <span className="text-sm text-neutral-900 font-medium">Description:</span>
                    <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none rounded-lg bg-white "
                        {...register("description", { required: true })} />
                    {errors.description?.type === 'required' && <p role="alert" className="text-sm text-red-500">Description is required</p>}
                </label>
                <label className="grid gap-1">
                    <span className="text-sm text-neutral-900 font-medium">Due Date:</span>
                    <input type="date" className="w-full px-4 py-2 text-sm border border-neutral-200  focus:border-neutral-900 focus:outline-none rounded-lg bg-white"
                        {...register("date", { required: true })} />
                    {errors.date?.type === 'required' && <p role="alert" className="text-sm text-red-500">Date is required</p>}
                </label>
                <label className="grid gap-1">
                    <span className="text-sm text-neutral-900 font-medium">Priority Level:</span>
                    <select
                        className="select-style w-full px-4 py-2 text-sm border border-neutral-200  focus:border-neutral-900 focus:outline-none rounded-lg bg-white"
                        {...register("priority", { required: true })}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
                <label className="grid gap-1">
                    <span className="text-sm text-neutral-900 font-medium">Assigned To:</span>
                    <select
                        className="select-style w-full px-4 py-2 text-sm border border-neutral-200  focus:border-neutral-900 focus:outline-none rounded-lg bg-white"
                        {...register("assignedTo", { required: true })}
                    >
                        {
                            allUsersNames?.map((name, index) => (
                                <option
                                    key={index}
                                    value={name}>
                                    {name}
                                </option>
                            ))
                        }
                    </select>
                </label>


                <div className="grid grid-cols-3 gap-4">
                    <Button
                        onClick={onCancel}
                        color="red">Close</Button>

                    <Button
                        type="submit"
                        fullwidth
                        className="col-span-2">Add Now</Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModalForm;