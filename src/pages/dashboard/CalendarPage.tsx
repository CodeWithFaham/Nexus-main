// src/pages/dashboard/CalendarPage.tsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState([
    { title: 'Investor Meeting', start: '2023-10-25T10:00:00', color: '#1A73E8' }
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    const title = prompt('Enter Meeting Title:');
    if (title) {
      setEvents([...events, { title, start: arg.dateStr, color: '#34A853' }]);
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Meeting Scheduler</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek' }}
      />
    </div>
  );
};
export default CalendarPage;
