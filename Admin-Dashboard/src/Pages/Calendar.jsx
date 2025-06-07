import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { v4 as uuidv4 } from 'uuid';

const localizer = momentLocalizer(moment);

function CalendarApp() {
  const [events, setEvents] = useState([]);
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
    setNewEvent({ title: '', start: '', end: '', category: 'Personal', color: '#3174ad' });
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

  return (
    <div className="calendar-container" style={{ padding: '20px' }}>
      <h2>📅 Event Calendar</h2>

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

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => handleDeleteEvent(event.id)}
      />
    </div>
  );
}

export default CalendarApp;



