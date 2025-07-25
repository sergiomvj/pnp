import React, { useState } from 'react';
import ProjectSettings from '../components/ProjectSettings.jsx';

export default function SetupPage() {
  // Nome da IA (pode ser persistido futuramente)
  const [aiName, setAiName] = useState('PulseAI');

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Exemplo de função para salvar na base (ajuste para sua API/Supabase)
  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      // Exemplo: await supabase.from('settings').upsert({ key: 'aiName', value: aiName });
      await new Promise(r => setTimeout(r, 800)); // Simula requisição
      setSaveMsg('Nome salvo com sucesso!');
    } catch (e) {
      setSaveMsg('Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Configurações do Sistema</h1>
      <div className="mb-8">
        <label htmlFor="ai-name" className="block text-lg font-medium mb-2 dark:text-white">Nome da IA editorial</label>
        <input
          id="ai-name"
          type="text"
          value={aiName}
          onChange={e => setAiName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cambridge-blue focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          placeholder="Digite o nome da IA (ex: PulseAI)"
        />
        <small className="text-gray-500 dark:text-gray-300">Este nome será usado nas interações automáticas da revista.</small>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 px-6 py-2 rounded bg-cambridge-blue text-white font-bold hover:bg-paynes-gray transition disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
        {saveMsg && <div className="mt-2 text-green-600 dark:text-green-400">{saveMsg}</div>}
      </div>
      <ProjectSettings />
    </div>
  );
}
