import { createContext, useEffect, useReducer, useState } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cart.js'
import { toast } from 'sonner'
import { saveToLocalStorage } from '@/helpers/local-storage.js'

interface CartContextType {
  cart: CartItem[]
  date: Date | null
  modalData: ModalData
  setModalData: (data: ModalData) => void
  addToCart: (item: CartItem, type?: string) => void
  handleAmount: (type: string, id: number) => void
  handleWarning: (type: string, id?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  date: null,
  modalData: { open: false },
  setModalData: () => {},
  addToCart: () => {},
  handleAmount: () => {},
  handleWarning: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
})

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)
  
  const addToCart = (item: CartItem, type?: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { item }})
    if (type === 'add') toast.success('Producto añadido correctamente')
    else if (type === 'update') toast.success('Producto actualizado correctamente')
  }

  const handleAmount = (type: string, id: number) => {
    const item = state.find(i => i.id === id)!
    const newAmount = type === 'up' 
      ? Math.min(item.amount + 1, 100) // Máximo 100 items
      : Math.max(item.amount - 1, 1) // Mínimo 1 item

    addToCart({ ...item, amount: newAmount })   
  }

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id }})
    toast.success('Producto eliminado correctamente')
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART', payload: {}})
    toast.success('Carro vaciado correctamente')
  }

  return { state, addToCart, handleAmount, removeFromCart, clearCart }
}

export function CartProvider ({ children } : { children: React.ReactNode }) {
  const dateString = JSON.parse(window.localStorage.getItem('date') ?? '')
  const initialDate = dateString ? new Date(dateString) : new Date()

  const { state, addToCart, handleAmount, removeFromCart, clearCart } = useCartReducer()
  const [date, setDate] = useState<Date | null>(initialDate ?? null)
  const [modalData, setModalData] = useState<ModalData>({ open: false })

  useEffect(() => {
    saveToLocalStorage({ cart: state })

    if (state.length === 1) {
      if (!dateString) {
        const date = new Date()
        saveToLocalStorage({ date: date })
        setDate(date)
      }
    } else if (state.length === 0) {
      setDate(null)
      saveToLocalStorage({ date: null })
    }
  }, [state])

  const handleWarning = (type: string, id?: number) => setModalData({ open: true, type, id })
  
  return (
    <CartContext.Provider 
      value={{
        cart: state,
        date,
        modalData,
        setModalData,
        addToCart,
        handleAmount,
        handleWarning,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}