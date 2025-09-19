// components/TanStackProvider/TanStackProvider.tsx

'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanStackProvider;

/** Почнемо з підключення провайдера React Query, щоб усі клієнтські компоненти могли використовувати useQuery, кеш і мутації. У папці components створимо клієнтський компонент TanStackProvider, завдання якого дати доступ до queryClient усім дочірнім компонентам.
 * 
 * Детальніше:

QueryClient – керує кешем, мутаціями, завантаженнями тощо
QueryClientProvider – обгортка яка дає доступ до queryClient усім дочірнім компонентам


За бажанням тут також можна підключити ReactQueryDevtools.
*/
