import { CartContext } from '@/context/cart'
import { useContext } from 'react'

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart tiene que ser usado dentro de un CartProvider')
  }

  return context
}