// FaceSocialNetwork.jsx
// Componente React compacto e elegante para recursos sociais
import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaRegCommentDots, FaRegHeart, FaShareAlt, FaTrophy } from 'react-icons/fa';

export default function FaceSocialNetwork({ articleId, onShare, onLike, onComment, likes, shares }) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-2 px-3 bg-white/80 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
      {/* Mini barra de opções sociais */}
      <button title="Curtir" onClick={onLike} className="text-pink-600 hover:text-pink-800"><FaRegHeart /></button>
      <button title="Comentar" onClick={onComment} className="text-blue-600 hover:text-blue-800"><FaRegCommentDots /></button>
      <button title="Compartilhar" onClick={() => onShare('facebook')} className="text-blue-700 hover:text-blue-900"><FaFacebook /></button>
      <button title="Compartilhar" onClick={() => onShare('twitter')} className="text-sky-500 hover:text-sky-700"><FaTwitter /></button>
      <button title="Compartilhar" onClick={() => onShare('whatsapp')} className="text-green-500 hover:text-green-700"><FaWhatsapp /></button>
      <button title="Compartilhar" onClick={() => onShare('linkedin')} className="text-blue-500 hover:text-blue-700"><FaLinkedin /></button>
      <button title="Mais opções" className="text-gray-500 hover:text-gray-700"><FaShareAlt /></button>
      <span className="ml-2 text-xs text-gray-500">{likes} curtidas • {shares} compartilhamentos</span>
      <span className="ml-auto text-yellow-500" title="Ranking"><FaTrophy /></span>
    </div>
  );
}
