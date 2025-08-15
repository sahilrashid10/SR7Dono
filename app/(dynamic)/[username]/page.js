export const dynamic = 'force-dynamic'; // ✅ This is the key

import React from 'react';
import PaymentPage from '@/app/components/PaymentPage';

const Page = async ({ params }) => {
  const { username } = params; // no need for `await` here
  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Page;


//fixes dynamic routing error(404)

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - SR7-Dono`
  };
}
