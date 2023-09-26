"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

import React from "react";
import { Checkbox } from "./ui/checkbox";
import CheckboxForm from "./CheckboxForm";
import { Prisma } from "@prisma/client";
import { useModal } from "./modal";
import ProductModal from "./ProductModal";
import { Badge } from "./ui/badge";
import Image from "next/image";

interface ProductsTableProps {
  products: Prisma.ProductGetPayload<{
    include: {
      category: true;
    };
  }>[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const { show } = useModal();
  return (
    <div className="border rounded-lg whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[128px] text-right">Stock</TableHead>
            <TableHead className="w-[128px] text-right">Price</TableHead>
            <TableHead>Is Deal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const {
              id,
              name,
              description,
              category,
              price,
              stock,
              isDeal,
              imageUrl,
            } = product;
            return (
              <TableRow
                key={product.id}
                className="cursor-pointer"
                onClick={() => show(<ProductModal product={product} />)}
              >
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell className="font-medium">
                  <div className="w-12 h-12 aspect-square overflow-hidden relative grid place-items-center">
                    {imageUrl ? (
                      <Image src={imageUrl} alt="" fill objectFit="cover" />
                    ) : (
                      "-"
                    )}
                  </div>
                </TableCell>
                <TableCell>{description ?? "-"}</TableCell>
                <TableCell>
                  {category ? (
                    <Badge variant="outline">{category?.name}</Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right">{stock}</TableCell>
                <TableCell className="text-right">${price}</TableCell>
                <TableCell>
                  <CheckboxForm id={id} checked={isDeal} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {products.length === 0 && (
        <div className="w-full flex flex-col items-center gap-2 py-8">
          <h2 className="text-center text-sm">
            No products available for given search query.
          </h2>
          <img
            className="w-[300px]"
            src="https://media0.giphy.com/media/2vs70gBAfQXvOOYsBI/giphy.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
