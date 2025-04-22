import { useState, useEffect } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    pemohon: '',
    penanggungJawab: '',
    pegagan: 0,
    perban: 0,
    painkiller: 0,
    betadine: 0,
    zatBesi: 0,
    sayurKol: 0
  });

  const [submission, setSubmission] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const timestamp = new Date();

  try {
    const submittedData = {
      ...form,
      timestamp,
      remainingPegagan: 5000 - form.pegagan,
      remainingPerban: 5000 - form.perban,
      remainingPainkiller: 5000 - form.painkiller,
      remainingBetadine: 5000 - form.betadine,
      remainingZatBesi: 5000 - form.zatBesi,
      remainingSayurKol: 5000 - form.sayurKol
    };

    // Kirim juga ke Google Spreadsheet
    await fetch('https://script.google.com/macros/s/AKfycbzuyslGExnl3IpcDctJzktsPeVs5m8ixCLNxaaZ2EnQm7BmxT_c9VgfjGj0RwlRncRK/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submittedData)
    });


    // Kirim ke webhook Discord
    await fetch('https://discord.com/api/webhooks/1363867371277648203/40njB0VoK7EslN6mvSFomiU9YDLV_X6OcZtECvlYtkN2eKs4mfdiQD5yJoG_Z76C1gGI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: '📦 Pengambilan Stok Baru',
            color: 0x00b0f4,
            description: `Tanggal: **${formatDate(timestamp)}**\nPukul: **${formatTime(timestamp)}**`,
            fields: [
              { name: '👤 Pemohon', value: form.pemohon, inline: true },
              { name: '🧑‍💼 Penanggung Jawab', value: form.penanggungJawab, inline: true },
              {
                name: '📋 Barang Diambil',
                value: `
• Pegagan: ${form.pegagan} unit
• Perban: ${form.perban} unit
• Painkiller: ${form.painkiller} unit
• Betadine: ${form.betadine} unit
• Zat Besi: ${form.zatBesi} unit
• Sayur Kol: ${form.sayurKol} unit
                `.trim()
              },
              {
                name: '📦 Sisa Stok',
                value: `
• Pegagan: ${submittedData.remainingPegagan} unit
• Perban: ${submittedData.remainingPerban} unit
• Painkiller: ${submittedData.remainingPainkiller} unit
• Betadine: ${submittedData.remainingBetadine} unit
• Zat Besi: ${submittedData.remainingZatBesi} unit
• Sayur Kol: ${submittedData.remainingSayurKol} unit
                `.trim()
              }
            ],
            footer: {
              text: `Medical Supplies • ${formatTime(timestamp)}`
            }
          }
        ]
      })
    });

    // Tampilkan di halaman juga
    setSubmission(submittedData);
  } catch (error) {
    console.error('Gagal kirim ke webhook:', error);
    alert('Error submitting data');
  }
};

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="app-container">
      <div className="discord-app">
        <div className="header">
          <h1>Withdraw Tabib APP</h1>
          <div className="time">{formatTime(currentTime)}</div>
        </div>
        
        <div className="content">
          {submission ? (
            <div className="submission-result">
              <h2>Detail Pengambilan Stok</h2>
              <p>Pengambilan stok telah dilakukan pada {formatDate(submission.timestamp)} pukul {formatTime(submission.timestamp)}</p>
              
              <div className="table-container">
                <table>
                  <tr>
                    <th>Pemohon</th>
                    <th>Penanggung Jawab</th>
                  </tr>
                  <tr>
                    <td>{submission.pemohon}</td>
                    <td>{submission.penanggungJawab}</td>
                  </tr>
                </table>
                
                <table>
                  <tr>
                    <th colSpan="2">Barang yang Diambil</th>
                  </tr>
                  <tr>
                    <td>• Pegagan: {submission.pegagan} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Perban: {submission.perban} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Painkiller: {submission.painkiller} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Betadine: {submission.betadine} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Zat Besi: {submission.zatBesi} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Sayur Kol: {submission.sayurKol} unit</td>
                    <td></td>
                  </tr>
                </table>
                
                <table>
                  <tr>
                    <th colSpan="2">Sisa Stok</th>
                  </tr>
                  <tr>
                    <td>• Pegagan: {submission.remainingPegagan} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Perban: {submission.remainingPerban} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Painkiller: {submission.remainingPainkiller} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Betadine: {submission.remainingBetadine} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Zat Besi: {submission.remainingZatBesi} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Sayur Kol: {submission.remainingSayurKol} unit</td>
                    <td></td>
                  </tr>
                </table>
              </div>
              
              <div className="footer">
                <p>Medical Supplies - Sistem Management Inventaris • Today at {formatTime(submission.timestamp)}</p>
              </div>
              
              <button 
                className="new-request-button"
                onClick={() => setSubmission(null)}
              >
                Buat Permintaan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="withdrawal-form">
              <h2>Form Pengambilan Stok</h2>
              
              <div className="form-group">
                <label htmlFor="pemohon">Pemohon</label>
                <input 
                  type="text" 
                  id="pemohon"
                  placeholder="Nama Pemohon"
                  value={form.pemohon}
                  onChange={e => setForm({...form, pemohon: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="penanggungJawab">Penanggung Jawab</label>
                <input 
                  type="text" 
                  id="penanggungJawab"
                  placeholder="Nama Penanggung Jawab"
                  value={form.penanggungJawab}
                  onChange={e => setForm({...form, penanggungJawab: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="pegagan">Pegagan (unit)</label>
                <input 
                  type="number" 
                  id="pegagan"
                  min="0"
                  max="5000"
                  value={form.pegagan}
                  onChange={e => setForm({...form, pegagan: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="perban">Perban (unit)</label>
                <input 
                  type="number" 
                  id="perban"
                  min="0"
                  max="5000"
                  value={form.perban}
                  onChange={e => setForm({...form, perban: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="painkiller">Painkiller (unit)</label>
                <input 
                  type="number" 
                  id="painkiller"
                  min="0"
                  max="5000"
                  value={form.painkiller}
                  onChange={e => setForm({...form, painkiller: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="betadine">Betadine (unit)</label>
                <input 
                  type="number" 
                  id="betadine"
                  min="0"
                  max="5000"
                  value={form.betadine}
                  onChange={e => setForm({...form, betadine: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="zatBesi">Zat Besi (unit)</label>
                <input 
                  type="number" 
                  id="zatBesi"
                  min="0"
                  max="5000"
                  value={form.zatBesi}
                  onChange={e => setForm({...form, zatBesi: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sayurKol">Sayur Kol (unit)</label>
                <input 
                  type="number" 
                  id="sayurKol"
                  min="0"
                  max="5000"
                  value={form.sayurKol}
                  onChange={e => setForm({...form, sayurKol: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">Kirim Pengambilan Stok</button>
            </form>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #36393f;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }
        
        .discord-app {
          width: 100%;
          max-width: 500px;
          background-color: #2f3136;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .header {
          padding: 16px;
          border-bottom: 1px solid #202225;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header h1 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: white;
        }
        
        .time {
          font-size: 12px;
          color: #a3a6aa;
        }
        
        .content {
          padding: 16px;
        }
        
        h2 {
          font-size: 16px;
          margin-top: 0;
          margin-bottom: 8px;
          color: white;
        }
        
        .content p {
          font-size: 14px;
          margin-top: 0;
          margin-bottom: 16px;
          color: #b9bbbe;
        }
        
        .table-container {
          margin-bottom: 16px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 16px;
        }
        
        th {
          text-align: left;
          padding: 8px;
          background-color: #202225;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }
        
        td {
          padding: 8px;
          font-size: 14px;
          border-bottom: 1px solid #202225;
        }
        
        .footer {
          font-size: 12px;
          color: #72767d;
          margin-top: 16px;
          padding-top: 8px;
          border-top: 1px solid #202225;
        }
        
        .withdrawal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        label {
          font-size: 14px;
          color: #b9bbbe;
        }
        
        input {
          padding: 10px;
          background-color: #202225;
          border: 1px solid #040405;
          border-radius: 3px;
          color: white;
          font-size: 14px;
        }
        
        input:focus {
          outline: none;
          border-color: #7289da;
        }
        
        .submit-button, .new-request-button {
          padding: 10px 16px;
          background-color: #7289da;
          color: white;
          border: none;
          border-radius: 3px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .submit-button:hover, .new-request-button:hover {
          background-color: #677bc4;
        }
        
        .new-request-button {
          width: 100%;
          margin-top: 16px;
          background-color: #4f545c;
        }
        
        .new-request-button:hover {
          background-color: #5d6269;
        }
      `}</style>
      
      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
      `}</style>
    </div>
  );
}
