import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useAllTasks = () => {
    const { loading } = useAuth();

    const { data: allTasks = [], refetch } = useQuery({
        queryKey: ["allTasks"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://taskify-app-backend.vercel.app/api/tasks`)
            return res.data.tasks;
        }
    })

    return { allTasks, refetch };
};

export default useAllTasks;