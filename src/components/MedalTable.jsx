// src/components/MedalTable.jsx

const MedalTable = ({ medals }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded my-6">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-200">País</th>
          <th className="py-2 px-4 bg-yellow-200">Bandeira</th>
          <th className="py-2 px-4 bg-yellow-200">Ouro</th>
          <th className="py-2 px-4 bg-gray-400">Prata</th>
          <th className="py-2 px-4 bg-yellow-600">Bronze</th>
          <th className="py-2 px-4 bg-gray-100">Total</th>
          <th className="py-2 px-4 bg-gray-200">Ranking</th>
          <th className="py-2 px-4 bg-gray-200">Ranking Total</th>
        </tr>
      </thead>
      <tbody>
        {medals.map((medal, index) => (
          <tr key={index} className="border-b">
            <td className="py-2 px-4">{medal.name}</td>
            <td className="py-2 px-4"><img src={medal.flag_url} alt={`Bandeira de ${medal.name}`} className="h-6 w-8" /></td>
            <td className="py-2 px-4 text-center">{medal.gold_medals}</td>
            <td className="py-2 px-4 text-center">{medal.silver_medals}</td>
            <td className="py-2 px-4 text-center">{medal.bronze_medals}</td>
            <td className="py-2 px-4 text-center">{medal.total_medals}</td>
            <td className="py-2 px-4 text-center">{medal.rank}</td>
            <td className="py-2 px-4 text-center">{medal.rank_total_medals}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedalTable;
