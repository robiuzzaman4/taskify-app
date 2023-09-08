import { Link } from "react-router-dom";
import Button from "./Button";
import Container from "./Container";

const Hero = () => {
    return (
        <section className="min-h-screen grid place-items-center bg-gradient-to-r from-rose-100 to-teal-100">
            <Container>
                <div className="grid gap-4 md:gap-6 w-full max-w-2xl mx-auto mt-16">
                    <h1 className="text-center text-4xl md:text-5xl font-bold">
                        Unlock Your Team&apos;s Potential with Taskify.
                    </h1>
                    <Link to="/manage-tasks" className="w-fit mx-auto">
                        <Button>
                            Get Started
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default Hero;