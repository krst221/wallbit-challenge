import { saveToLocalStorage } from "@/helpers/local-storage"

const cartFromLocalStorage = window.localStorage.getItem('cart')

export const cartInitialState: CartItem[] = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_CART: 'UPDATE_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state: CartItem[], action: CartAction) => {
    const { id } = action.payload.item!
    const existingItemIndex = state.findIndex(i => i.id === id)
    let newState = structuredClone(state)

    if (existingItemIndex >= 0) newState[existingItemIndex] = action.payload.item!
    else {
      if (state.length === 0) saveToLocalStorage<Date>({ date : new Date() })
      newState = [...structuredClone(state), action.payload.item as CartItem]
    }

    saveToLocalStorage<CartItem[]>({ cart: newState })
    return newState
  },

  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state: CartItem[], action: CartAction) => {
    const id = action.payload.id!
    const newState = state.filter(item => item.id !== id)
    saveToLocalStorage<CartItem[]>({ cart: newState })
    return newState
  },

  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    saveToLocalStorage<CartItem[]>({ cart: [] })
    return []
  }
}

export const cartReducer = (state: CartItem[], action: CartAction) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}