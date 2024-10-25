import { PrismaClient } from '@prisma/client';
import { searchArticlesByBody } from '@prisma/client/sql';
const prisma = new PrismaClient({
  log: ['query']
});

export async function searchArticles(
  keyword1: string,
  keyword2: string,
  keyword3: string,
  keyword4: string,
  keyword5: string
) {
  // await prisma.$queryRawUnsafe(`SET enable_bitmapscan TO off;`);
  console.log('DATABASE_URL', process.env.DATABASE_URL);

  console.time('searchArticles');
  // const articles = await prisma.$queryRawUnsafe<any[]>(
  //   `SELECT title FROM "Article" WHERE body LIKE likequery($1)`,
  //   keyword
  // );
  // const articles = await prisma.$queryRawTyped(
  //   searchArticlesByBody(keyword1, keyword2, keyword3, keyword4, keyword5)
  // );

  const articles = await prisma.article.findMany({
    where: {
      AND: [
        { body: { contains: keyword1 } },
        { body: { contains: keyword2 } },
        { body: { contains: keyword3 } },
        { body: { contains: keyword4 } },
        { body: { contains: keyword5 } },
      ],
    },
  });
  console.timeEnd('searchArticles');

  console.log(`count: ${articles.length}`);
  console.log(`first title: ${articles[0].title}`);
  console.log(`first body: ${articles[0].body}`);
  // await prisma.$queryRawUnsafe(`SET enable_bitmapscan TO on;`);
  return articles;
}

// searchArticles('日本');
