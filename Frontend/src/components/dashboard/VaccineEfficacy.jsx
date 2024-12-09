import { FaSyringe } from "react-icons/fa";

function VaccineEfficacy() {
  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col gap-3 h-full">
      <div className="text-xl font-bold font-PoppinsBold">Vaccine Efficacy</div>

      <div className="flex justify-between items-center gap-4 h-full">
        {/* 1st Dose */}
        <div className="flex flex-col items-center flex-1">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-200 rounded-full text-gray-600 text-4xl flex items-center justify-center w-16 h-16 mb-3">
            <FaSyringe />
          </div>
          <p className="text-[#acacac] text-[14px] font-PoppinsRegular">1st Dose</p>
          <p className="text-[#00ac4f] text-[28px] font-PoppinsBold leading-[100%]">90%-95%</p>
          <p className="text-[#292d32] text-[12px] font-PoppinsRegular text-center">
            effective against measles
          </p>
        </div>

        {/* Dividing Line */}
        <div className="w-[1px] h-[80px] bg-gray-200"></div>

        {/* 2nd Dose */}
        <div className="flex flex-col items-center flex-1">
          <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-full text-gray-600 text-4xl flex items-center justify-center w-16 h-16 mb-3">
            <FaSyringe />
          </div>
          <p className="text-[#acacac] text-[14px] font-PoppinsRegular">2nd Dose</p>
          <p className="text-[#00ac4f] text-[28px] font-PoppinsBold leading-[100%]">99%</p>
          <p className="text-[#292d32] text-[12px] font-PoppinsRegular text-center">
            effective against measles
          </p>
        </div>

        {/* Dividing Line */}
        <div className="w-[1px] h-[80px] bg-gray-200"></div>

        {/* Mortality Rate */}
        <div className="flex flex-col items-center flex-1">
          <div className="bg-gradient-to-r from-red-200 to-red-500 rounded-full text-gray-600 text-4xl flex items-center justify-center w-16 h-16 mb-3">
            <FaSyringe />
          </div>
          <p className="text-[#acacac] text-[14px] font-PoppinsRegular text-center">
            Mortality Rate
          </p>
          <p className="text-[#D0004B] text-[28px] font-PoppinsBold leading-[100%]">
            1 / 1000
          </p>
        </div>
      </div>
    </div>
  );
}

export default VaccineEfficacy;