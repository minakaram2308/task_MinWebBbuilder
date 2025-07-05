'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

interface SortableSectionProps {
  id: string;
  children: ReactNode;
}

export const SortableSection = ({ id, children }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="relative">
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded cursor-move flex items-center justify-center text-gray-600 z-10"
          title="Drag to reorder"
        >
          ⋮⋮
        </div>
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
};