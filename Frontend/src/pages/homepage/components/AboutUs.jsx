const developers = [
  {
    name: "FuXiang (Shawn) Xu",
    avatar: "/image/Shawn-avatar.png",
    contactInfo: "fxu191@aucklanduni.ac.nz",
  },
  {
    name: "Jinjiang (Mark) Ye",
    avatar: "/image/Mark-avatar.png",
    contactInfo: "jye683@aucklanduni.ac.nz",
  },
  {
    name: "Lesley Gao",
    avatar: "/image/Lesley-avatar.png",
    contactInfo: "glei164@aucklanduni.ac.nz",
  },
  {
    name: "Xiaoxiao (Echo) Yu",
    avatar: "/image/Echo-avatar.png",
    contactInfo: "xyu653@aucklanduni.ac.nz",
  },
  {
    name: "Yifan (Ivan) Li ",
    avatar: "/image/Ivan-avatar.png",
    contactInfo: "yil732@aucklanduni.ac.nz",
  },
];

const AboutUs = () => {
  return (
    <div className="mt-12 text-white flex justify-center space-x-8">
      {developers.map((developer, index) => (
        <div key={index} className="flex flex-col items-center">
          <img
            src={developer.avatar}
            alt={`${developer.name}'s avatar`}
            className="w-16 h-16 rounded-full mb-4"
          />
          <p className="text-sm font-bold">{developer.name}</p>
          <p className="text-sm">{developer.contactInfo}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
