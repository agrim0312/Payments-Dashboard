
interface Transfer {
    id: number;
    timestamp: string;
    sentUser: { id: number; name: string };
    recievedUser: { id: number; name: string };
};

export function P2PTransferTable({ Transactions }:{ Transactions : Transfer[] }){
    return (
        <div className="w-screen">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">From</th>
                <th scope="col" className="px-6 py-3">To</th>
                <th scope="col" className="px-6 py-3 text-right">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {Transactions.map((transfer) => (
                <tr key={transfer.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {new Date(transfer.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{transfer.sentUser.name}</td>
                  <td className="px-6 py-4">{transfer.recievedUser.name}</td>
                  <td className="px-6 py-4 text-right">#{transfer.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    )
}