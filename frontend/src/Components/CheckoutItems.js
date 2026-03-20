import React from 'react'

export default function CheckoutItems({image,title,quantity,price}) {
  return (
    <div className='w-[100%] items-center p-6 flex text-[#98a3af] border-neutral-600 border-b'>
      <div className='flex w-[70%] gap-8'>
        <img src={image} alt="" className='w-[80px] h-[80px]'/>
        <div className='flex text-xl items-center gap-3 w-[]'>
          <p>{title}</p> x <p>{quantity}</p>
        </div>
      </div>
      <div className='flex justify-end items-center text-xl w-[30%]'>
        <p>₹ {quantity*price}</p>
      </div>
    </div>
  )
}
