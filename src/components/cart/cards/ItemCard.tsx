import { FC } from 'react'
import { useCart } from '@/hooks/useCart'
import ItemImage from '@/components/cart/ItemImage'
import { formatPrice } from '@/utils/format'
import AmountButtons from '../AmountButtons'

interface Props {
  item: CartItem
}

const ItemCard: FC<Props> = ({ item }) => {
  const { handleWarning } = useCart()
  const { id, amount, title, price, image } = item

  return (
    <div className="flex flex-col p-6 mb-4 bg-black border border-gray-400 relative w-[90%]">
      <button 
        className="absolute top-1 right-2 text-red-500 text-xl hover:opacity-75 
          text-center cursor-pointer"
        name="Xc"
        onClick={() => handleWarning('remove', id)}  
        >
      X</button>
      <div className="flex items-center gap-4 mb-4 text-sm">
        <ItemImage image={image} title={title} />
        <h3 className="break-words truncate w-full ">{title}</h3>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-start gap-1">
          <div className="flex items-center justify-start">
            <span className="text-gray-400 mr-2 font-bold">Cantidad:</span>
            <AmountButtons id={id} amount={amount}>
              <p className="font-bold w-[24px] text-center">{amount}</p>
            </AmountButtons>
          </div>
        </div>
        <div>
          <span className="text-gray-400 font-bold">Precio U:</span>
          <span className="ml-2 font-bold">{formatPrice(price)}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-400 font-bold">Total:</span>
          <span className="ml-2 font-bold">{formatPrice(price * amount)}</span>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
