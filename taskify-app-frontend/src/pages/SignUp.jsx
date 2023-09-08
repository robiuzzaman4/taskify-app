import Container from "../components/Container";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAllUsers from "../hooks/useAllUsers";


const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { userRegister, updateUser } = useAuth();
    const navigate = useNavigate();

    const { refetch } = useAllUsers();

    const onSubmit = (data) => {
        const name = data.name;
        const username = data.username;
        const email = data.email;
        const password = data.password;
        const photo = data.photo;
        const bio = data.bio;

        userRegister(email, password)
            .then((result) => {
                const user = result.user;
                updateUser(user, name, photo)
                    .then(() => {
                        // save user data
                        fetch(`https://taskify-app-backend.vercel.app/api/users`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ name, username, email, password, photo, bio })
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                if (data) {
                                    toast.success("Register Successfull!");
                                    navigate("/sign-in");
                                    refetch();
                                    console.log(data);
                                }
                            })

                    })
                    .catch((error) => { console.log(error.message); })
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    return toast.error("Already This Email is Used!");
                }
            })
    };

    return (
        <section className="pt-32 pb-16">
            <Container>
                <div className="grid gap-8">
                    <div className="md:w-[360px] mx-auto p-8 bg-white  rounded-lg shadow grid gap-4">
                        <h1 className="text-center text-2xl font-bold text-neutral-900">Join with us!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-4">
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 font-medium">Name:</span>
                                <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none rounded-lg bg-white "
                                    {...register("name", { required: true })} />
                                {errors.name?.type === 'required' && <p role="alert" className="text-sm text-red-500">Name is required</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 font-medium">Username:</span>
                                <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none rounded-lg bg-white "
                                    {...register("username", { required: true })} />
                                {errors.username?.type === 'required' && <p role="alert" className="text-sm text-red-500">Username is required</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 font-medium">Email:</span>
                                <input type="email" className="w-full px-4 py-2 text-sm border border-neutral-200  focus:border-neutral-900 focus:outline-none rounded-lg bg-white "
                                    {...register("email", { required: true })} />
                                {errors.email?.type === 'required' && <p role="alert" className="text-sm text-red-500">Email is required</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 font-medium">Password:</span>
                                <input type="password" className="w-full px-4 py-2 text-sm border border-neutral-200  focus:border-neutral-900 focus:outline-none rounded-lg bg-white "
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                    })} />
                                {errors.password?.type === 'required' && <p role="alert" className="text-sm text-red-500">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p role="alert" className="text-sm text-red-500">Password must be 6 characters</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 font-medium">Photo Url:</span>
                                <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none rounded-lg bg-white"
                                    {...register("photo", { required: true })} />
                                {errors.photo?.type === 'required' && <p role="alert" className="text-sm text-red-500">Photo Url is required</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 font-medium">Bio:</span>
                                <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none rounded-lg bg-white"
                                    {...register("bio", { required: true })} />
                                {errors.bio?.type === 'required' && <p role="alert" className="text-sm text-red-500">Bio is required</p>}
                            </label>
                            <Button type="submit">Register Now</Button>
                        </form>
                        <p className="text-sm font-medium text-neutral-500">Already have an account? <Link to="/sign-in" className="text-neutral-900">Sign In Now</Link> </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SignUp;