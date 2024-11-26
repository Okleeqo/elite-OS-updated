import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ClientStat {
  id: string;
  name: string;
  totalSpend: number;
  status: 'active' | 'inactive';
}

const initialStats: ClientStat[] = [
  { id: '1', name: 'Acme Corp', totalSpend: 50000, status: 'active' },
  { id: '2', name: 'TechStart Inc', totalSpend: 35000, status: 'active' },
  { id: '3', name: 'Global Solutions', totalSpend: 25000, status: 'inactive' },
  { id: '4', name: 'Innovate Ltd', totalSpend: 45000, status: 'active' }
];

type SortField = 'name' | 'totalSpend' | 'status';
type SortDirection = 'asc' | 'desc';

const ClientStats: React.FC = () => {
  const [stats] = useState(initialStats);
  const [sortField, setSortField] = useState<SortField>('totalSpend');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedStats = [...stats].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (sortField === 'totalSpend') {
      return (a.totalSpend - b.totalSpend) * modifier;
    }
    
    return a[sortField].localeCompare(b[sortField]) * modifier;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Client Stats</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th
                className="pb-3 text-left cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Client Name</span>
                  <SortIcon field="name" />
                </div>
              </th>
              <th
                className="pb-3 text-right cursor-pointer"
                onClick={() => handleSort('totalSpend')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Total Spend</span>
                  <SortIcon field="totalSpend" />
                </div>
              </th>
              <th
                className="pb-3 text-right cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Status</span>
                  <SortIcon field="status" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStats.map((stat) => (
              <tr key={stat.id} className="border-b border-gray-100 last:border-0">
                <td className="py-3">{stat.name}</td>
                <td className="py-3 text-right">
                  ${stat.totalSpend.toLocaleString()}
                </td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      stat.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {stat.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientStats;