import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";
import Spinner from "../components/Spinner";

const useAllUsers = () => {
    const { loading } = useAuth();

    const { data: allUsers = [], isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ["allUsers"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://taskify-app-backend.vercel.app/api/users`)
            return res.data.users;
        }
    })

    if (isLoading || isFetching) {
        return <Spinner/>
    }

    if (error) {
        return console.log("all user fetch error: ", error);
    }

    return { allUsers, refetch };
};

export default useAllUsers;