import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import { updateIsDeal } from '@/lib/actions';
import toast from 'react-hot-toast';
import { experimental_useOptimistic as useOptimistic } from 'react';

interface CheckboxFormProps extends CheckboxProps {
  id: string;
}

const CheckboxForm = ({ id, checked }: CheckboxFormProps) => {
  const [optimisticChecked, setOptimisticChecked] = useOptimistic(
    checked,
    (state) => !state
  );

  const handleChange = async (checked: any) => {
    setOptimisticChecked(checked);
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
      checked={optimisticChecked}
      onCheckedChange={() => handleChange(checked)}
    />
  );
};

export default CheckboxForm;
