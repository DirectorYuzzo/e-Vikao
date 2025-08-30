import { useState, useEffect } from "react";
import { AgendaItem } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export const useAgendaItems = () => {
  const [items, setItems] = useLocalStorage<AgendaItem[]>("agendaItems", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const createItem = async (itemData: Omit<AgendaItem, "id">) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newItem: AgendaItem = {
        ...itemData,
        id: Date.now().toString(),
      };

      setItems((prev) => [newItem, ...prev]);
      setError(null);
      return newItem;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create agenda item";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<AgendaItem>) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updatedItem = { ...updates, id } as AgendaItem;
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );

      setError(null);
      return updatedItem;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update agenda item";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setItems((prev) => prev.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete agenda item";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === "completed" ? "pending" : "completed",
              }
            : item
        )
      );

      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to toggle status";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPrioritizedItems = () => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...items].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  return {
    items,
    prioritizedItems: getPrioritizedItems(),
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    toggleStatus,
  };
};
