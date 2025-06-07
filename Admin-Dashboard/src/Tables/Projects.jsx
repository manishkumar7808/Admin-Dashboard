import React, { useState } from 'react';

const initialProjects = [
  { id: 1, name: 'Dashboard Redesign', client: 'Acme Corp', manager: 'Alice', progress: 70, deadline: '2025-07-01', priority: 'High' },
  { id: 2, name: 'Mobile App', client: 'Globex', manager: 'Bob', progress: 40, deadline: '2025-08-15', priority: 'Medium' },
  { id: 3, name: 'Website Migration', client: 'Initech', manager: 'Clara', progress: 100, deadline: '2025-05-15', priority: 'Low' },
  { id: 4, name: 'Backend API', client: 'Umbrella Inc.', manager: 'David', progress: 55, deadline: '2025-07-20', priority: 'High' },
  { id: 5, name: 'CRM Integration', client: 'Soylent Corp', manager: 'Eve', progress: 90, deadline: '2025-07-05', priority: 'Medium' },
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [newProject, setNewProject] = useState({ name: '', client: '', manager: '', progress: 0, deadline: '', priority: 'Low' });

  const filteredProjects = projects.filter(project =>
    priorityFilter === 'All' || project.priority === priorityFilter
  );

  const handleAddProject = () => {
    const newId = projects.length + 1;
    setProjects([...projects, { id: newId, ...newProject }]);
    setNewProject({ name: '', client: '', manager: '', progress: 0, deadline: '', priority: 'Low' });
  };

  return (
    <div className='page-container'>
      <h2>Projects</h2>
      <div className="filter">
        <label>Filter by Priority: </label>
        <select onChange={(e) => setPriorityFilter(e.target.value)}>
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="add-project-form">
        <h4>Add New Project</h4>
        <input placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
        <input placeholder="Client" value={newProject.client} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} />
        <input placeholder="Manager" value={newProject.manager} onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })} />
        <input type="number" placeholder="Progress (%)" value={newProject.progress} onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value) })} />
        <input type="date" value={newProject.deadline} onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })} />
        <select value={newProject.priority} onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={handleAddProject}>Add Project</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Project</th><th>Client</th><th>Manager</th><th>Progress</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.client}</td>
              <td>{project.manager}</td>
              <td>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${project.progress}%` }}>{project.progress}%</div>
                </div>
              </td>
              <td>{project.deadline}</td>
              <td><span className={`badge badge-${project.priority.toLowerCase()}`}>{project.priority}</span></td>
              <td>
                {project.progress >= 100 ? <span className="badge badge-success">Completed</span> : <span className="badge badge-warning">In Progress</span>}
              </td>
              <td><button onClick={() => alert(`Details of ${project.name}`)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Projects;
