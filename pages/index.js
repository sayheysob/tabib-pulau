import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    itemsTaken: [{ name: '', quantity: '' }],
    remainingStock: [{ name: '', quantity: '' }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Laporan berhasil dikirim!');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Admin Trans Pantry</h1>
      <form onSubmit={handleSubmit}>
        <h2>Barang yang Diambil</h2>
        {formData.itemsTaken.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nama barang"
              value={item.name}
              onChange={(e) => {
                const newItems = [...formData.itemsTaken];
                newItems[index].name = e.target.value;
                setFormData({ ...formData, itemsTaken: newItems });
              }}
              required
            />
            <input
              type="number"
              placeholder="Jumlah"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...formData.itemsTaken];
                newItems[index].quantity = e.target.value;
                setFormData({ ...formData, itemsTaken: newItems });
              }}
              required
              style={{ marginLeft: '10px' }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({
            ...formData,
            itemsTaken: [...formData.itemsTaken, { name: '', quantity: '' }]
          })}
        >
          Tambah Barang
        </button>

        <h2 style={{ marginTop: '20px' }}>Sisa Stok</h2>
        {formData.remainingStock.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nama barang"
              value={item.name}
              onChange={(e) => {
                const newItems = [...formData.remainingStock];
                newItems[index].name = e.target.value;
                setFormData({ ...formData, remainingStock: newItems });
              }}
              required
            />
            <input
              type="number"
              placeholder="Jumlah"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...formData.remainingStock];
                newItems[index].quantity = e.target.value;
                setFormData({ ...formData, remainingStock: newItems });
              }}
              required
              style={{ marginLeft: '10px' }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({
            ...formData,
            remainingStock: [...formData.remainingStock, { name: '', quantity: '' }]
          })}
          style={{ marginBottom: '20px' }}
        >
          Tambah Stok
        </button>

        <button type="submit" style={{ display: 'block', padding: '10px 20px' }}>
          Kirim Laporan ke Discord
        </button>
      </form>
    </div>
  );
}
