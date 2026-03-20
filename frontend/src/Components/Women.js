import React from 'react';
import ShoeCategory from './ShoeCategory';

export default function Women({title,menData,womenData,setnavStatus,shoeInfo,setShoeInfo}) {
  return (
    <div>
      <ShoeCategory shoeInfo = {shoeInfo} setShoeInfo = {setShoeInfo} title={title} menData={menData} womenData={womenData} setnavStatus={setnavStatus}/>
    </div>
  )
}
