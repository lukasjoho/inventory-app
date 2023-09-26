'use server';

import { Prisma } from '@prisma/client';
import ActionResponse from './actionResponse';
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import { PAGE_SIZE } from './constants';

interface ProductCreateInputCategoryId extends Prisma.ProductCreateInput {
  categoryId?: any;
}

export async function createProduct(data: ProductCreateInputCategoryId) {
  const { categoryId, ...rest } = data;
  const connectCategory = categoryId ? { connect: { id: categoryId } } : {};
  try {
    const product = await prisma.product.create({
      data: {
        ...rest,
        category: connectCategory,
      },
    });
    revalidatePath('/');
    return ActionResponse.success('Product created successfully', product);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return ActionResponse.error('Product name already exists', error);
    }
    return ActionResponse.error(
      error.message || 'Product creation failed',
      error
    );
  }
}

export async function getProducts({
  search = '',
  skip = 0,
  take = PAGE_SIZE,
}: {
  search?: string;
  skip?: number;
  take?: number;
}) {
  const products = await prisma.product.findMany({
    skip,
    take,
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  return products;
}

export async function updateProduct({
  id,
  data,
}: {
  id: string;
  data: Prisma.ProductUpdateInput;
}) {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath('/');
    return ActionResponse.success('Product updated successfully', product);
  } catch (error: any) {
    return ActionResponse.error(
      error.message || 'Product update failed',
      error
    );
  }
}

export async function seedProducts() {
  const res = await fetch('/api/seed', {
    method: 'GET',
  });
  if (res.ok) {
    revalidatePath('/');
    return ActionResponse.success('Database seeded.');
  } else {
    return ActionResponse.error('Database seeding failed.');
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath('/');
    return ActionResponse.success('Product deleted.', product);
  } catch (error: any) {
    return ActionResponse.error(
      error.message || 'Product deletion failed.',
      error
    );
  }
}

export async function updateIsDeal({
  id,
  isDeal,
}: {
  id: string;
  isDeal: boolean;
}) {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        isDeal,
      },
    });
    revalidatePath('/');
    return ActionResponse.success('Product deal property updated', product);
  } catch (error) {
    return ActionResponse.error('Product deal property update failed');
  }
}

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}
