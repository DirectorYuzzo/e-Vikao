import { useState, useEffect } from "react";
import { AgendaItem } from "../types";

const useAgendaItems = () => {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgendaItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/agenda");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgendaItems();
  }, []);

  return { items, isLoading, error };
};

export default useAgendaItems;
