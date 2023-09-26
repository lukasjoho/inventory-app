import Container from '@/components/layout/Container';
import CreateProductButton from '@/components/CreateProductButton';
import ProductsTable from '@/components/ProductsTable';
import SearchInput from '@/components/SearchInput';
import { prisma } from '@/lib/prisma';
import { getProducts } from '@/lib/actions';

export default async function Home({ searchParams }: { searchParams: any }) {
  const { search } = searchParams;
  const products = await getProducts({ search });
  return (
    <Container className="space-y-4 py-4 md:space-y-8 md:py-8">
      <h1 className="text-2xl font-semibold">Inventory App</h1>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-8">
        <SearchInput />
        <CreateProductButton />
      </div>
      <ProductsTable products={products} key={Math.random()} />
    </Container>
  );
}
