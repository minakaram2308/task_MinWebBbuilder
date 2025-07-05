'use client';

import { useBuilderStore } from '@/app/store/builder';
import { sectionTemplates } from '../data/sectionTemplates';

export const SectionLibrary = () => {
  const { addSection } = useBuilderStore();

  const handleAddTemplate = (template: any) => {
    addSection(template);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Section Library</h2>
      <div className="space-y-2">
        {sectionTemplates.map((section, index) => (
          <button
            key={index}
            onClick={() => handleAddTemplate(section.template)}
            className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-sm">{section.name}</div>
            <div className="text-xs text-gray-500 mt-1">{section.template.title}</div>
          </button>
        ))}
        
        <div className="border-t pt-2 mt-4">
               <button
           onClick={() => addSection({ title: '', description: '', image: '' })}
        className="relative w-full overflow-hidden rounded-xl bg-purple-600 px-6 py-3 text-white font-semibold
             shadow-lg transition-all duration-300 ease-in-out
             hover:shadow-purple-700/50 group cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          ➕ <span> Add Blank Section</span>
        </span>

        <div
          className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
               opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
        />
      </button>
        </div>
      </div>
    </div>
  );
};