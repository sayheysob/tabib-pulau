import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    pemohon: '',
    penanggungJawab: '',
    makanan: 0,
    minuman: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Data terkirim!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Pemohon" onChange={e => setForm({...form, pemohon: e.target.value})} />
      <input type="text" placeholder="Penanggung Jawab" onChange={e => setForm({...form, penanggungJawab: e.target.value})} />
      <input type="number" placeholder="Sate Klenger (unit)" onChange={e => setForm({...form, makanan: Number(e.target.value)})} />
      <input type="number" placeholder="Manchep Lotte (unit)" onChange={e => setForm({...form, minuman: Number(e.target.value)})} />
      <button type="submit">Kirim</button>
    </form>
  );
}