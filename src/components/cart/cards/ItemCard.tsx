import { FC } from 'react'
import AmountButtons from '@/components/utils/AmountButtons'
import { useCart } from '@/hooks/useCart'
import ItemImage from '@/components/utils/ItemImage'

interface Props {
  item: CartItem
}

const ItemCard: FC<Props> = ({ item }) => {
  const { handleWarning } = useCart()
  const { id, amount, title, price, image } = item

  return (
    <div className="flex flex-col p-6 mb-4 border relative">
      <button 
        className="absolute top-1 right-2 text-red-500 text-xl hover:opacity-75 
          text-center cursor-pointer"
        name="Xc"
        onClick={() => handleWarning('remove', id)}  
        >
      X</button>
      <div className="flex items-center gap-4 mb-2 text-sm">
        <ItemImage image={image} title={title} />
        <h3 className="break-words">{title}</h3>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-start gap-1">
          <div className="flex items-center justify-start">
            <span className="text-gray-400">Cantidad:</span>
            <p className="ml-2 font-medium w-[30px]">{amount}</p>
          </div>
          <AmountButtons id={id} amount={amount} />
        </div>
        <div>
          <span className="text-gray-400">Precio U:</span>
          <span className="ml-2 font-medium">
            {price.toLocaleString("en-US", {
              currency: "USD",
              style: "currency"
            })}
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-400">Total:</span>
          <span className="ml-2 font-medium">
            {(price * amount).toLocaleString("en-US", {
               currency: "USD",
               style: "currency"
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
