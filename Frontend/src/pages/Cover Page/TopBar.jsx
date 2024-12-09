function TopBar() {
  return (
    <div className="relative">

      {/* Top Bar */}
      <div className="absolute left-1/2 top-5 w-[92%] h-[65px] rounded-[50px] flex items-center justify-between bg-white bg-opacity-30 shadow-md backdrop-blur-[10px] transform -translate-x-1/2">

        {/* VaxPulse Logo */}
        <div className="absolute left-[30px] flex flex-row items-center gap-2">
            <div className="w-[42px] h-[40px]">
              <img src="src/assets/logo.png" alt="logo" />
            </div>
            <div className="text-[#151d48] text-[36px] font-BaiJamjureeBold leading-[150%]">
              VaccineView
            </div>
        </div>

        {/* in-middle button */}
        <div className="absolute left-1/2 w-[50%] transform -translate-x-1/2 flex items-center justify-between ">
          <button className="text-white text-[32px] font-BaiJamjureeLight hover:scale-105 transition-transform duration-500 "><a href="/dashboard">Dashboard</a></button>
          <button className="text-[#052959] text-[32px] font-BaiJamjureeLight hover:scale-105 transition-transform duration-500">About Us</button>
          <button className="text-[#052959] text-[32px] font-BaiJamjureeLight hover:scale-105 transition-transform duration-500">FAQs</button>
        </div>

        <div className="absolute right-[30px] flex items-center">
          <button className="w-[140px] h-[45px] rounded-[25px] bg-gradient-to-r from-[#5483B3] to-[#1d7bb8] shadow-[0px_5px_15px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 hover:shadow-[0px_5px_5px_rgba(0,0,0,0.5),0_0_5px_#4a90e2] transition-all duration-500 relative overflow-hidden">
            <div className="text-white text-[24px] font-BaiJamjureeLight relative z-10">
              Log In
            </div>
            <div className="absolute inset-0 bg-white opacity-10 blur-lg rounded-[25px] transition-opacity duration-500 hover:opacity-20"></div>
          </button>
        </div>
      </div>

    </div>
  );
}

export default TopBar;