export const TradeDetails = ({ tradeData }) => {
  return (
    <section>
      <div className="trade-details mt-4 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Trade Details:</h2>
        <pre className="whitespace-pre-wrap text-gray-800 text-sm">{JSON.stringify(tradeData, null, 2)}</pre>
      </div>
    </section>
  )
};