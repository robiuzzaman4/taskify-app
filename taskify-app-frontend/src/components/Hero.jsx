import { Link } from "react-router-dom";
import Button from "./Button";

const Hero = () => {
    return (
        <section className="min-h-screen grid place-items-center bg-gradient-to-r from-rose-100 to-teal-100">
            <div className="custom-container pt-32 pb-16">
                <div className="grid gap-4 md:gap-6 w-full max-w-2xl mx-auto">
                    <h1 className=" text-center text-3xl md:text-4xl lg:text-5xl font-bold">
                        Unlock Your Team&apos;s Potential with Taskify.
                    </h1>
                    <Link to="/manage-tasks" className="w-fit mx-auto">
                        <Button>
                            Get Started
                            {/* <DoubleArrowRightIcon className="w-4 h-4 ml-2" /> */}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;