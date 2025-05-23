/**
 * This is the logo that is displayed on the top left corner of the page.
 */
export default function Logo() {
    return (
        <div>
            <a href="/" className="absolute top-10 left-10 flex flex-row items-center gap-2">
                <div className="w-[42px] h-[40px]">
                    <img src="/image/logo.png" alt="logo" />
                </div>
                <div className="text-[#151d48] text-[24px] font-BaiJamjureeBold leading-[150%]">
                    VaccineView
                </div>
            </a>
        </div>
    );
}
