import React from 'react'
import ShoeCategory from './ShoeCategory'

export default function Collection({title,menData,womenData,setnavStatus,shoeInfo,setShoeInfo,searchResult}) {
  return (
    <div>
      <ShoeCategory title = {title} menData={menData} womenData={womenData} setnavStatus={setnavStatus} shoeInfo={shoeInfo} setShoeInfo={setShoeInfo} searchResult = {searchResult}/>
    </div>
  )
}
