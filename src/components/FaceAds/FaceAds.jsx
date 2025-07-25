// FaceAds.jsx
// Componente React para gestão comercial de anúncios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FaceAds() {
  const [formats, setFormats] = useState([]);
  const [clients, setClients] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [billing, setBilling] = useState([]);

  useEffect(() => {
    axios.get('/api/faceads/formats').then(res => setFormats(res.data.formats));
    axios.get('/api/faceads/clients').then(res => setClients(res.data.clients));
    axios.get('/api/faceads/campaigns').then(res => setCampaigns(res.data.campaigns));
    axios.get('/api/faceads/billing').then(res => setBilling(res.data.billing));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gestão Comercial de Anúncios</h2>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Formatos de Ads</h3>
        <ul>{formats.map(f => <li key={f.id}>{f.name} - {f.location} - R$ {(f.cost_cents/100).toFixed(2)}</li>)}</ul>
      </section>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Clientes</h3>
        <ul>{clients.map(c => <li key={c.id}>{c.name} ({c.contact})</li>)}</ul>
      </section>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Campanhas</h3>
        <ul>{campaigns.map(c => <li key={c.id}>{c.name} - Cliente #{c.client_id} - Formato #{c.format_id} - {c.status}</li>)}</ul>
      </section>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Faturamento</h3>
        <ul>{billing.map(b => <li key={b.id}>Campanha #{b.campaign_id} - R$ {(b.amount_cents/100).toFixed(2)} - {b.paid_at ? 'Pago' : 'Em aberto'}</li>)}</ul>
      </section>
    </div>
  );
}
