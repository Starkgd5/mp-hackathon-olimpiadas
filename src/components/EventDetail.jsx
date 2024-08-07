// src/components/EventDetail.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://apis.codante.io/olympic-games/events/${id}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">{event.detailed_event_name}</h2>
      <div className="mb-4">
        <p className="text-lg font-semibold"><strong>Disciplina:</strong> {event.discipline_name}</p>
        <p className="text-lg font-semibold"><strong>Local:</strong> {event.venue_name}</p>
        <p className="text-lg font-semibold"><strong>Data:</strong> {new Date(event.start_date).toLocaleString()}</p>
        <p className="text-lg font-semibold"><strong>Status:</strong> {event.status}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Competidores:</h3>
        <ul className="list-disc list-inside">
          {event.competitors.map((competitor, index) => (
            <li key={index} className="flex items-center mb-2">
              <img src={competitor.country_flag_url} alt={competitor.country_id} className="h-6 w-10 mr-3" />
              <span className="font-medium">{competitor.competitor_name}</span> - {competitor.result_mark} ({competitor.result_winnerLoserTie})
            </li>
          ))}
        </ul>
      </div>
      <Link to="/" className="block mt-6 text-center text-blue-500 hover:underline">
        Voltar
      </Link>
    </div>
  );
};

export default EventDetail;
