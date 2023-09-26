import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import { updateIsDeal } from '@/lib/actions';
import toast from 'react-hot-toast';

interface CheckboxFormProps extends CheckboxProps {
  id: string;
}

const CheckboxForm = ({ id, checked }: CheckboxFormProps) => {
  const handleChange = async (checked: any) => {
    const res = await updateIsDeal({ id, isDeal: !checked });
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Checkbox
      onClick={(e: any) => e.stopPropagation()}
      checked={checked}
      onCheckedChange={() => handleChange(checked)}
    />
  );
};

export default CheckboxForm;
