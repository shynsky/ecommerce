import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

export const StateContext = ({ children }) => {
  // Application state
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [qty, setQty] = useState(1)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Increase product quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  // Decrease products quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }

  // Add product to cart
  const onAdd = (product, quantity) => {
    // Total price
    setTotalPrice(prevTotal => prevTotal + product.price * quantity)
    // Increase total quantity
    setTotalQuantities(prevTotal => prevTotal + quantity)
    // Check if the product is already in the cart
    const exist = cartItems.find(item => item.slug === product.slug)
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }])
    }
  }

  // Remove product
  const onRemove = (product) => {
    // Total price
    setTotalPrice((prevTotal) => prevTotal - product.price)
    // Decrease total quantity
    setTotalQuantities((prevTotal) => prevTotal - 1)
    // Check if the product is already in the card
    const exist = cartItems.find((item) => item.slug === product.slug)
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter(item => item.slug !== product.slug))
    } else {
      setCartItems(cartItems.map(item =>
        item.slug === product.slug
          ? { ...exist, quantity: exist.quantity - 1 }
          : item))
    }
  }

  return (
    <Context.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        onAdd,
        onRemove,
        cartItems,
        totalQuantities,
        totalPrice
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
