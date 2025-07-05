"use client";

import { useBuilderStore } from "@/app/store/builder";
import { SectionRenderer } from "./SectionRenderer";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSection } from "./SortableSection";

export const Preview = () => {
  const { sections, reorderSections } = useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSections(oldIndex, newIndex);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      {sections.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No sections yet. Add some sections to get started!
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {sections.map((section) => (
                <SortableSection key={section.id} id={section.id}>
                  <div className="border rounded-xl p-4 bg-gray-50 shadow-sm transition hover:shadow relative">
                    <SectionRenderer id={section.id} />
                  </div>
                </SortableSection>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
