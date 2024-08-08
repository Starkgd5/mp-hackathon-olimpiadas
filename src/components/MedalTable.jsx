import PropTypes from 'prop-types';

const MedalTable = ({ medals }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded my-6">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-200">País</th>
          <th className="py-2 px-4 bg-yellow-200">Bandeira</th>
          <th className="py-2 px-4 bg-yellow-400">Ouro</th>
          <th className="py-2 px-4 bg-gray-300">Prata</th>
          <th className="py-2 px-4 bg-yellow-600">Bronze</th>
          <th className="py-2 px-4 bg-gray-100">Total</th>
          <th className="py-2 px-4 bg-gray-200">Ranking</th>
          <th className="py-2 px-4 bg-gray-200">Ranking Total</th>
        </tr>
      </thead>
      <tbody>
        {medals.map((medal, index) => (
          <tr key={index} className="border-b hover:bg-gray-100 transition-colors duration-200">
            <td className="py-2 px-4">{medal.name}</td>
            <td className="py-2 px-4">
              <img
                src={medal.flag_url}
                alt={`Bandeira de ${medal.name}`}
                className="h-6 w-8 inline-block"
              />
            </td>
            <td className="py-2 px-4 text-center text-yellow-600 font-bold">{medal.gold_medals}</td>
            <td className="py-2 px-4 text-center text-gray-500">{medal.silver_medals}</td>
            <td className="py-2 px-4 text-center text-yellow-800">{medal.bronze_medals}</td>
            <td className="py-2 px-4 text-center font-semibold">{medal.total_medals}</td>
            <td className="py-2 px-4 text-center">{medal.rank}</td>
            <td className="py-2 px-4 text-center">{medal.rank_total_medals}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

MedalTable.propTypes = {
  medals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      flag_url: PropTypes.string.isRequired,
      gold_medals: PropTypes.number.isRequired,
      silver_medals: PropTypes.number.isRequired,
      bronze_medals: PropTypes.number.isRequired,
      total_medals: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
      rank_total_medals: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MedalTable;
