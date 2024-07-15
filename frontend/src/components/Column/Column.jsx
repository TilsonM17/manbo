import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Column = ({ id, title, itemsOrder, ITEMS, deleteTask, addTask, editTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;
    addTask(newTaskTitle, newTaskDescription, title);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsAdding(false);
  };

  const handleEditTask = (taskId) => {
    if (newTaskTitle.trim() === '') return;
    editTask(taskId, newTaskTitle, newTaskDescription, title);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const openEditForm = (task) => {
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setCurrentTaskId(task.id);
    setIsEditing(true);
  };

  return (
    <Droppable droppableId={id} type="DEFAULT">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="p-2">
          <div className="flex justify-between items-center">
          
            <button
              onClick={() => setIsAdding(true)}
              className="bg-blue-500 text-white px-2 py-1 mb-3 rounded-md"
            >
              +
            </button>
          </div>
          {itemsOrder.map((itemId, index) => (
            <Draggable key={itemId} draggableId={itemId} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="border rounded-md p-2 mb-2 bg-white flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-black text-lg">{ITEMS[itemId].title}</p>
                    <small className="text-sm text-black">{ITEMS[itemId].description}</small>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditForm(ITEMS[itemId])}
                      className="bg-yellow-500 text-dark px-2 py-1 rounded-md"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => deleteTask(itemId)}
                      className="bg-red-500 text-dark px-2 py-1 rounded-md"
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <div className="mt-2">
            {(isAdding || isEditing) && (
              <div className="p-2 border rounded-md bg-gray-200">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full text-black p-2 mb-2"
                />
                <textarea
                  placeholder="Task Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="w-full text-black p-2 mb-2"
                />
                {isAdding ? (
                  <button
                    onClick={handleAddTask}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Add Task
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(currentTaskId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(false);
                    setCurrentTaskId(null);
                    setNewTaskTitle('');
                    setNewTaskDescription('');
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
