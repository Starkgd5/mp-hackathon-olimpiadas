import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventList = ({ events, onFilterChange }) => {
  const [filters, setFilters] = useState({ country: '', discipline: '', gender: '', venue: '', date: '', competitor: '' });
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await axios.get('https://apis.codante.io/olympic-games/disciplines');
        setDisciplines(response.data.data);
      } catch (error) {
        console.error('Error fetching disciplines:', error);
      }
    };
    fetchDisciplines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          name="country"
          placeholder="País (ex: BRA)"
          onChange={handleInputChange}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <select
          name="discipline"
          onChange={handleInputChange}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecione uma disciplina</option>
          {disciplines.map(discipline => (
            <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="gender"
          placeholder="Gênero (M/W/X/O)"
          onChange={handleInputChange}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="venue"
          placeholder="Local (ex: OLY)"
          onChange={handleInputChange}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          name="date"
          onChange={handleInputChange}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="competitor"
          placeholder="Competidor"
          onChange={handleInputChange}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-md">
          Buscar
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded my-6">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">Disciplina</th>
            <th className="py-2 px-4 bg-gray-200">Evento</th>
            <th className="py-2 px-4 bg-gray-200">Data</th>
            <th className="py-2 px-4 bg-gray-200">Local</th>
            <th className="py-2 px-4 bg-gray-200">Competidores</th>
            <th className="py-2 px-4 bg-gray-200">Status</th>
            <th className="py-2 px-4 bg-gray-200">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition-colors duration-200">
              <td className="py-2 px-4 flex items-center">
                <img src={event.discipline_pictogram} alt={event.discipline_name} className="h-6 w-6 mr-2" />
                {event.discipline_name}
              </td>
              <td className="py-2 px-4">{event.event_name}</td>
              <td className="py-2 px-4">{new Date(event.start_date).toLocaleString()}</td>
              <td className="py-2 px-4">{event.venue_name}</td>
              <td className="py-2 px-4">
                {event.competitors.map((competitor, idx) => (
                  <div key={idx} className="flex items-center">
                    <img
                      src={competitor.country_flag_url}
                      alt={competitor.country_id}
                      className="h-4 w-6 mr-2"
                    />
                    {competitor.competitor_name}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4">{event.status}</td>
              <td className="py-2 px-4">
                <Link to={`/event/${event.id}`} className="text-blue-500 hover:text-blue-700">
                  Ver Detalhes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      discipline_name: PropTypes.string.isRequired,
      discipline_pictogram: PropTypes.string.isRequired,
      event_name: PropTypes.string,
      start_date: PropTypes.string.isRequired,
      venue_name: PropTypes.string.isRequired,
      competitors: PropTypes.arrayOf(
        PropTypes.shape({
          country_id: PropTypes.string.isRequired,
          country_flag_url: PropTypes.string.isRequired,
          competitor_name: PropTypes.string.isRequired,
        })
      ).isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default EventList;
