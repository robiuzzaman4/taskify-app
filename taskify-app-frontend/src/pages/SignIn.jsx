import { HiEye, HiEyeOff } from "react-icons/hi";
import Button from "../components/Button";
import Container from "../components/Container";
import { useState } from "react";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        const email = data.email;
        const password = data.password;

        userLogin(email, password)
            .then(() => {
                toast.success("Login Successfull!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === "Firebase: Error (auth/user-not-found).") {
                    return toast.error("User not found!");
                }
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    return toast.error("Wrong password! Try again!");
                }
            })
    };

    return (
        <section className="pt-32 pb-16">
            <Container>
                <div className="grid gap-8">
                    <div className="md:w-[360px] mx-auto p-8 bg-white rounded-lg shadow grid gap-4">
                        <h1 className="text-center text-2xl font-bold text-neutral-900">Welcome back!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-4">
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 font-medium">Email:</span>
                                <input type="email" className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none rounded-lg bg-white"
                                    {...register("email", { required: true })} />
                                {errors?.email?.type === 'required' && <p role="alert" className="text-sm text-red-500">Email is required</p>}
                            </label>
                            <label className="grid gap-1 relative">
                                <span className="text-sm text-neutral-900 font-medium">Password:</span>
                                <input type={showPass ? "text" : "password"} className="w-full px-4 py-2 text-sm border border-neutral-200 focus:border-neutral-900 dark:focus:border-neutral-900 focus:outline-none rounded-lg bg-white"
                                    {...register("password", { required: true })} />
                                {errors?.password?.type === 'required' && <p role="alert" className="text-sm text-red-500">Password is required</p>}
                                <div onClick={() => setShowPass(!showPass)} className="absolute right-4 top-[35px] text-neutral-500 cursor-pointer">
                                    {
                                        showPass ? <HiEye /> : <HiEyeOff />
                                    }
                                </div>
                            </label>
                            <Button type="submit">Sign In</Button>
                        </form>
                        <p className="text-sm font-medium text-gray-500">Don&apos;t have an account? <Link to="/sign-up" className="text-neutral-900">Sign Up Now</Link> </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SignIn;