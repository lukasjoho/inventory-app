'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import FileInput from './form/FileInput';
import { createProduct, deleteProduct, updateProduct } from '@/lib/actions';
import toast from 'react-hot-toast';
import { Prisma } from '@prisma/client';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  useModal,
} from './modal';
import { CategoryComboBox } from './form/CategoryComboBox';
import { faker } from '@faker-js/faker';
import { Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  isDeal: z.boolean(),
  imageUrl: z.string().optional(),
  categoryId: z.string().optional(),
});

interface ProductFormProps {
  product?: Prisma.ProductGetPayload<{}>;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const { hide } = useModal();
  const { name, description, price, stock, isDeal, imageUrl, categoryId } =
    product ?? {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name ?? undefined,
      description: description ?? undefined,
      price: price ?? 0,
      stock: stock ?? 0,
      isDeal: isDeal ?? false,
      imageUrl: imageUrl ?? undefined,
      categoryId: categoryId ?? undefined,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const nullifiedValues: any = {};
    Object.keys(values).forEach((key) => {
      // @ts-ignore
      nullifiedValues[key] =
        // @ts-ignore
        values[key] === '' || !values[key] === undefined ? null : values[key];
    });
    let res;
    if (product) {
      res = await updateProduct({ id: product.id, data: nullifiedValues });
    } else {
      res = await createProduct(nullifiedValues);
    }
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    hide();
  }

  const getRandomImageUrl = () => {
    const randomImageUrl = faker.image.urlLoremFlickr({ category: 'product' });

    form.setValue('imageUrl', randomImageUrl);
    return;
  };

  return (
    <Form {...form}>
      <Modal as="form" onSubmit={form.handleSubmit(onSubmit)}>
        <ModalHeader>
          <ModalTitle>{product ? 'Edit product' : 'Create product'}</ModalTitle>
        </ModalHeader>
        <ModalContent className="space-y-6">
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex grow flex-col justify-between">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategoryComboBox
                      value={field.value}
                      // @ts-ignore
                      setValue={form.setValue}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter stock..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Image</FormLabel>
                  <Button
                    variant="outline"
                    size="xs"
                    type="button"
                    onClick={() => getRandomImageUrl()}
                    className="flex gap-1"
                  >
                    <Sparkles className="h-3 w-3" /> Get random image
                  </Button>
                </div>
                <FormControl>
                  <FileInput setValue={form.setValue} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </ModalContent>

        <ModalFooter>
          <div className="flex justify-between">
            {product && (
              <Button
                variant="destructive"
                type="button"
                onClick={async () => {
                  const res = await deleteProduct(product.id);
                  if (res.success) {
                    toast.success(res.message);
                    hide();
                  } else {
                    toast.error(res.message);
                  }
                }}
              >
                Delete
              </Button>
            )}
            {product && (
              <Button className="ml-auto" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update'
                )}
              </Button>
            )}
            {!product && (
              <Button className="ml-auto" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            )}
          </div>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

export default ProductForm;
