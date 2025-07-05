'use client';

import { useBuilderStore } from '@/app/store/builder';

export const SectionRenderer = ({ id }: { id: string }) => {
  const section = useBuilderStore((state) =>
    state.sections.find((s) => s.id === id)
  );
  const updateSection = useBuilderStore((state) => state.updateSection);
  const removeSection = useBuilderStore((state) => state.removeSection);

  if (!section) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    const { name, value } = e.target;
    updateSection(section.id, {
      [name]: value,
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    console.log('Removing section:', section.id);
    removeSection(section.id);
  };

  const handleInputFocus = (e: React.FocusEvent) => {
    e.stopPropagation(); 
  };

  const handleInputMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); 
  };

  return (
    <div className="space-y-2 border p-4 rounded-xl shadow-sm">
      <input
        name="title"
        type="text"
        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
        placeholder="Title"
        value={section.title || ''}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onMouseDown={handleInputMouseDown}
        autoComplete="off"
      />
      <input
        name="description"
        type="text"
        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
        placeholder="Description"
        value={section.description || ''}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onMouseDown={handleInputMouseDown}
        autoComplete="off"
      />
      <input
        name="image"
        type="text"
        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
        placeholder="Image URL"
        value={section.image || ''}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onMouseDown={handleInputMouseDown}
        autoComplete="off"
      />
      <button
        onClick={handleRemove}
        onMouseDown={handleInputMouseDown}
        className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors cursor-pointer"
      >
        🗑️ Remove Section
      </button>
    </div>
  );
};