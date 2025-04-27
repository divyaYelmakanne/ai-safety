import React, { useState } from 'react';
import { Incident } from '../types/Incident';

interface IncidentFormProps {
  onAddIncident: (incident: Incident) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onAddIncident }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    const newIncident: Incident = {
      id: Date.now(),
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };
    onAddIncident(newIncident);
    setTitle('');
    setDescription('');
    setSeverity('Low');
  };

  return (
    <form onSubmit={handleSubmit} className="incident-form">
      <h2>Report New Incident</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={severity} onChange={(e) => setSeverity(e.target.value as any)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IncidentForm;
