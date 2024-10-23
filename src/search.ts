import { PrismaClient } from '@prisma/client';
import { searchArticlesByBody } from '@prisma/client/sql';
const prisma = new PrismaClient();

async function searchArticles(keyword: string) {
  // await prisma.$queryRawUnsafe(`SET enable_bitmapscan TO off;`);

  console.time('searchArticles');
  // const articles = await prisma.$queryRawUnsafe<any[]>(
  //   `SELECT title FROM "Article" WHERE body LIKE likequery($1)`,
  //   keyword
  // );
  const articles = await prisma.$queryRawTyped(searchArticlesByBody(keyword));
  console.timeEnd('searchArticles');

  console.log(`count: ${articles.length}`);
  console.log(`first title: ${articles[0].title}`);
  // await prisma.$queryRawUnsafe(`SET enable_bitmapscan TO on;`);
}

searchArticles('日本');
