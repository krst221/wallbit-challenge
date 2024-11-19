declare type CartItem = {
  id: number
  title: string
  price: number
  amount: number
  image: string
}

declare type ModalData = {
  open: boolean
  type?: string
  id?: number
}

declare type CartAction = {
  type: string
  payload: {
    item?: CartItem
    id?: number
    amount?: number
  }
}