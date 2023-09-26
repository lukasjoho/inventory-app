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
    <Container className="space-y-8 py-8">
      <h1 className="text-2xl font-semibold">Inventory App</h1>
      <div className="flex justify-between gap-8">
        <SearchInput />
        <CreateProductButton />
      </div>
      <ProductsTable products={products} key={Math.random()} />
    </Container>
  );
}
