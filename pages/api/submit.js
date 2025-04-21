import { sendWebhook } from '../../utils/webhook';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { pemohon, penanggungJawab, makanan, minuman } = req.body;

  // Logika stok bisa dikembangkan di sini
  await sendWebhook({ pemohon, penanggungJawab, makanan, minuman });

  res.status(200).json({ message: 'Webhook sent!' });
}
