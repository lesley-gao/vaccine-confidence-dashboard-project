// This component is a banner that promotes vaccination. It is displayed on the Login and Signup pages.
export default function VaxBanner() {
    return (
        <div className="h-screen bg-gradient-to-b from-customTheme-light to-customTheme-dark flex items-center justify-center">
            <div className="flex flex-col items-center w-1/2 md:w-3/5 text-white p-8 border-[1px] border-white rounded-lg bg-[#FFF2F2] bg-opacity-20">

                <div className="w-full mb-8 2xl:p-8 text-[25px] 2xl:text-3xl font-bold">
                    <p className="text-left mb-8">Protect Yourself</p>
                    <p className="text-right">And the One You Care</p>
                </div>

                <div className="flex justify-center h-1/2">
                    <img
                        src="vaccination.png"
                        alt="group immunization"
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}
