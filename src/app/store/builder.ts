"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";
import { SectionType } from "./types";
import toast from "react-hot-toast";

interface BuilderState {
  sections: SectionType[];
  addSection: (section: Omit<SectionType, "id">) => void;
  updateSection: (
    id: string,
    updatedData: Partial<Omit<SectionType, "id">>
  ) => void;
  removeSection: (id: string) => void;
  reorderSections: (start: number, end: number) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportJSON: () => void;
  importJSON: (data: string) => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  sections: [],

  addSection: (section) => {
    const newSection: SectionType = {
      ...section,
      id: nanoid(),
      title: section.title || "",
      description: section.description || "",
      image: section.image || "",
    };

    set((state) => ({
      sections: [...state.sections, newSection],
    }));

    toast.success("✅ Section added successfully");
  },

  updateSection: (id, updatedData) => {
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updatedData } : s
      ),
    }));
  },

  removeSection: (id) => {
    set((state) => {
      const filteredSections = state.sections.filter((s) => s.id !== id);
      console.log("Removing section with id:", id); // Debug log
      console.log("Sections before:", state.sections.length); // Debug log
      console.log("Sections after:", filteredSections.length); // Debug log
      return { sections: filteredSections };
    });

    toast.success("🗑️ Section removed successfully");
  },

  reorderSections: (start, end) => {
    set((state) => {
      const updated = [...state.sections];
      const [removed] = updated.splice(start, 1);
      updated.splice(end, 0, removed);
      return { sections: updated };
    });
  },

  saveToLocalStorage: () => {
    try {
      const state = get();
      localStorage.setItem("site-builder", JSON.stringify(state.sections));
      toast.success("💾 Saved to local storage");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("❌ Failed to save");
    }
  },

  loadFromLocalStorage: () => {
    try {
      const data = localStorage.getItem("site-builder");
      if (data) {
        const parsed = JSON.parse(data);
        // Validate the data structure
        if (Array.isArray(parsed)) {
          set({ sections: parsed });
          if (parsed.length !== 0) {
            toast.success("📂 Loaded from local storage");
          }
        } else {
          toast.error("❌ Invalid data format");
        }
      } else {
        toast.error("❌ No saved data found");
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error("❌ Failed to load from local storage");
    }
  },

  exportJSON: () => {
    try {
      const json = JSON.stringify(get().sections, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "site-builder.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("📤 Exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("❌ Failed to export JSON");
    }
  },

  importJSON: (data) => {
    try {
      const parsed = JSON.parse(data);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            "id" in item &&
            "title" in item &&
            "description" in item &&
            "image" in item
        )
      ) {
        set({ sections: parsed });
        toast.success("✅ JSON imported successfully");
      } else {
        toast.error("❌ Invalid JSON format - expected array of sections");
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error("❌ Invalid JSON format");
    }
  },
}));
