<div align="center" >
    <h1 align="center">Inventory App</h1>
    <p>This is a tiny app built to demonstrate usage around API-interaction and UI design patterns in NextJS 13.</p>
    🌐 <a href="https://inventory-app-mauve.vercel.app">inventory-app-mauve.vercel.app</a>
    <br/>
    <br/>
</div>

![Alt text](https://res.cloudinary.com/dum2lqmke/image/upload/v1695768084/cover-inventory-app_qrjdql.jpg)

# Tools

Built with the following tech-stack:

- [NextJS 13](https://nextjs.org/docs): Frontend UI
- [Prisma](https://www.prisma.io): Database ORM
- [TailwindCSS](https://tailwindcss.com): CSS Styling
- [ShadCN](https://ui.shadcn.com): UI Components
- [AWS SDK](https://www.npmjs.com/package/aws-sdk): Image Upload to S3

# Motivation

NextJS 13, ShadCN and Prisma are having a dramatically positive impact on how modern web applications are built with speed. The idea behind this mini CRUD demo is to show the usage of the following patterns:

1. [Server Actions](#server-actions) -> As API endpoints
2. [Action Response Class](#action-response-class) -> For unified API response behaviour
3. [Global Modal](#global-modal) -> Unified modal behaviour
4. [Server-Side Search](#server-side-search) -> Persisting search state using search params
5. [Infinite Scroll](#infinite-scroll) -> Utilizing server actions and intersection observer API

# Implementation Patterns

<a id="server-actions"></a>

## Server Actions

1. Bunch related actions together to find common patterns and abstractions.
2. Revalidate path inside server action
3. Instantiate action response class to unify responses

<sub>@/lib/actions.ts</sub>

```
export async function createProduct(data: ...) {
    ...
}

export async function getProducts() {
  const products = await prisma.product.findMany({});
  return products;
}

export async function updateProduct({id, data}) {
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
```

<a id="action-response-class"></a>

## Action Response Class

1. Define an action response class

```
type ActionResponseType = {
  success: boolean;
  message: string;
  data?: any;
  status?: number;
};

class ActionResponse {
  success: boolean;
  message: string;
  data: any;

  private constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success(message: string, data?: any): ActionResponseType {
    return new ActionResponse(true, message, data);
  }
  static error(message: string, data?: any): ActionResponseType {
    return new ActionResponse(false, message, data);
  }
}

export default ActionResponse;
```

2. Handle responses with a simple conditional clientside

```
...
const handleChange = async (checked: boolean) => {
    const res = await updateIsDeal({ id, isDeal: !checked });
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
...
```

<a id="global-modal"></a>

## Global Modal

Use a context-based modal provider pattern to open modals from anywhere in the app.

1. Create modal context

```
export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const show = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };
  ...
  const hide = () => {

    setIsOpen(false);
    setModalContent(false);
  };
  ...
  return (
    <ModalContext.Provider
      value={{
        show,
        hide,
        isOpen,
      }}
    >
      {children}
      <AnimatePresence>
        {isOpen && <ModalPortal>{modalContent}</ModalPortal>}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
```

2. Show bottomsheet on mobile and centered modal on desktop

```
export function ModalPortal({ children }: ModalPortalProps) {
  ...
  return (
    <>
      <ModalBackground>
        {isMobile && <MobileModal ...>{children}</MobileModal>}
        {isDesktop && <DesktopModal>{children}</DesktopModal>}
      </ModalBackground>
    </>
  );
}
```

3. Call modal with custom content from anywhere

```
const Component = () => {
  const { show } = useModal();
  return <Button onClick={() => show(<ProductForm />)}>...</Button>;
};

export default Component;

```

<a id="server-side-search"></a>

## Server-Side Search

1. Replace router path with new values
2. Debounce operation in case of frequent user input
3. Keep logic within 1x component

```
const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === "" || value === undefined) {
        params.delete(name);
        return params.toString();
      }
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handleChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(pathname + "?" + createQueryString("search", e.target.value));
    }, 150),
    []
  );
  return (
    <div>
      <Input
        placeholder="Search product..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
```

4. Fetch new data server-side based on new URL

```
export default async function Home({ searchParams }: { searchParams: any }) {
  const { search } = searchParams;
  const products = await getProducts({ search });
  return (
      ...
      <div ...>
        <SearchInput />
        ...
      </div>
      <ProductsTable products={products} key={Math.random()} />
      ...
  );
}
```

<a id="infinite-scroll"></a>

## Infinite Scroll

1. Initialize serverside products as clientside state
2. Initialize page state
3. Define "fetchMore" function

```
const PAGE_SIZE = 25;

const ProductsTable = ({ products }) => {
  ...
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

  ...
  return (
    <div ...>
      ... {renderedProducts.map((product) => <div>...</div>)} ...
    </div>
  );
};

export default ProductsTable;

```

4. Reference a loader component
5. Fetch more products if component comes into view

```
const ProductsTable = ({ products }) => {

  ...

  const { ref, inView, entry } = useInView();

  useEffect(() => {
    fetchMoreProducts();
  }, [inView]);

  return (
    <div ...>
      ...
      {!isEnd && (
        <div ref={ref} className="flex w-full flex-col gap-4 p-4">
          <Skeleton className="h-[80px] w-full rounded-md" />
          <Skeleton className="h-[80px] w-full rounded-md" />
          <Skeleton className="h-[80px] w-full rounded-md" />
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
```

# Conclusion

I hope you found some helpful shortcuts and abstractions above!
Clone the repo, to find the full implementation and start the project locally yourself.
