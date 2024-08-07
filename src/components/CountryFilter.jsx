// src/components/CountryFilter.jsx

const CountryFilter = ({ onFilterChange }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Filtrar por país:</label>
      <input
        type="text"
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        placeholder="Digite o nome do país"
      />
    </div>
  );
};

export default CountryFilter;
