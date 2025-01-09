export default function Header() {
    return (
        <div className="flex flex-col gap-10">

            {/* Header Section */}
            <div className="flex flex-col relative">
            <img className="w-screen" src="src/assets/Social media page header img.png" alt="SocialMediaPageHeaderImg" />
            <img className="absolute top-20 w-[350px] ml-10" src="src/assets/Social media icon.png" alt="SocialMediaIcon" />
            </div>

            {/* Title Section */}
            <div className="flex flex-row items-center gap-10">
            <div className="flex flex-col">
                <p className="ml-10 w-[800px] text-[#3949AB] text-[38px] font-BaiJamjureeBold">
                    What are people's attitudes towards vaccines on{" "}
                    <span className="text-[#152063]">social media platforms?</span>
                </p>
                <div className="ml-10 font-PoppinsRegular">
                ** The comments are from Twitter, Reddit, Quora, and Facebook platforms.
                </div>
            </div>
            <img src="src/assets/Example-avatar.png" alt="ExampleAvatar" />
            </div>


        </div>
    )
}