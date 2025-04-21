export async function sendWebhook({ pemohon, penanggungJawab, makanan, minuman }) {
  const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';

  const body = {
    username: 'Trans Pantry Stock',
    embeds: [
      {
        title: 'Detail Pengambilan Stok',
        description: `**Pengambilan stok telah dilakukan**\n\n**Pemohon**\n${pemohon}\n\n**Penanggung Jawab**\n${penanggungJawab}\n\n**Barang yang Diambil**\n• Sate Klenger: ${makanan} unit\n• Manchep Lotte: ${minuman} unit\n\nTotal Makanan: (update sesuai stok)\nTotal Minuman: (update sesuai stok)`,
        footer: { text: 'Trans Pantry - Sistem Manajemen Inventaris' },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}