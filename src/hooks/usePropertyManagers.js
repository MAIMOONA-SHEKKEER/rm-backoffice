import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const usePropertyManagers = () => {
  const [propertyManagers, setPropertyManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPropertyManagers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/property-managers");
      setPropertyManagers(response.data);
    } catch (err) {
      console.error("Error fetching property managers:", err);
      setError("Failed to load property managers.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createPropertyManager = async (managerData) => {
    try {
      await axiosInstance.post("/property-managers", managerData);
      fetchPropertyManagers();
    } catch (err) {
      console.error("Error creating property manager:", err);
    }
  };

  const updatePropertyManager = async (managerData) => {
    try {
      await axiosInstance.put(
        `/property-managers/${selectedManager.id}`,
        managerData
      );
      fetchPropertyManagers();
    } catch (err) {
      console.error("Error updating property manager:", err);
    }
  };

  const deletePropertyManager = async () => {
    try {
      await axiosInstance.delete(`/property-managers/${selectedManager.id}`);
      fetchPropertyManagers();
    } catch (err) {
      console.error("Error deleting property manager:", err);
    }
  };

  useEffect(() => {
    fetchPropertyManagers();
  }, [fetchPropertyManagers]);

  return {
    propertyManagers,
    selectedManager,
    setSelectedManager,
    createPropertyManager,
    updatePropertyManager,
    deletePropertyManager,
    loading,
    error,
  };
};

export default usePropertyManagers;
