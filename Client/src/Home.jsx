import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListItem from './components/ListItem'

function Home() {
  const [itemId, setItemId] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState('')
  const [itemMetric, setItemMetric] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [listData, setListData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getitems')
      setListData(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) // Fetch data on initial load

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deleteitem/${_id}`)
      console.log(response.data)
      fetchData() // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting item:', error.message)
    }
  }

  const handleTaken = async (_id, istaken) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/updateTaken/${_id}`, { istaken: !istaken })
      console.log(response.data)
      fetchData() // Refresh the list after updating 'taken' status
    } catch (error) {
      console.error('Error updating item status:', error.message)
    }
  }

  const openEdit = () => {
    setIsEdit(true)
  }

  const closeEdit = () => {
    setIsEdit(false)
    // Clear the edit form state when closing
    setItemId('')
    setItemName('')
    setItemQuantity('')
    setItemMetric('')
  }

  const handleEdit = (_id, product, quantity, unit) => {
    setItemId(_id)
    setItemName(product)
    setItemQuantity(quantity)
    setItemMetric(unit)
    openEdit()
  }

  const handleInputChange = (setState) => (event) => {
    setState(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newItem = { product: itemName, quantity: itemQuantity, unit: itemMetric }
    try {
      const response = await axios.post('http://localhost:3000/api/additem', newItem)
      console.log(response.data)
      fetchData() // Refresh the list after adding
      // Clear the form
      setItemName('')
      setItemQuantity('')
      setItemMetric('')
    } catch (error) {
      console.error('Error adding item:', error.message)
    }
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const updatedItem = { product: itemName, quantity: itemQuantity, unit: itemMetric }
    try {
      const response = await axios.patch(`http://localhost:3000/api/update/${itemId}`, updatedItem)
      console.log(response.data)
      fetchData() // Refresh the list after editing
      closeEdit() // Close the edit modal and clear state
    } catch (error) {
      console.error('Error updating item:', error.message)
    }
  }

  return (
    <div className="home-section">
      <div className="home-container">
        <h2>Grocery List</h2>
        <form className="data-form" onSubmit={handleSubmit}>
          <input
            className="item-input"
            type="text"
            value={itemName}
            onChange={handleInputChange(setItemName)}
            placeholder="Item name"
            required
          />
          <input
            className="quantity-input"
            type="text"
            value={itemQuantity}
            onChange={handleInputChange(setItemQuantity)}
            placeholder="Quantity"
            required
          />
          <select
            className="metics-select"
            value={itemMetric}
            onChange={handleInputChange(setItemMetric)}
            required
          >
            <option value="">--</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="mg">mg</option>
            <option value="L">L</option>
            <option value="mL">mL</option>
            <option value="pkt">pkt</option>
            <option value="box">box</option>
            <option value="pcs">pcs</option>
            <option value="bottle">bottle</option>
          </select>
          <button className="btn-add" type="submit">
            Add
          </button>
        </form>
        {listData.length > 0 ? (
          <div key="list-container" className="list-container">
            {listData.map((data, index) => (
              <ListItem
                key={data._id}
                _id={data._id}
                sNo={index + 1}
                istaken={data.istaken}
                product={data.product}
                quantity={data.quantity}
                unit={data.unit}
                isTakenUpdate={handleTaken}
                isEditItem={handleEdit}
                deleteItem={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div key="empty-list">
            <h3 style={{ textAlign: 'center' }}>List is Empty</h3>
          </div>
        )}
      </div>
      {isEdit && (
        <div className="edit">
          <div className="edit-content">
            <img
              className="icons close"
              src="/icons/close.svg"
              alt="close"
              onClick={closeEdit}
            />
            <h2>Edit</h2>
            <form className="edit-form data-form" onSubmit={handleEditSubmit}>
              <input
                className="item-input"
                type="text"
                value={itemName}
                onChange={handleInputChange(setItemName)}
                placeholder="Item name"
                required
              />
              <input
                className="quantity-input"
                type="text"
                value={itemQuantity}
                onChange={handleInputChange(setItemQuantity)}
                placeholder="Quantity"
                required
              />
              <select
                className="metics-select"
                value={itemMetric}
                onChange={handleInputChange(setItemMetric)}
                required
              >
                <option value="">--</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="mg">mg</option>
                <option value="L">L</option>
                <option value="mL">mL</option>
                <option value="pkt">pkt</option>
                <option value="box">box</option>
                <option value="pcs">pcs</option>
                <option value="bottle">bottle</option>
              </select>
              <button className="btn-add" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home