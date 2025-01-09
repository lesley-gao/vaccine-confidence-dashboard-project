export default function OurMission() {
    return (
        <div className="flex flex-col items-center mb-20 gap-14">
            
            <div className="flex flex-row gap-16">
                <div className="flex flex-col w-1/3 gap-5">
                <img className="w-[50px] h-[50px]" src="src/assets/icon1.png" alt="icon1" />
                <div>
                <div className="text-[25px] font-bold text-[#152063]">Intutive</div>
                <div className="text-justify">We are committed to providing you with professional vaccine reliability information through clear data visualization dashboards to eliminate misinformation.</div>
                </div>
                </div>

                <div className="flex flex-col w-1/3 gap-5">
                <img className="w-[50px] h-[50px]" src="src/assets/icon2.png" alt="icon2" />
                <div>
                <div className="text-[25px] font-bold text-[#152063]">Insightful</div>
                <div className="text-justify">We hope that decision makers, academic researchers and other relevant professionals can gain insights here.</div>
                </div>
                </div>

                <div className="flex flex-col w-1/3 gap-5">
                <img className="w-[50px] h-[50px]" src="src/assets/icon3.png" alt="icon3" />
                <div>
                <div className="text-[25px] font-bold text-[#152063]">Practical</div>
                <div className="text-justify">We hope that the public can get more information they need about vaccines that are closely related to our personal health.</div>
                </div>
                </div>
            
            </div>

        </div>
        
    )
}

