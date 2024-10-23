import { PrismaClient } from '@prisma/client';
import { fakerJA as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedData() {
  const data = [];
  for (let i = 0; i < 100000; i++) {
    data.push({ title: faker.lorem.sentence(), body: faker.lorem.paragraph() });
  }
  await prisma.article.createMany({
    data,
  });
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
