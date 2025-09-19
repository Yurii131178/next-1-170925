// Вивід даних у клієнтському компоненті

// Тепер в клієнтському компоненті необхідно також отримати ідентифікатор нотатки із URL через useParams, додати хук useQuery та опрацювати дані.

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSingleNote } from '@/lib/api';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default NoteDetailsClient;

/** useParams – хук для клієнтських компонентів, який повертає об'єкт із динамічними параметрами поточного маршруту, підставленими з URL; він не приймає жодних аргументів.
В useQuery потрібно передати той же queryKey, що і для prefetchQuery, щоб дістати із кешу дані відповідної нотатки.
Також обов’язково вказуємо, що нам не потрібен повторний запит при монтуванні клієнтського компонента (refetchOnMount: false). Це вимикає повторний запит при монтуванні, оскільки дані вже є з prefetchQuery.


В результаті при переході на сторінку нотатки отримаємо її дані.

==========Що ми отримали================



SSR-запит у page.tsx – дані приходять на сервер
Дані кешуються через prefetchQuery
HydrationBoundary передає кеш клієнту
useQuery у клієнтському компоненті дістає ці дані з кешу
У браузер потрапляє згенерований HTML, а React Query забезпечує інтерактивність без додаткових запитів.*/
