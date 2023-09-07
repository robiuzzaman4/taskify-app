import { TbFidgetSpinner } from 'react-icons/tb';

const Spinner = () => {
    return (
        <div className="min-h-screen w-full bg-white grid place-items-center">
            <TbFidgetSpinner className="text-neutral-900 animate-spin" size={24} />
        </div>
    );
};

export default Spinner;