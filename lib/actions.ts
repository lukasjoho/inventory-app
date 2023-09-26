"use server";

import { Prisma } from "@prisma/client";
import ActionResponse from "./actionResponse";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/");
    return ActionResponse.success("Product created successfully", product);
  } catch (error: any) {
    if (error.code === "P2002") {
      return ActionResponse.error("Product name already exists", error);
    }
    return ActionResponse.error(
      error.message || "Product creation failed",
      error
    );
  }
}

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function createCategory(name: string) {
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    return ActionResponse.success("Category created.", category);
  } catch (error: any) {
    return ActionResponse.error(
      error.message || "Category creation failed",
      error
    );
  }
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
    revalidatePath("/");
    return ActionResponse.success("Product updated successfully", product);
  } catch (error: any) {
    return ActionResponse.error(
      error.message || "Product update failed",
      error
    );
  }
}

export async function searchProductsByName(name: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    revalidatePath("/");
    return ActionResponse.success("Products found", products);
  } catch (error: any) {
    return ActionResponse.error(error.message || "Products search failed");
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return ActionResponse.success("Product deleted successfully", product);
  } catch (error: any) {
    return ActionResponse.error(
      error.message || "Product deletion failed",
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
    revalidatePath("/");
    return ActionResponse.success("Product deal property updated", product);
  } catch (error) {
    return ActionResponse.error("Product deal property update failed");
  }
}
