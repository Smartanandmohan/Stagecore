import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, Edit2, Trash2, Eye } from 'lucide-react';

export const DataTable = ({
  columns = [],
  data = [],
  searchKey = '', // Key to search against, or search all string keys if empty
  filterKey = 'status', // Key to filter status against
  filterOptions = [], // e.g. [{ label: 'All Statuses', value: 'all' }, { label: 'Active', value: 'active' }]
  actions = [], // e.g. [{ label: 'Edit', icon: Edit2, onClick: (row) => {} }]
  searchPlaceholder = 'Search...',
  pageSize = 10
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when search or filter changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // 1. Filter Data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Status Filter
      if (selectedFilter !== 'all') {
        const rowVal = String(row[filterKey] || '').toLowerCase();
        if (rowVal !== selectedFilter.toLowerCase()) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        if (searchKey) {
          return String(row[searchKey] || '').toLowerCase().includes(query);
        } else {
          // Search across all columns
          return columns.some((col) => {
            const val = row[col.key];
            return String(val || '').toLowerCase().includes(query);
          });
        }
      }

      return true;
    });
  }, [data, searchQuery, selectedFilter, filterKey, searchKey, columns]);

  // 2. Sort Data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        const strA = String(aVal).toLowerCase();
        const strB = String(bVal).toLowerCase();

        if (strA < strB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (strA > strB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredData, sortConfig]);

  // 3. Paginate Data
  const totalEntries = sortedData.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  
  // Keep page within bounds
  const activePage = Math.min(currentPage, totalPages);
  
  const paginatedData = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, activePage, pageSize]);

  const startEntry = totalEntries === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endEntry = Math.min(activePage * pageSize, totalEntries);

  return (
    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
      {/* Top Filter and Search Bar */}
      <div className="p-4 bg-white/[0.01] border-b border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-[#050816] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gaming-purple transition-colors duration-200"
          />
        </div>

        {/* Filter Dropdown */}
        {filterOptions.length > 0 && (
          <div className="relative w-full sm:w-auto flex-shrink-0">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="appearance-none w-full sm:w-44 bg-[#050816] border border-white/10 rounded-xl px-4 py-2 pr-10 text-xs text-gray-300 focus:outline-none focus:border-gaming-purple cursor-pointer transition-colors duration-200"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0d1127]">
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <ChevronDown size={14} />
            </span>
          </div>
        )}
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider select-none ${
                    col.sortable ? 'cursor-pointer hover:text-white transition-colors' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span className="text-gray-600">
                        {sortConfig.key === col.key ? (
                          sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        ) : (
                          <ChevronsUpDown size={12} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rIdx) => (
                <tr
                  key={row.id || rIdx}
                  className="hover:bg-white/[0.02] transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3.5 text-xs text-gray-300 font-medium">
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </td>
                  ))}

                  {/* Actions Column */}
                  {actions.length > 0 && (
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {actions.map((act, actIdx) => {
                          const Icon = act.icon;
                          const isDanger = act.variant === 'danger';
                          const isWarning = act.variant === 'warning';
                          const isSuccess = act.variant === 'success';

                          let colorClasses = 'text-gray-400 hover:text-white hover:bg-white/5 border-white/10';
                          if (isDanger) colorClasses = 'text-rose-400 hover:text-white hover:bg-rose-500/20 border-rose-500/20';
                          if (isWarning) colorClasses = 'text-amber-400 hover:text-white hover:bg-amber-500/20 border-amber-500/20';
                          if (isSuccess) colorClasses = 'text-emerald-400 hover:text-white hover:bg-emerald-500/20 border-emerald-500/20';

                          return (
                            <button
                              key={actIdx}
                              onClick={() => act.onClick(row)}
                              title={act.label}
                              className={`p-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${colorClasses}`}
                            >
                              {Icon ? <Icon size={13} /> : <span className="text-[10px] font-bold px-1.5">{act.label}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-6 py-12 text-center text-xs text-gray-500 font-bold uppercase tracking-wider"
                >
                  No matching entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
        <div className="text-gray-500 font-semibold">
          Showing <span className="text-gray-300 font-bold">{startEntry}</span> to{' '}
          <span className="text-gray-300 font-bold">{endEntry}</span> of{' '}
          <span className="text-gray-300 font-bold">{totalEntries}</span> entries
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={activePage === 1}
            className="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === activePage;
            return (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-lg text-[10px] font-black uppercase transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-gaming-purple text-white shadow-lg shadow-gaming-purple/20'
                    : 'border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={activePage === totalPages}
            className="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
