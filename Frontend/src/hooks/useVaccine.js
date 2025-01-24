import { useState, useEffect } from "react";
import { fetchData } from "@/utils/api";

export const useVaccine = () => {
  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch vaccine types
  const fetchVaccineTypes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchData("/vaccine/all");
      //console.log("Fetched vaccine types:", data);

      const formattedData = data.map((vaccine) => ({
        vaccineId: vaccine.vacIdPk || 0,
        vaccineType: vaccine.vacType || "",
      }));
      setVaccineTypes(formattedData);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (vaccineTypes.length === 0) {
      fetchVaccineTypes();
    }
  }, []);

  return { vaccineTypes, isLoading, error };
};
