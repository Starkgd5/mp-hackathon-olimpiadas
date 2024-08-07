// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedalTable from './components/MedalTable';
import CountryFilter from './components/CountryFilter';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';

const App = () => {
  const [activeTab, setActiveTab] = useState('medals');
  const [medals, setMedals] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState('');
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ country: '', discipline: '', gender: '', venue: '', date: '', competitor: '' });

  useEffect(() => {
    axios.get('https://apis.codante.io/olympic-games/countries')
      .then(response => setMedals(response.data.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://apis.codante.io/olympic-games/events', { params: filters });
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [filters]);

  const handleFilterChange = (country) => {
    setFilteredCountry(country);
  };

  const handleEventFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const filteredMedals = medals.filter(medal =>
    filteredCountry === '' || medal.name.toLowerCase().includes(filteredCountry.toLowerCase())
  );

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Jogos Olímpicos</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab('medals')}
            className={`px-4 py-2 mr-2 ${activeTab === 'medals' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Quadro de Medalhas
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 ${activeTab === 'events' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Lista de Eventos
          </button>
        </div>
        <Routes>
          <Route path="/" element={
            <>
              {activeTab === 'medals' && (
                <>
                  <CountryFilter onFilterChange={handleFilterChange} />
                  <MedalTable medals={filteredMedals} />
                </>
              )}
              {activeTab === 'events' && (
                <EventList events={events} onFilterChange={handleEventFilterChange} />
              )}
            </>
          } />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
