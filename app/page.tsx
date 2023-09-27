import Container from '@/components/layout/Container';
import CreateProductButton from '@/components/CreateProductButton';
import ProductsTable from '@/components/ProductsTable';
import SearchInput from '@/components/SearchInput';
import { prisma } from '@/lib/prisma';
import { getProducts } from '@/lib/actions';
import Header from '@/components/Header';

export default async function Home({ searchParams }: { searchParams: any }) {
  const { search } = searchParams;
  const products = await getProducts({ search });
  return (
    <Container className="space-y-4 py-4 md:space-y-8 md:py-8">
      <Header />
      <ProductsTable products={products} key={Math.random()} />
    </Container>
  );
}
