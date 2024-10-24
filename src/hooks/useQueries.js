import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const useQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQueries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/queries");
      setQueries(response.data.data);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError("Failed to fetch queries.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuery = async (queryData) => {
    try {
      setLoading(true);
      await axiosInstance.post("/queries", queryData);
      fetchQueries();
    } catch (err) {
      console.error("Error creating query:", err);
      setError("Failed to create query.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuery = async (queryId, queryData) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/queries/${queryId}`, queryData);
      fetchQueries();
    } catch (err) {
      console.error("Error updating query:", err);
      setError("Failed to update query.");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuery = async (queryId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/queries/${queryId}`); 
      fetchQueries();
    } catch (err) {
      console.error("Error deleting query:", err);
      setError("Failed to delete query.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  return {
    queries,
    loading,
    error,
    fetchQueries,
    createQuery,
    updateQuery,
    deleteQuery,
  };
};

export default useQueries;
