import Container from "@/components/Container";
import CreateProductButton from "@/components/CreateProductButton";
import ProductsTable from "@/components/ProductsTable";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";

export default async function Home({ searchParams }: { searchParams: any }) {
  const { search } = searchParams;
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return (
    <Container className="space-y-8 py-8">
      <h1 className="font-semibold text-2xl">Inventory App</h1>
      <div className="flex justify-between gap-8">
        <SearchInput />
        <CreateProductButton />
      </div>
      <ProductsTable products={products} />
    </Container>
  );
}
