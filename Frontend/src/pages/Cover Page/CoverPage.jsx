
import TopBar from "./TopBar"

function CoverPage() {

  return (
    <>
      <div className="bg-cover-page bg-center bg-cover w-screen h-screen flex flex-col">

        <TopBar />

        <div className="absolute top-[42%] left-[5%] items-start justify-center">

          <div className="text-white text-[70px] font-BaiJamjureeBold ml-[-30px]"
            style={{ textShadow: "0px 4px 10px rgba(255, 255, 255, 0.25)" }}
          >
            Protect Yourself
          </div>

          <div className="text-white text-[70px] font-BaiJamjureeBold"
            style={{ textShadow: "0px 4px 10px rgba(255, 255, 255, 0.25)" }}
          >
            And the One You Care</div>

          <div className="text-[#021024] text-[30px] font-BaiJamjureeBold mt-6"
            style={{ textShadow: "0px 4px 10px rgba(255, 255, 255, 0.25)" }}
          >
            The Vaccine Confidence Tracker in NZ</div>

          <div className="text-[#021024] text-[20px] font-BaiJamjureeLight w-[800px] h-[95.68px]">
            We are committed to providing you with professional vaccine reliability information through clear data
            visualization dashboards to eliminate misinformation.
          </div>
        </div>

      </div>
    </>
  )
}

export default CoverPage
