/**------------------Динамічні маршрути--------------
Ми хочемо створити сторінку для перегляду деталей окремої нотатки. Для цього потрібно реалізувати динамічний маршрут – тобто сторінку, яка працює з різними id.

У Next.js структура маршруту базується на папках. Для динамічного маршруту використовується формат у квадратних дужках: */

//=============================================//

// const NoteDetails = () => {
//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;

//============================================//
/**-----------Отримання id з URL----------

Next.js автоматично передає параметри маршруту у пропс params. В серверному компоненті params це проміс, тому перед ним потрібно додати await, щоб почекати поки він виконається зі значенням. */

// app/notes/[id]/page.tsx

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   console.log('note id:', id);

//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;

//=======================================//

// використаємо функцію запиту до API для singleNote:

// app/notes/[id]/page.tsx

// import { getSingleNote } from '@/lib/api';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);
//   console.log(note);

//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;

/**Якщо запит поверне помилку (наприклад, нотатки не існує) – спрацює компонент error.tsx. Якщо в поточній папці його немає, Next.js підніметься вище у структурі, поки не знайде глобальний error.tsx.
 *
 * Це дозволяє мати глобальний обробник помилок для всього застосунку. Тобто ми можемо на самому верхньому рівні створити єдиний компонент error.tsx для відображення помилки для абсолютно усіх маршрутів.
 */

/**Підсумок

-[id] – синтаксис динамічних маршрутів у Next.js
-Дані параметри автоматично потрапляють у params як сторінок так і хендлерів
-Обробка помилок і завантаження – через спеціальні файли error.tsx і loading.tsx */
//----------------------------------------------
// app/notes/[id]/page.tsx

// import { getSingleNote } from '@/lib/api';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);

//   const formattedDate = note.updatedAt
//     ? `Updated at: ${note.updatedAt}`
//     : `Created at: ${note.createdAt}`;

//   return (
//     <div>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//       <button>Edit</button>
//       <p>{formattedDate}</p>
//     </div>
//   );
// };

// export default NoteDetails;
//--------------------------------------------------------
//❌❌❌❌
/**Завантаження даних у клієнтському компоненті
Ми вже виводили деталі нотатки на сторінці app/notes/[id]/page.tsx, використовуючи серверний компонент. Тепер підготуємо компонент для клієнтської взаємодії з контентом, наприклад, в майбутньому потрібна буде реакція на натискання кнопки, стан тощо.

Проблема: обробка подій у серверному компоненті

Сторінка деталей – це серверний компонент, який виконується на сервері. Користувач отримує вже згенерований HTML без клієнтських обробників подій.

Якщо ви спробуєте додати onClick, отримаєте помилку:

Next.js попередить, що обробку подій можна зробити лише у клієнтських компонентах, для яких потрібно явно додати директиву "use client". Але в такому випадку одразу отримаємо попередження від лінтера про те, що клієнтський компонент не може бути async.

Якщо зробити сторінку повністю клієнтською – доведеться переписати все, зокрема й асинхронну логіку. Це незручно. Замість того щоб робити всю сторінку клієнтською (що спричинило б інші проблеми), ми залишаємо page.tsx серверним, а вміст переносимо у клієнтський компонент.



Структура:

app/notes/[id]/page.tsx – залишаємо page.tsx серверним
app/notes/[id]/NoteDetails.client.tsx – створюємо окремий клієнтський компонент для інтерактивного вмісту

*/

// import React from 'react';

// function NoteDetails() {
//   return <div>NoteDetails</div>;
// }

// export default NoteDetails;

//------------------------------------------------------------//

// app/notes/[id]/page.tsx

// import { QueryClient } from '@tanstack/react-query';
// import { getSingleNote } from '@/lib/api';
// import NoteDetailsClient from './NoteDetails.client';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['note', id],
//     queryFn: () => getSingleNote(id),
//   });

//   return <NoteDetailsClient />;
// };

// export default NoteDetails;

/**prefetchQuery – функція, яка завчасно завантажить нам ці нотатки та збереже їх у кеш на сервері. Завдяки цьому при виклику useQuery у клієнтському компоненті, дані вже будуть доступні – без повторного запиту.
queryKey – ключ, за яким дані будуть збережені у кеш
queryFn – функція HTTP-запиту

///////////////////////////////////////////////////////
Для того, щоб використати ці дані в клієнтському компоненті, необхідно використати HydrationBoundary із React Query. */

// app/notes/[id]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;

//////////////////////////////////////////////////////////////
