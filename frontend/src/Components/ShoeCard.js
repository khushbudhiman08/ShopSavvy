import React from 'react';
import "./ShoeCard.css";
import "./ShoeCategory.css";
import { useNavigate } from 'react-router-dom';


export default function ShoeCard(props) {
  const navigate = useNavigate();


  function clickHandler () {
    props.setShoeInfo({
      id: props.id,
      image: props.image, 
      shoeTitle: props.shoeTitle,
      oldShoePrice: props.oldShoePrice,
      shoePrice: props.shoePrice,
      saleStatus: props.saleStatus,
      type: props.type,
      desc: props.desc
    })
    navigate("/buyshoe");
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className='flex flex-col gap-6' id="shoeCard" onClick={clickHandler}>
      <div id = "imageDiv">
        <img src={props.image} alt="" className='cursor-pointer'/>
      </div>
      <div className='flex flex-col gap-3'>
        <h2 id = "shoeName" className='text-center text-xl font-bold'>{props.shoeTitle}</h2>
        <div id = "shoePrice" className='flex gap-3 justify-center font-semibold'>
            <div className={props.saleStatus? `line-through text-neutral-600 block` : `hidden`}>₹ {props.oldShoePrice}</div>
            <div className='text-neutral-400'>₹ {props.shoePrice}</div>
        </div>
      </div>
    </div>
  )
}
