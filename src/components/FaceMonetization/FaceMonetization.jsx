// FaceMonetization.jsx
// Componente React para planos, assinatura e clube de vantagens
import React from 'react';

export default function FaceMonetization({ plans, onSubscribe, userBenefits, onRedeem }) {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Planos Premium</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {plans.map(plan => (
          <div key={plan.id} className={`border rounded p-4 ${plan.active ? 'border-blue-500' : 'border-gray-300 opacity-60'}`}>
            <div className="font-semibold text-lg text-blue-700">{plan.name}</div>
            <div className="text-gray-600 mb-2">{plan.description}</div>
            <div className="text-2xl font-bold mb-2">R$ {(plan.price_cents/100).toFixed(2)} / {plan.period}</div>
            <button disabled={!plan.active} onClick={() => onSubscribe(plan.id)} className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-300">Assinar</button>
          </div>
        ))}
      </div>
      <h3 className="text-lg font-bold mb-2">Clube de Vantagens</h3>
      <div className="grid grid-cols-2 gap-3">
        {userBenefits.map(benefit => (
          <div key={benefit.id} className="border rounded p-2 flex flex-col items-center">
            <img src={benefit.image_url} alt={benefit.name} className="w-12 h-12 object-contain mb-1" />
            <div className="font-semibold text-sm text-green-700 text-center">{benefit.name}</div>
            <button onClick={() => onRedeem(benefit.id)} className="mt-1 text-xs bg-green-600 text-white px-2 py-1 rounded">Resgatar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
