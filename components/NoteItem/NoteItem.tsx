// components/NoteItem/NoteItem.tsx

import { Note } from '@/lib/api';
import Link from 'next/link';

type Props = {
  item: Note;
};

/**Навігація на сторінку нотатки

Для цього нам потрібно у компоненті NoteItem.tsx додати логіку навігації, за допомогою Link */

const NoteItem = ({ item }: Props) => {
  return (
    <li>
      <Link href={`/notes/${item.id}`}>{item.title}</Link>
    </li>
  );
};

export default NoteItem;

/**Що ми побачимо у браузері?

Перехід на /notes/123
Спрацьовує loading.tsx – якщо затримка в API
Якщо id не існує – рендериться error.tsx

Тобто дочірні маршрути автоматично успадковують компоненти loading.tsx і error.tsx з батьківської папки. Тобто ми можемо на самому верхньому рівні створити єдиний компонент loading.tsx для відображення глобального лоадера для абсолютно усіх маршрутів. */
