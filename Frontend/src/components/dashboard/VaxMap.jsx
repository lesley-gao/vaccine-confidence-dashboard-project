// This component is used to display the map of the vaccination centers in New Zealand. 
// Currently, it is embedded from Google Maps.
// In the next iteration, we will use the Google Maps API to display the map.
// The component will be used in the DashboardPage and MapPage.

export default function VaxMap() {
  return (
    <div className="p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] h-full ">
      <h1 className="text-xl font-bold font-PoppinsBold mb-3">Where to get vaccinated?</h1>
      <div className="w-full"><iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d51073.71527786729!2d174.79841100190524!3d-36.86385268123841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snz!4v1733364468711!5m2!1sen!2snz"
        style={{
          width: "100%",
          height: "100%",
          border: "0",
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe></div>
    </div>
  );
}
