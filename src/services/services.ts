import { BASE_URL } from "./config"

export const FetchCartItem = async (id: number, amount: number): Promise<CartItem> => {
  if (!id || typeof id !== 'number') {
    throw new Error('El id introducido es inválido')
  }

  if (!amount || typeof amount !== 'number') {
    throw new Error('La cantidad introducida es inválida')
  }

  try {
    const response = await fetch(`${BASE_URL}/${id}`)
    
    if (!response.ok) throw new Error()

    const item: CartItem = await response.json()

    item.amount = amount
    return item

  } catch (error) {
    throw new Error()
  }
}