// app/notes/page.tsx

// const Notes = () => {
//   return <>Notes</>
// };

// export default Notes;

//==================================//

// app/notes/page.tsx

// 1. Імпортуємо функцію
// import { getNotes } from '@/lib/api';

// // 2. Робимо фукнцію асинхронною
// const Notes = async () => {
//   // 3. Виконуємо запит
//   const notes = await getNotes();
//   console.log('notes', notes);

//   return <div>Notes page</div>;
// };

// export default Notes;

//=====================================//

/**додаємо NoteList у компонент сторінки /notes/page.tsx. */

// notes/page.tsx

// import { getNotes } from '@/lib/api';
// import NoteList from '@/components/NoteList/NoteList';

// const Notes = async () => {
//   const response = await getNotes();

//   return (
//     <section>
//       <h1>Notes List</h1>
//       {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
//     </section>
//   );
// };

// export default Notes;
//==========================================//

/**Директива 'use client'
Ми вже реалізували отримання даних у серверному компоненті. Але іноді потрібно робити запити на клієнті, вже після того, як сторінка відрендерилася.

У Next.js всі компоненти за замовчуванням – серверні. Це означає, що вони виконуються на сервері, а клієнту надсилається вже згенерована HTML-сторінка.

Але є ситуації, коли нам потрібно:

зробити запит після рендеру (наприклад, при натисканні);
змінити стан компонента (через useState, useEffect тощо);
реалізувати інтерфейсну логіку (відображення/приховування, фільтрація, події).

Рішення – директива 'use client'

Щоб вказати, що компонент має виконуватись на клієнті, потрібно додати на початку файлу рядок:

'use client';

Це перетворює файл з серверного на клієнтський. Після цього ми можемо використовувати всі React-хуки й події, як у звичайному React.

Приклад: отримання нотаток по кліку

Крок 1. Робимо компонент сторінки Notes клієнтським

// app/notes/page.tsx

'use client';
// інший код файлу

Одразу ж бачимо скарги від ESLint через використання асинхронних клієнтських компонентів. */
//------------------------------//
// Це очікувано, бо асинхронні компоненти на клієнті не підтримуються.

// Отже, реалізуємо запит по кліку. Для цього:

// -Робимо компонент звичайним синхронним, без async
// -Додаємо стан через useState
// -Додаємо у JSX кнопку
// -Додаємо обробник події onClick
// -У функції-обробнику виконуємо запит до API
// -Зберігаємо відповідь у стан
// -Виводимо список, якщо відповідь є

// Усе працює так само як у звичайних React-компонентах.

//=================//КЛІЄНТ//=================//
// app/notes/page.tsx

// 'use client';

// import { useState } from 'react';
// import NoteList from '@/components/NoteList/NoteList';
// import { getNotes, Note } from '@/lib/api';

// const Notes = () => {
//   const [notes, setNotes] = useState<Note[]>([]);

//   const handleClick = async () => {
//     const response = await getNotes();
//     if (response?.notes) {
//       setNotes(response.notes);
//     }
//   };

//   return (
//     <section>
//       <h1>Notes List</h1>
//       <br />
//       <br />
//       <br />
//       <button onClick={handleClick}>Get my notes</button>
//       {notes.length > 0 && <NoteList notes={notes} />}
//     </section>
//   );
// };

// export default Notes;

//==================================//
// SSR //

// app/notes/page.tsx

import NoteList from '@/components/NoteList/NoteList';
import { getNotes } from '@/lib/api';

//ISR

// export const revalidate = 5

const Notes = async () => {
  const response = await getNotes();

  return (
    <section>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </section>
  );
};

export default Notes;
