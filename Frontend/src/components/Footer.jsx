// This is the compoment that displays the footer of the application.
// The footer contains the social media links and the copy right information.
// The footer will be used in the HomePage.
import { BsLinkedin, BsYoutube, BsInstagram } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    return (
        <div className="bg-[#152063] text-white py-10">

            <div className="container mx-auto text-center flex flex-col items-center space-y-4">

                <p className="text-md font-bold md:text-xl">VaccineView</p>

                <div className="flex h-5 items-center space-x-4 text-sm md:text-lg">
                    <FaXTwitter /><BsInstagram /><BsYoutube /><BsLinkedin />
                </div>

                <p className="text-sm md:text-lg">© 2024 Auckland ICT Graduate School. All rights reserved.</p>

                <div className="flex h-5 items-center space-x-4 text-sm md:text-lg">
                    <div><a href="#">About Us</a></div>
                    <Separator orientation="vertical" />
                    <div><a href="#">Contact Us</a></div>
                    <Separator orientation="vertical" />
                    <div><a href="#">Terms</a></div>
                    <Separator orientation="vertical" />
                    <div><a href="#">Support</a></div>
                    <Separator orientation="vertical" />
                    <div><a href="#">Privacy</a></div>
                </div>
            </div>

        </div>
    );
}
