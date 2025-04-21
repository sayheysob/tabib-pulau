import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    pemohon: '',
    penanggungJawab: '',
    sateKlenger: 0,
    manchepLotte: 0,
  });

  const [submission, setSubmission] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  setInterval(() => {
    setCurrentTime(new Date());
  }, 60000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setSubmission({
        ...form,
        timestamp: new Date(),
        remainingSateKlenger: 150 - form.sateKlenger,
        remainingManchepLotte: 150 - form.manchepLotte
      });
    } catch (error) {
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
          <h1>Trans Pantry Stock APP</h1>
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
                    <td>• Sate Klenger: {submission.sateKlenger} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>• Manchep Lotte: {submission.manchepLotte} unit</td>
                    <td></td>
                  </tr>
                </table>
                
                <table>
                  <tr>
                    <th colSpan="2">Sisa Stok Makanan</th>
                  </tr>
                  <tr>
                    <td>• Sate Klenger: {submission.remainingSateKlenger} unit</td>
                    <td></td>
                  </tr>
                </table>
                
                <table>
                  <tr>
                    <th colSpan="2">Sisa Stok Minuman</th>
                  </tr>
                  <tr>
                    <td>• Manchep Lotte: {submission.remainingManchepLotte} unit</td>
                    <td></td>
                  </tr>
                </table>
                
                <table>
                  <tr>
                    <th colSpan="2">Total Stok Tersisa</th>
                  </tr>
                  <tr>
                    <td>Total Makanan: {submission.remainingSateKlenger} unit</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Total Minuman: {submission.remainingManchepLotte} unit</td>
                    <td></td>
                  </tr>
                </table>
              </div>
              
              <div className="footer">
                <p>Trans Pantry - Sistem Management Inventaris • Today at {formatTime(submission.timestamp)}</p>
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
                <label htmlFor="sateKlenger">Sate Klenger (unit)</label>
                <input 
                  type="number" 
                  id="sateKlenger"
                  min="0"
                  max="150"
                  value={form.sateKlenger}
                  onChange={e => setForm({...form, sateKlenger: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="manchepLotte">Manchep Lotte (unit)</label>
                <input 
                  type="number" 
                  id="manchepLotte"
                  min="0"
                  max="150"
                  value={form.manchepLotte}
                  onChange={e => setForm({...form, manchepLotte: parseInt(e.target.value) || 0})}
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
