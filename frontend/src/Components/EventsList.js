import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Ka ndodhur një gabim:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista e Eventev</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.event}</h2>
            <p>{event.description}</p>
            <p>Çmimi: €{event.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;