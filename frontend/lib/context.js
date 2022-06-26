import React, { createContext, useContext, useState } from 'react'

const ShopContext = createContext()

export const StateContext = ({ children }) => {
  const [showCard, setShowCard] = useState(false)
  const [cardItems, setCardItems] = useState([])

  // Add our data for the state
  const [qty, setQty] = useState(1)

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

  return (
    <ShopContext.Provider value={{ qty, increaseQty, decreaseQty, showCard, setShowCard }}>
      {children}
    </ShopContext.Provider>
  )
}

export const useStateContext = () => useContext(ShopContext)
