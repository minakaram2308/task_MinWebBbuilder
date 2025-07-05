"use client";

import { useBuilderStore } from "@/app/store/builder";

export const Controls = () => {
  const { saveToLocalStorage, loadFromLocalStorage, exportJSON, importJSON } =
    useBuilderStore();

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      importJSON(result);
    };
    reader.readAsText(file);

    // Reset the input
    e.target.value = "";
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl space-y-2">
      <h2 className="text-xl font-semibold mb-4">Controls</h2>

            <button
        onClick={saveToLocalStorage}
        className="relative w-full overflow-hidden rounded-xl bg-purple-600 px-6 py-3 text-white font-semibold
             shadow-lg transition-all duration-300 ease-in-out
             hover:shadow-purple-700/50 group cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          💾 <span> Save changes</span>
        </span>

        {/* Glowing border effect */}
        <div
          className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
               opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
        />
      </button>



      {/* <button
        onClick={loadFromLocalStorage}
        className="relative w-full overflow-hidden rounded-xl bg-purple-600 px-6 py-3 text-white font-semibold
             shadow-lg transition-all duration-300 ease-in-out
             hover:shadow-purple-700/50 group cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          📂 <span> Load</span>
        </span>
        <div
          className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
               opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
        />
      </button> */}

      <button
        onClick={exportJSON}
        className="relative w-full overflow-hidden rounded-xl bg-purple-600 px-6 py-3 text-white font-semibold
             shadow-lg transition-all duration-300 ease-in-out
             hover:shadow-purple-700/50 group cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          📤 <span>Export JSON</span>
        </span>

        <div
          className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
               opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
        />
      </button>

      <label className="block">
        <span className="text-sm font-medium text-gray-700 mt-3 mb-1 block">
          📥 Import JSON
        </span>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="block w-full text-sm text-gray-700
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100
               transition duration-150 ease-in-out"
        />
      </label>
    </div>
  );
};
