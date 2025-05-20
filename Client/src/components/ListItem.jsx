import React from 'react'

function ListItem({ _id, sNo, istaken, product, quantity, unit, isTakenUpdate, isEditItem ,deleteItem}) {
  return (
    <div className='list-card' key={_id}>
      <img className='icons' src={!istaken ? "icons/check-box-outlined.svg" : "icons/check-box-filled.svg"} alt="check" onClick={()=>isTakenUpdate(_id, istaken)}/>
      <div className='values'>
        <p style={istaken ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{sNo}</p>
        <p style={istaken ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{product}</p>
        <p style={istaken ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{quantity +" "+ unit}</p>
      </div>
      <img className='icons' src="icons/edit.svg" alt="edit" onClick={()=>isEditItem(_id, product, quantity, unit)} />
      <img className='icons' src="icons/delete.svg" alt="delete" onClick={() => { deleteItem(_id) }}/>
    </div>
  )
}

export default ListItem