// import React, { useState } from 'react';
// import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { v4 as uuidv4 } from 'uuid';

// const localizer = momentLocalizer(moment);

// // ✅ Custom Toolbar Component
// const CustomToolbar = (toolbar) => {
//   const goToBack = () => toolbar.onNavigate('PREV');
//   const goToNext = () => toolbar.onNavigate('NEXT');
//   const goToToday = () => toolbar.onNavigate('TODAY');
//   const goToView = (view) => toolbar.onView(view);

//   return (
//     <div className="rbc-toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//       <div className="rbc-btn-group">
//         <button onClick={goToBack}>⬅️ Back</button>
//         <button onClick={goToToday}>📍 Today</button>
//         <button onClick={goToNext}>➡️ Next</button>
//       </div>
//       <span className="rbc-toolbar-label" style={{ fontWeight: 'bold' }}>{toolbar.label}</span>
//       <div className="rbc-btn-group">
//         <button onClick={() => goToView('month')}>📅 Month</button>
//         <button onClick={() => goToView('week')}>🗓️ Week</button>
//         <button onClick={() => goToView('day')}>📆 Day</button>
//       </div>
//     </div>
//   );
// };

// function CalendarApp() {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     start: '',
//     end: '',
//     category: 'Personal',
//     color: '#3174ad'
//   });

//   const handleAddEvent = () => {
//     if (!newEvent.title || !newEvent.start || !newEvent.end) {
//       alert("Please fill all fields.");
//       return;
//     }

//     if (newEvent.start >= newEvent.end) {
//       alert('❌ End time must be after start time');
//       return;
//     }

//     setEvents([...events, { ...newEvent, id: uuidv4() }]);
//     setNewEvent({
//       title: '',
//       start: '',
//       end: '',
//       category: 'Personal',
//       color: '#3174ad'
//     });
//   };

//   const handleDeleteEvent = (eventId) => {
//     setEvents(events.filter(e => e.id !== eventId));
//   };

//   const eventStyleGetter = (event) => ({
//     style: {
//       backgroundColor: event.color,
//       borderRadius: '5px',
//       opacity: 0.9,
//       color: 'white',
//       border: '0px',
//       display: 'block'
//     }
//   });

//   return (
//     <div className="calendar-container" style={{ padding: '20px' }}>
//       <h2>📅 Event Calendar</h2>

//       <div className="event-form" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//         <input
//           type="text"
//           placeholder="Event Title"
//           value={newEvent.title}
//           onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//         />
//         <input
//           type="datetime-local"
//           value={newEvent.start ? new Date(newEvent.start).toISOString().slice(0, 16) : ''}
//           onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
//         />
//         <input
//           type="datetime-local"
//           value={newEvent.end ? new Date(newEvent.end).toISOString().slice(0, 16) : ''}
//           onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
//         />
//         <select
//           value={newEvent.category}
//           onChange={(e) => {
//             const category = e.target.value;
//             const colorMap = {
//               Meetings: '#ff7043',
//               Deadlines: '#f44336',
//               Personal: '#3174ad'
//             };
//             setNewEvent({ ...newEvent, category, color: colorMap[category] });
//           }}
//         >
//           <option value="Personal">Personal</option>
//           <option value="Meetings">Meetings</option>
//           <option value="Deadlines">Deadlines</option>
//         </select>
//         <button onClick={handleAddEvent}>Add Event</button>
//       </div>

//       {/* ✅ Calendar with Custom Toolbar */}
//       <BigCalendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         views={['month', 'week', 'day']}
//         eventPropGetter={eventStyleGetter}
//         onSelectEvent={(event) => handleDeleteEvent(event.id)}
//         components={{ toolbar: CustomToolbar }}
//       />
//     </div>
//   );
// }

// export default CalendarApp;
import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { v4 as uuidv4 } from 'uuid';

const localizer = momentLocalizer(moment);

function CalendarApp() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    category: 'Personal',
    color: '#3174ad'
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill all fields.");
      return;
    }

    if (newEvent.start >= newEvent.end) {
      alert('❌ End time must be after start time');
      return;
    }

    setEvents([...events, { ...newEvent, id: uuidv4() }]);
    setNewEvent({
      title: '',
      start: '',
      end: '',
      category: 'Personal',
      color: '#3174ad'
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block'
    }
  });

  // Navigation handlers
  const handleBack = () => {
    const newDate = moment(date).subtract(1, view === 'month' ? 'month' : view === 'week' ? 'week' : 'day');
    setDate(newDate.toDate());
  };

  const handleNext = () => {
    const newDate = moment(date).add(1, view === 'month' ? 'month' : view === 'week' ? 'week' : 'day');
    setDate(newDate.toDate());
  };

  const handleToday = () => setDate(new Date());

  return (
    <div className="calendar-container" style={{ padding: '20px' }}>
      <h2>📅 Event Calendar</h2>

      {/* 🔘 Toolbar Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div>
          <button onClick={handleBack}>⬅️ Back</button>
          <button onClick={handleToday}>📍 Today</button>
          <button onClick={handleNext}>➡️ Next</button>
        </div>
        <h3>{moment(date).format('MMMM YYYY')}</h3>
        <div>
          <button onClick={() => setView('month')}>📅 Month</button>
          <button onClick={() => setView('week')}>🗓️ Week</button>
          <button onClick={() => setView('day')}>📆 Day</button>
        </div>
      </div>

      {/* 📋 Event Form */}
      <div className="event-form" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newEvent.start ? new Date(newEvent.start).toISOString().slice(0, 16) : ''}
          onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
        />
        <input
          type="datetime-local"
          value={newEvent.end ? new Date(newEvent.end).toISOString().slice(0, 16) : ''}
          onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
        />
        <select
          value={newEvent.category}
          onChange={(e) => {
            const category = e.target.value;
            const colorMap = {
              Meetings: '#ff7043',
              Deadlines: '#f44336',
              Personal: '#3174ad'
            };
            setNewEvent({ ...newEvent, category, color: colorMap[category] });
          }}
        >
          <option value="Personal">Personal</option>
          <option value="Meetings">Meetings</option>
          <option value="Deadlines">Deadlines</option>
        </select>
        <button onClick={handleAddEvent}>Add Event</button>
      </div>

      {/* 📅 Calendar */}
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        view={view}
        date={date}
        onView={(view) => setView(view)}
        onNavigate={(newDate) => setDate(newDate)}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => handleDeleteEvent(event.id)}
      />
    </div>
  );
}

export default CalendarApp;
