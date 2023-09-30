import Header from '@/components/Header';
import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const HomePageLoading = () => {
  return (
    <Container className="space-y-4 py-4 md:space-y-8 md:py-8">
      <Header />
      <div className="space-y-2 md:space-y-4">
        <Skeleton className="h-[40px] w-full rounded-md" />
        <Skeleton className="h-[80px] w-full rounded-md" />
        <Skeleton className="h-[80px] w-full rounded-md" />
        <Skeleton className="h-[80px] w-full rounded-md" />
        <Skeleton className="h-[80px] w-full rounded-md" />
        <Skeleton className="h-[80px] w-full rounded-md" />
        <Skeleton className="h-[80px] w-full rounded-md" />
      </div>
    </Container>
  );
};

export default HomePageLoading;
