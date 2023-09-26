'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useInView } from 'react-intersection-observer';

import React, { useEffect, useState } from 'react';
import CheckboxForm from './form/CheckboxForm';
import { Prisma } from '@prisma/client';
import { useModal } from './modal';
import ProductModal from './ProductModal';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { getProducts } from '@/lib/actions';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { useSearchParams } from 'next/navigation';
import EmptyState from './EmptyState';
import { PAGE_SIZE } from '@/lib/constants';

interface ProductsTableProps {
  products: Prisma.ProductGetPayload<{
    include: {
      category: true;
    };
  }>[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const { show } = useModal();
  const [renderedProducts, setRenderedProducts] = useState(products);
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(1);
  const fetchMoreProducts = async () => {
    const nextPage = page + 1;
    const moreProducts = await getProducts({
      search,
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
    });
    setRenderedProducts([...renderedProducts, ...moreProducts]);
    if (moreProducts.length < PAGE_SIZE) {
      setIsEnd(true);
      return;
    }
    setPage(nextPage);
  };

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: '0px 0px 100px 0px',
  });

  useEffect(() => {
    fetchMoreProducts();
  }, [inView]);
  return (
    <div className="whitespace-nowrap rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[256px] max-w-[256px]">Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="w-[256px] max-w-[256px]">
              Description
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[128px] text-right">Stock</TableHead>
            <TableHead className="w-[128px] text-right">Price</TableHead>
            <TableHead>Is Deal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderedProducts.map((product) => {
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
                <TableCell className="w-[256px] max-w-[256px] overflow-hidden text-ellipsis font-medium">
                  {name}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="relative grid aspect-square h-12 w-12 place-items-center overflow-hidden">
                    {imageUrl ? (
                      <Image src={imageUrl} alt="" fill objectFit="contain" />
                    ) : (
                      '-'
                    )}
                  </div>
                </TableCell>
                <TableCell className="w-[256px] max-w-[256px] overflow-hidden text-ellipsis">
                  {description ?? '-'}
                </TableCell>
                <TableCell>
                  {category ? (
                    <Badge variant="outline">{category?.name}</Badge>
                  ) : (
                    '-'
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
      {!isEnd && (
        <div ref={ref} className="flex w-full flex-col gap-4 p-4">
          <Skeleton className="h-[80px] w-full rounded-md" />
          <Skeleton className="h-[80px] w-full rounded-md" />
          <Skeleton className="h-[80px] w-full rounded-md" />
        </div>
      )}

      {renderedProducts.length === 0 && <EmptyState />}
    </div>
  );
};

export default ProductsTable;
