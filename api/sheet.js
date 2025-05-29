export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  // Kirim data dari frontend ke Apps Script
  const response = await fetch(
    'https://script.google.com/macros/s/AKfycbxu09evFMMAA0qQ-jYBT_iHiEg5rUIutiSpfRgmEZJjY56kkNpHf6QH_ptfDWbeaTpuQg/exec',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    }
  );
  const data = await response.json();

  // Set CORS header agar FE bisa menerima respons
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.status(200).json(data);
}
