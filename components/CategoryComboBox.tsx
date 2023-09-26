"use client";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCategories } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

const useCategories = () => {
  const [categories, setCategories] = useState<Prisma.CategoryGetPayload<{}>[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const dbCategories = await getCategories();
      setCategories(dbCategories);
    };
    fetchCategories();
  }, []);

  return categories;
};

interface CategoryComboBoxProps {
  value: string | null | undefined;
  setValue: (categoryId: string, value: string) => void;
}

export function CategoryComboBox({ value, setValue }: CategoryComboBoxProps) {
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState("");
  const categories = useCategories();

  const [currentInputValue, setCurrentInputValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "min-w-[160px] justify-between font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value
            ? categories.find((c) => c.id === value)?.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select category..." />
          <CommandEmpty>
            {/* <div className="p-1">
              <div className="bg-accent flex gap-1.5 py-1.5 px-2 items-center whitespace-nowrap overflow-hidden">
                <PlusCircle className="w-4 h-4" /> Create {value}
              </div>
            </div> */}
            No category found
          </CommandEmpty>
          <CommandGroup>
            {categories.map((c) => (
              <CommandItem
                key={c.id}
                onSelect={(currentValue) => {
                  setValue("categoryId", c.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === c.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {c.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
