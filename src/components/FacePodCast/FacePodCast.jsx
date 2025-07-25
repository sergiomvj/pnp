// FacePodCast.jsx
// Componente React para player de podcast interativo
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function FacePodCast({ articleId, userId }) {
  const [podcast, setPodcast] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    async function fetchPodcast() {
      const res = await axios.get(`/api/facepodcast/${articleId}`);
      setPodcast(res.data);
      if (res.data && res.data.id) {
        const comm = await axios.get(`/api/facepodcast/${res.data.id}/comments`);
        setComments(comm.data.comments);
      }
    }
    fetchPodcast();
  }, [articleId]);

  const handleComment = async () => {
    if (!comment.trim() || !podcast) return;
    await axios.post(`/api/facepodcast/${podcast.id}/comment`, {
      userId,
      timestampSeconds: Math.floor(audioRef.current.currentTime),
      comment
    });
    setComments([...comments, { user_id: userId, timestamp_seconds: Math.floor(audioRef.current.currentTime), comment }]);
    setComment('');
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Podcast do Artigo</h2>
      {podcast ? (
        <>
          <audio ref={audioRef} controls src={podcast.audio_url} className="w-full mb-2" onTimeUpdate={() => setTimestamp(Math.floor(audioRef.current.currentTime))} />
          <div className="mb-2">
            <strong>Transcrição:</strong>
            <div className="text-sm bg-gray-100 p-2 rounded h-32 overflow-y-auto">{podcast.transcript}</div>
          </div>
          <div className="mb-2">
            <strong>Comentários:</strong>
            <ul className="text-sm max-h-32 overflow-y-auto">
              {comments.map((c, i) => (
                <li key={i} className="mb-1">
                  <span className="font-mono text-xs text-gray-500">[{c.timestamp_seconds}s]</span> {c.comment}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <input type="text" className="flex-1 border rounded px-2 py-1" value={comment} onChange={e => setComment(e.target.value)} placeholder="Comente este momento..." />
            <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleComment}>Comentar [{timestamp}s]</button>
          </div>
        </>
      ) : (
        <div>Carregando podcast...</div>
      )}
    </div>
  );
}
