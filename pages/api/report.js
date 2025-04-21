export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { itemsTaken, remainingStock } = req.body;
    
    // Format pesan Discord
    const discordMessage = {
      content: `# WHITELIST KOTAKITA\n\n## brandkas-trans\n\n### Trans Pantry Stock (APP)\n**${new Date().toLocaleTimeString()}**\n\n` +
        `**Detail Pengambilan Stok**\nPengambilan stok telah dilakukan pada ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}\n\n` +
        `| Pemonitor | Penanggung Jawab |\n|---|---|\n| Bambang Megatron | Yukio Matthew |\n\n` +
        `**Barang yang Diambil**\n${itemsTaken.map(item => `- ${item.name}: ${item.quantity} unit`).join('\n')}\n\n` +
        `**Sisa Stok**\n${remainingStock.map(item => `- ${item.name}: ${item.quantity} unit`).join('\n')}`,
      username: 'Trans Pantry - Sistem Manajemen Inventaris'
    };

    // Kirim ke Discord
    const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    });

    if (!discordResponse.ok) throw new Error('Gagal mengirim ke Discord');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
