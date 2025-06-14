// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const initialData = {
//   tasks: {
//     'task-1': {
//       id: 'task-1',
//       title: 'Design Homepage',
//       description: 'Create layout',
//       deadline: '2025-06-05',
//       assignedTo: 'Manish',
//       priority: 'High',
//       checklist: ['Header', 'Footer', 'Banner'],
//       completed: [true, false, false]
//     }
//   },
//   columns: {
//     'todo': { id: 'todo', title: 'To Do', taskIds: ['task-1'] },
//     'inProgress': { id: 'inProgress', title: 'In Progress', taskIds: [] },
//     'done': { id: 'done', title: 'Done', taskIds: [] }
//   },
//   columnOrder: ['todo', 'inProgress', 'done']
// };

// function KanbanBoard() {
//   const [data, setData] = useState(initialData);
//   const [newTask, setNewTask] = useState({
//     title: '', description: '', deadline: '', assignedTo: '', priority: 'Low', checklist: ''
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [activeColumn, setActiveColumn] = useState(null); // 🔑 This determines where to add the new task

//   const onDragEnd = ({ destination, source, draggableId }) => {
//     if (!destination) return;
//     const start = data.columns[source.droppableId];
//     const finish = data.columns[destination.droppableId];

//     if (start === finish) {
//       const newTaskIds = [...start.taskIds];
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);
//       const newColumn = { ...start, taskIds: newTaskIds };

//       setData({
//         ...data,
//         columns: { ...data.columns, [newColumn.id]: newColumn }
//       });
//     } else {
//       const startTaskIds = [...start.taskIds];
//       startTaskIds.splice(source.index, 1);
//       const finishTaskIds = [...finish.taskIds];
//       finishTaskIds.splice(destination.index, 0, draggableId);

//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [start.id]: { ...start, taskIds: startTaskIds },
//           [finish.id]: { ...finish, taskIds: finishTaskIds }
//         }
//       });
//     }
//   };

//   const handleChecklistChange = (taskId, index) => {
//     const task = data.tasks[taskId];
//     const newCompleted = [...task.completed];
//     newCompleted[index] = !newCompleted[index];

//     setData({
//       ...data,
//       tasks: {
//         ...data.tasks,
//         [taskId]: { ...task, completed: newCompleted }
//       }
//     });
//   };

//   // ✅ Updated to use activeColumn
//   const handleAddTask = () => {
//     if (!newTask.title.trim() || !activeColumn) return;

//     const id = `task-${Date.now()}`;
//     const checklistArray = newTask.checklist.split(',').map(i => i.trim());

//     const newTaskObj = {
//       id,
//       title: newTask.title,
//       description: newTask.description,
//       deadline: newTask.deadline,
//       assignedTo: newTask.assignedTo,
//       priority: newTask.priority,
//       checklist: checklistArray,
//       completed: new Array(checklistArray.length).fill(false)
//     };

//     setData(prev => ({
//       ...prev,
//       tasks: { ...prev.tasks, [id]: newTaskObj },
//       columns: {
//         ...prev.columns,
//         [activeColumn]: {
//           ...prev.columns[activeColumn],
//           taskIds: [...prev.columns[activeColumn].taskIds, id]
//         }
//       }
//     }));

//     setNewTask({ title: '', description: '', deadline: '', assignedTo: '', priority: 'Low', checklist: '' });
//     setShowModal(false);
//     setActiveColumn(null);
//   };

//   const isOverdue = (date) => new Date(date) < new Date();

//   return (
//     <div className="kanban-board">
//       <DragDropContext onDragEnd={onDragEnd}>
//         {data.columnOrder.map((columnId) => {
//           const column = data.columns[columnId];
//           const tasks = column.taskIds.map(id => data.tasks[id]);
//           return (
//             <Droppable droppableId={column.id} key={column.id}>
//               {(provided) => (
//                 <div className="kanban-column" {...provided.droppableProps} ref={provided.innerRef}>
//                   <h2>{column.title}</h2>

//                   {/* 👇 Column-wise Add Task button */}
//                   <button className="column-add-btn" onClick={() => {
//                     setActiveColumn(column.id);
//                     setShowModal(true);
//                   }}>
//                     ➕ Add Task
//                   </button>

//                   {tasks.map((task, index) => (
//                     <Draggable draggableId={task.id} index={index} key={task.id}>
//                       {(provided) => (
//                         <div
//                           className={`kanban-task priority-${task.priority.toLowerCase()} ${isOverdue(task.deadline) ? 'overdue' : ''}`}
//                           ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <h3>{task.title}</h3>
//                           <p>{task.description}</p>
//                           <p><strong>Assigned:</strong> {task.assignedTo}</p>
//                           <p><strong>Deadline:</strong> {task.deadline}</p>
//                           <p><strong>Priority:</strong> {task.priority}</p>
//                           <ul>
//                             {task.checklist.map((item, idx) => (
//                               <li key={idx}>
//                                 <input
//                                   type="checkbox"
//                                   checked={task.completed[idx]}
//                                   onChange={() => handleChecklistChange(task.id, idx)}
//                                 /> {item}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           );
//         })}
//       </DragDropContext>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Add New Task</h2>
//             <input placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
//             <textarea placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
//             <input type="date" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />
//             <input placeholder="Assigned To" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} />
//             <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//             <input placeholder="Checklist (comma separated)" value={newTask.checklist} onChange={(e) => setNewTask({ ...newTask, checklist: e.target.value })} />
//             <div>
//               <button onClick={handleAddTask}>Add Task</button>
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default KanbanBoard;
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = {
  tasks: {},
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: [] },
    inProgress: { id: 'inProgress', title: 'In Progress', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] }
  },
  columnOrder: ['todo', 'inProgress', 'done']
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);
  const [newTask, setNewTask] = useState({
    title: '', description: '', deadline: '', assignedTo: '', priority: 'Low', checklist: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };

      setData(prev => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.id]: newColumn }
      }));
    } else {
      const startTaskIds = [...start.taskIds];
      startTaskIds.splice(source.index, 1);
      const finishTaskIds = [...finish.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [start.id]: { ...start, taskIds: startTaskIds },
          [finish.id]: { ...finish, taskIds: finishTaskIds }
        }
      }));
    }
  };

  const handleAddTask = () => {
    if (!newTask.title.trim() || !activeColumn) return;

    const id = `task-${Date.now()}`;
    const checklistArray = newTask.checklist.split(',').map(i => i.trim());
    const newTaskObj = {
      id,
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
      assignedTo: newTask.assignedTo,
      priority: newTask.priority,
      checklist: checklistArray,
      completed: new Array(checklistArray.length).fill(false)
    };

    setData(prev => ({
      ...prev,
      tasks: { ...prev.tasks, [id]: newTaskObj },
      columns: {
        ...prev.columns,
        [activeColumn]: {
          ...prev.columns[activeColumn],
          taskIds: [...prev.columns[activeColumn].taskIds, id]
        }
      }
    }));

    setNewTask({ title: '', description: '', deadline: '', assignedTo: '', priority: 'Low', checklist: '' });
    setShowModal(false);
    setActiveColumn(null);
  };

  const isOverdue = (date) => new Date(date) < new Date();

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

          return (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div className="kanban-column" {...provided.droppableProps} ref={provided.innerRef}>
                  <h2>{column.title}</h2>

                  <button className="column-add-btn" onClick={() => {
                    setActiveColumn(column.id);
                    setShowModal(true);
                  }}>➕ Add Task</button>

                  {tasks.map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          className={`kanban-task priority-${task.priority.toLowerCase()} ${isOverdue(task.deadline) ? 'overdue' : ''}`}
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p><strong>Assigned:</strong> {task.assignedTo}</p>
                          <p><strong>Deadline:</strong> {task.deadline}</p>
                          <p><strong>Priority:</strong> {task.priority}</p>
                          <ul>
                            {task.checklist.map((item, idx) => (
                              <li key={idx}>
                                <input
                                  type="checkbox"
                                  checked={task.completed[idx]}
                                  onChange={() => {
                                    const updatedTask = { ...task };
                                    updatedTask.completed[idx] = !updatedTask.completed[idx];
                                    setData(prev => ({
                                      ...prev,
                                      tasks: {
                                        ...prev.tasks,
                                        [task.id]: updatedTask
                                      }
                                    }));
                                  }}
                                /> {item}
                              </li>
                            ))}
                          </ul>
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
      </DragDropContext>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            <textarea placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            <input type="date" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />
            <input placeholder="Assigned To" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} />
            <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input placeholder="Checklist (comma separated)" value={newTask.checklist} onChange={(e) => setNewTask({ ...newTask, checklist: e.target.value })} />
            <div>
              <button onClick={handleAddTask}>Add Task</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
