const Button = ({ children, type, onClick, disabled, color, size, fullwidth, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={`${type === "submit" ? "submit" : "button"}`}
            className={
                `px-4 py-2 rounded-lg text-white font-medium 
                ${color === "red" ? "bg-red-500" : "bg-neutral-900"}
                ${size === "sm" && "px-2 py-1 text-sm"}
                ${fullwidth && "w-full"}
                ${disabled && "opacity-50"}
                ${className && className}
            `}>
            {children}
        </button>
    );
};

export default Button;