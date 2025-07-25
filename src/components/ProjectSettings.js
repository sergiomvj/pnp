import React, { useState } from 'react';

export default function ProjectSettings({ initialWebhook = '' }) {
  const [evolutionWebhook, setEvolutionWebhook] = useState(initialWebhook);

  // Futuramente: salvar no backend
  const handleChange = (e) => setEvolutionWebhook(e.target.value);

  return (
    <div className="project-settings">
      <h2>Configurações do Projeto</h2>
      <div style={{ margin: '1em 0' }}>
        <label htmlFor="evolution-webhook">
          Webhook da Instância Evolution (WhatsApp):
        </label>
        <input
          id="evolution-webhook"
          type="text"
          value={evolutionWebhook}
          onChange={handleChange}
          placeholder="https://sua-instancia.evolutionapi.com/webhook"
          style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}
        />
        <small>URL para envio automático de clippings via WhatsApp.</small>
      </div>
      {/* Outros campos de configuração podem ser adicionados aqui futuramente */}
    </div>
  );
}
