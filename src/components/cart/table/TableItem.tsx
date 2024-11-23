import { FC } from 'react'
import { useCart } from '@/hooks/useCart'
import ItemImage from '@/components/cart/ItemImage'
import { formatPrice } from '@/utils/format'
import AmountButtons from '../AmountButtons'

interface Props {
  item: CartItem
}

const TableItem: FC<Props> = ({ item }) => {
  const { handleWarning } = useCart()
  const { amount, title, price, image, id } = item

  return (
    <tr className="border-b text-left">
      <td className="p-2 w-[115px]">
        <div className="flex items-center gap-1">
          <AmountButtons id={id} amount={amount}>
            <p className="font-bold w-[28px] text-center">{amount}</p>
          </AmountButtons>
        </div>
      </td>
      <td className="p-2 font-bold">{title}</td>
      <td className="p-2 font-bold">{formatPrice(price)}</td>
      <td className="p-2 font-bold">{formatPrice(price * amount)}</td>
      <td className="p-2">
        <ItemImage image={image} title={title} />
      </td>
      <td className="p-2">
        <button
          className="text-red-500 ml-[calc(50%-0.5rem)] w-4 text-xl hover:opacity-75 cursor-pointer"
          name="Xt"
          onClick={() => handleWarning('remove', id)}
        >
          X</button>
      </td>
    </tr>
  )
}

export default TableItem
