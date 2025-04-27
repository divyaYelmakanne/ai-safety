import React, { useState } from 'react';
import { Incident } from './types/Incident';
import IncidentForm from './components/IncidentForm';
import IncidentList from './components/IncidentList';
import './App.css';

const initialData: Incident[] = [
  { id: 1, title: "Biased Recommendation Algorithm", description: "Algorithm consistently favored certain demographics...", severity: "Medium", reported_at: "2025-03-15T10:00:00Z" },
  { id: 2, title: "LLM Hallucination in Critical Info", description: "LLM provided incorrect safety procedure information...", severity: "High", reported_at: "2025-04-01T14:30:00Z" },
  { id: 3, title: "Minor Data Leak via Chatbot", description: "Chatbot inadvertently exposed non-sensitive user metadata...", severity: "Low", reported_at: "2025-03-20T09:15:00Z" }
];

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialData);

  const handleAddIncident = (newIncident: Incident) => {
    setIncidents(prev => [newIncident, ...prev]);
  };

  return (
    <div className="app">
      <h1>AI Safety Incident Dashboard</h1>
      <IncidentForm onAddIncident={handleAddIncident} />
      <IncidentList incidents={incidents} />
    </div>
  );
};

export default App;
