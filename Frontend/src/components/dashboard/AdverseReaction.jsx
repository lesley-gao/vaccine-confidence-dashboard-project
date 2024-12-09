function AdverseReaction() {
  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col items-start h-full">
      <div className="text-xl font-bold font-PoppinsBold mb-3.5">
        Adverse Reactions
      </div>

      <div className="flex flex-row gap-3 m-auto">
        <p className="font-PoppinsRegular">
          <span className="text-[#8979ff] text-[36px] font-PoppinsBold">
            221
          </span>{" "}
          severe reports
        </p>
      </div>
      <div className="text-[16px] font-PoppinsRegular self-end">in 5 years</div>
    </div>
  );
}

export default AdverseReaction;