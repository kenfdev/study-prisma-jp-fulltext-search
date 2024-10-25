import { PrismaClient } from '@prisma/client';
import { fakerJA as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedData() {
  const data = [];
  const chunkSize = 10000;
  for (let i = 0; i < 2_000_000; i++) {
    data.push({ title: faker.lorem.sentence(), body: faker.lorem.paragraph() });
  }

  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }

  for (let index = 0; index < chunks.length; index++) {
    await prisma.article.createMany({ data: chunks[index] });
    console.log(`Processed chunk ${index + 1} of ${chunks.length}`);
  }

  console.log('Seed data created');
}

seedData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
