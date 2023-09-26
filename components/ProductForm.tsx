"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import FileInput from "./FileInput";
import { createProduct, deleteProduct, updateProduct } from "@/lib/actions";
import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
import { useModal } from "./modal";
import { CategoryComboBox } from "./CategoryComboBox";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
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
      name: name ?? "",
      description: description ?? "",
      price: price ?? 0,
      stock: stock ?? 0,
      isDeal: isDeal ?? false,
      imageUrl: imageUrl ?? "",
      categoryId: categoryId ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const nullifiedValues: any = {};
    Object.keys(values).forEach((key) => {
      // @ts-ignore
      nullifiedValues[key] = values[key] === "" ? null : values[key];
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormItem className="flex flex-col">
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
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileInput setValue={form.setValue} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          {product && (
            <Button
              variant="destructive"
              type="button"
              onClick={async () => {
                await deleteProduct(product.id);
                hide();
              }}
            >
              Delete
            </Button>
          )}
          <Button type="submit">{product ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
