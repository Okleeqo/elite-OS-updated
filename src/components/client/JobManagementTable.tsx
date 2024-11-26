import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  customer: string;
  website: string;
  staff: string;
  invoiceAmount: number;
  completedDate: string;
  dayCount: number;
}

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Triplex - Logo Design',
    customer: 'Bobs Printing Service',
    website: 'www.bobsprinting.com',
    staff: 'John Smith',
    invoiceAmount: 1500,
    completedDate: '2024-03-15',
    dayCount: 5
  },
  {
    id: '2',
    title: 'Website Redesign',
    customer: 'Tech Solutions Inc',
    website: 'www.techsolutions.com',
    staff: 'Sarah Johnson',
    invoiceAmount: 3500,
    completedDate: '2024-03-14',
    dayCount: 6
  }
];

type SortField = keyof Job;

const JobManagementTable: React.FC = () => {
  const [jobs] = useState<Job[]>(initialJobs);
  const [sortField, setSortField] = useState<SortField>('completedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    if (typeof a[sortField] === 'string') {
      return (a[sortField] as string).localeCompare(b[sortField] as string) * modifier;
    }
    return ((a[sortField] as number) - (b[sortField] as number)) * modifier;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Job Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {[
                  { key: 'title', label: 'Job Title' },
                  { key: 'customer', label: 'Customer' },
                  { key: 'website', label: 'Website' },
                  { key: 'staff', label: 'Staff' },
                  { key: 'invoiceAmount', label: 'Invoice Amount' },
                  { key: 'completedDate', label: 'Completed Date' },
                  { key: 'dayCount', label: 'Day Count' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="pb-3 text-left"
                    onClick={() => handleSort(key as SortField)}
                  >
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <span>{label}</span>
                      <SortIcon field={key as SortField} />
                    </div>
                  </th>
                ))}
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4">{job.title}</td>
                  <td className="py-4">{job.customer}</td>
                  <td className="py-4">{job.website}</td>
                  <td className="py-4">{job.staff}</td>
                  <td className="py-4">${job.invoiceAmount.toLocaleString()}</td>
                  <td className="py-4">{new Date(job.completedDate).toLocaleDateString()}</td>
                  <td className="py-4">{job.dayCount} days</td>
                  <td className="py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Generate Invoice
                    </button>
                    <button className="ml-4 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobManagementTable;