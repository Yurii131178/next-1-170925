// app/not-found.tsx

// import Link from 'next/link';

// const NotFound = () => {
//   return (
//     <div>
//       <h1>404 - Page Not Found</h1>
//       <p>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>
//       <Link href="/" style={{ color: 'greenyellow' }}>
//         Go back home
//       </Link>
//     </div>
//   );
// };

// export default NotFound;

//=============================================//
/**Перенаправлення з неіснуючих маршрутів

Якщо ви хочете, щоб користувач замість 404 сторінки потрапляв, наприклад, на головну або іншу сторінку – використовуйте not-found.tsx як клієнтський компонент із перенаправленням. */

// app/not-found.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Вас буде перенаправлено на головну через кілька секунд…</p>
    </div>
  );
};

export default NotFound;

/**404 для вкладених маршрутів

Якщо у вашому застосунку є вкладені маршрути, можна створити локальну not-found.tsx у конкретній папці, наприклад:

app/
├── profile/
│   ├── not-found.tsx ← працює тільки для /profile/*

Це дозволяє створювати різні 404 сторінки для різних секцій сайту.

Next.js автоматично обробляє помилки типу 404, але при потребі ви можете задати власну сторінку – глобально або в межах окремого маршруту. 
Для цього достатньо додати файл not-found.tsx у потрібну папку. */
