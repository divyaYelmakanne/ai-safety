import React, { useState } from 'react';
import { Incident } from '../types/Incident';

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  const [filter, setFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest'>('Newest');
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const handleToggleDescription = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
    }
    return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
  });

  return (
    <div className="incident-list">
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {sortedIncidents.map(incident => (
        <div key={incident.id} className="incident-card">
          <h3>{incident.title}</h3>
          <p><strong>Severity:</strong> {incident.severity}</p>
          <p><strong>Reported At:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
          <button onClick={() => handleToggleDescription(incident.id)}>
            {expandedIds.includes(incident.id) ? 'Hide Details' : 'View Details'}
          </button>
          {expandedIds.includes(incident.id) && (
            <p className="description">{incident.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
