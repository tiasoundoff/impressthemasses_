const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateImages() {
  const updates = [
    {
      title: 'Instagram Story Pack Pro',
      image: 'https://cdn.abacus.ai/images/bdb2fa26-5827-4d05-ab3e-fa6697801e16.png'
    },
    {
      title: 'TikTok Creator Bundle', 
      image: 'https://cdn.abacus.ai/images/2f2b7108-b30c-4c07-aa25-fe70625d497d.png'
    },
    {
      title: 'Pitch Deck Mastery',
      image: 'https://cdn.abacus.ai/images/38026f91-01b6-427d-a5b4-6e13a416a7df.png'
    }
  ];

  for (const update of updates) {
    await prisma.product.updateMany({
      where: { title: update.title },
      data: { images: [update.image] }
    });
    console.log(`Updated ${update.title}`);
  }

  await prisma.$disconnect();
}

updateImages().catch(console.error);
