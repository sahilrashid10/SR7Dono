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

export async function generateMetadata({params}){
  return{
    title:`${params.username}-SR7-Dono`
  }
}