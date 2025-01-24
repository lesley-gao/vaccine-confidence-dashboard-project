// This component is a banner that promotes vaccination. It is displayed on the Login and Signup pages.
import { Link } from 'react-router-dom';

export default function PasswordImg() {
    return (
        <div className="h-screen bg-gradient-to-b from-customTheme-light to-customTheme-dark flex items-center justify-center">

            <div className="w-3/5 p-10 border-[1px] border-white rounded-lg bg-[#FFF2F2] bg-opacity-10">

                <Link to="/">
                    <img src="/image/resetPW.png" alt="reset password" className="mx-auto rounded-xl" />
                </Link>
            </div>
        </div>
    );
}
