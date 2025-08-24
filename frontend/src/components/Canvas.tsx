import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableItem {
  id: string;
  content: string;
  type: 'block' | 'connector';
}

interface SortableItemProps {
  item: DraggableItem;
}

function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-4 mb-2 rounded-lg border-2 border-dashed cursor-move
        ${
          item.type === 'block'
            ? 'bg-blue-50 border-blue-300 hover:border-blue-400'
            : 'bg-green-50 border-green-300 hover:border-green-400'
        }
        transition-all duration-200
      `}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-700">{item.content}</span>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            item.type === 'block'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {item.type}
        </span>
      </div>
    </div>
  );
}

interface CanvasProps {
  className?: string;
}

export default function Canvas({ className = '' }: CanvasProps) {
  const [items, setItems] = useState<DraggableItem[]>([
    { id: '1', content: 'Data Source Block', type: 'block' },
    { id: '2', content: 'Embedding Model', type: 'block' },
    { id: '3', content: 'Vector Database', type: 'block' },
    { id: '4', content: 'LLM Integration', type: 'block' },
    { id: '5', content: 'Response Generator', type: 'block' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        RAG Pipeline Canvas
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Drag and drop blocks to create your RAG pipeline
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map(item => (
              <SortableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Drag blocks to reorder your pipeline components
        </p>
      </div>
    </div>
  );
}
