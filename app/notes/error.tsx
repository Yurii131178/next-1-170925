// -----додаємо обробку помилки при SSR-------//

// app/notes/error.tsx

// 'use client';

// type Props = {
//   error: Error;
// };

// const Error = ({ error }: Props) => {
//   return (
//     <div>
//       <h2>Помилка при завантаженні</h2>
//       <p>{error.message}</p>
//     </div>
//   );
// };

// export default Error;

//========================================//

/**Додамо кнопку "Спробувати знову”

Next.js автоматично передає в error.tsx також функцію reset. Вона скидає помилку і повторно запускає логіку завантаження сторінки. */
// app/notes/error.tsx

'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Помилка при завантаженні</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Спробувати знову</button>
    </div>
  );
};

export default Error;
