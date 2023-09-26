import { prisma } from '@/lib/prisma';
import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';

export async function GET() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  const categories = ['Electronics', 'Fashion', 'Living', 'Toys'];

  //random num either 0 or 1
  const isDealOptions = [true, false];

  const dbProducts = await prisma.$transaction(
    Array.from({ length: 100 }, () => {
      const randomDealNum = Math.floor(Math.random() * 2);
      const randomCatNum = Math.floor(Math.random() * 4);

      const randomPrice = Math.random() * 2000;
      const randomStock = Math.round(Math.random() * 50) * 20;
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: randomPrice,
          stock: randomStock,
          description: faker.commerce.productDescription(),
          imageUrl: faker.image.urlLoremFlickr({
            category: 'product',
            width: 400,
            height: 400,
          }),
          category: {
            connectOrCreate: {
              where: {
                name: categories[randomCatNum],
              },
              create: {
                name: categories[randomCatNum],
              },
            },
          },
          isDeal: isDealOptions[randomDealNum],
        },
      });
    })
  );

  return NextResponse.json(dbProducts);
}
