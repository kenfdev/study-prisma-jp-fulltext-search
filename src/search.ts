import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function searchArticles(keyword: string) {
  // await prisma.$queryRawUnsafe(`SET enable_bitmapscan TO off;`);

  console.time('searchArticles');
  const articles = await prisma.$queryRawUnsafe(
    `SELECT title FROM "Article" WHERE body LIKE likequery($1)`,
    keyword
  );
  console.timeEnd('searchArticles');

  // await prisma.$queryRawUnsafe(`SET enable_bitmapscan TO on;`);
}

searchArticles('テスト');
