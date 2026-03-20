import React from 'react';
import Rating from '@mui/material/Rating';
import "./ReviewCard.css";

export default function ReviewCard(props) {
  return (
    <div id = "reviewCard" className='bg-white w-[25%] text-white flex flex-col h-[75%] justify-around p-9 border border-neutral-600'>
      <Rating name="read-only" value={props.value} readOnly/>
      <div className='text-black font-semibold' id="reviewText">"{props.review}"</div>
      <div className='flex items-center gap-4'>
        <div className='w-[50px] rounded-full'><img src={props.image} alt="" className='rounded-full w-[100%] h-[50px]'/></div>
        <div className='text-[#faaf00] text-[18px] font-semibold' id="reviewName">{props.name}</div>
      </div>
    </div>
  )
}
