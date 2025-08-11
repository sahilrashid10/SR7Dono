import React from 'react';
import PaymentPage from '@/app/components/PaymentPage';
const Page = async({params}) => {
  const {username} = await params;
  return (
    <>
      <PaymentPage username={username}></PaymentPage>
    </>

  );
};

export default Page;
