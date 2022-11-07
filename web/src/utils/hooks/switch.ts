import { useCallback, useState } from 'react';

export const useSwitch = (initialValue = false) => {
  const [open, setOpenState] = useState(initialValue);

  const on = useCallback(() => setOpenState(true), []);

  const off = useCallback(() => setOpenState(false), []);

  return [open, on, off] as const;
};
