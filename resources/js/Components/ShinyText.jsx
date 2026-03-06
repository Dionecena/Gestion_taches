export default function ShinyText({ children, className = '' }) {
    return (
        <span
            className={
                'bg-gradient-to-r from-indigo-200 via-white to-indigo-200 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2.2s_linear_infinite] ' +
                className
            }
        >
            {children}
        </span>
    );
}
