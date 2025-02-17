/**
 * This component is an icon button that links to the home page. 
 * It is displayed on Signup & Login pages.
 */
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        <Link
            to={"/"}
            className="fixed top-4 left-4 z-50 p-3 bg-white/30 backdrop-blur-md rounded-full shadow-md transition-all duration-300 hover:bg-white/50 hover:scale-105"
        >
            <AiFillHome className="w-6 h-6 text-white opacity-80" />
        </Link>
    );
};
