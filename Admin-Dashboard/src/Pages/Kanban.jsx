import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
 

const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Design Homepage',
      description: 'Create the main homepage layout',
      deadline: '2025-06-10',
      assignedTo: 'Manish',
      priority: 'High',
      checklist: 3,
      completed: 1
    },
    'task-2': {
      id: 'task-2',
      title: 'Set Up API',
      description: 'Initialize backend endpoints',
      deadline: '2025-06-12',
      assignedTo: 'Anjali',
      priority: 'Medium',
      checklist: 5,
      completed: 2
    }
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2']
    },
    'inProgress': {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: []
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['todo', 'inProgress', 'done']
};

function KanbanBoard() {
  const [data, setData] = useState(initialData);
  const [showForm, setShowForm] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
    priority: 'Low',
    checklist: 1,
    completed: 0
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    });
  };

  const handleAddTask = (columnId) => {
    const id = `task-${Date.now()}`;
    const updatedTasks = {
      ...data.tasks,
      [id]: {
        id,
        ...newTask
      }
    };

    const updatedColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, id]
    };

    setData({
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        [columnId]: updatedColumn
      }
    });

    setNewTask({
      title: '',
      description: '',
      deadline: '',
      assignedTo: '',
      priority: 'Low',
      checklist: 1,
      completed: 0
    });

    setShowForm(false);
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="kanban-container">
      <h2 className="text-2xl font-bold mb-4">🗂️ Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board flex gap-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    className="column bg-gray-100 p-4 rounded-md w-80"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{column.title}</h3>
                      <button
                        onClick={() => {
                          setCurrentColumn(column.id);
                          setShowForm(true);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        ➕ Add
                      </button>
                    </div>

                    {tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            className={`task bg-white p-3 rounded shadow mb-3 border-l-4 ${task.priority === 'High'
                              ? 'border-red-500'
                              : task.priority === 'Medium'
                                ? 'border-yellow-500'
                                : 'border-green-500'
                              }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4 className="font-semibold">{task.title}</h4>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            <p className="text-xs">👤 {task.assignedTo}</p>
                            <p className={`text-xs ${isOverdue(task.deadline) ? 'text-red-600' : ''}`}>
                              ⏳ {task.deadline}
                            </p>
                            <p className="text-xs">🔖 Priority: {task.priority}</p>
                            <div className="mt-2">
                              <progress
                                value={task.completed}
                                max={task.checklist}
                                className="w-full"
                              />
                              <p className="text-xs text-right">
                                {Math.round((task.completed / task.checklist) * 100)}%
                              </p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Assigned To"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="border p-2 w-full mb-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              onClick={() => handleAddTask(currentColumn)}
            >
              ✅ Add
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setShowForm(false)}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
