import { FC } from 'react'
import AmountButtons from '../../utils/AmountButtons'
import { useCart } from '@/hooks/useCart'
import ItemImage from '@/components/utils/ItemImage'

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
          <p className="ml-1 font-medium w-[30px]">{amount}</p>
          <AmountButtons id={id} amount={amount} />
        </div>
      </td>
      <td className="p-2">{title}</td>
      <td className="p-2">
        {price.toLocaleString("en-US", {
          currency: "USD",
          style: "currency"
        })}
      </td>
      <td className="p-2">
        {(price * amount).toLocaleString("en-US", {
          currency: "USD",
          style: "currency"
        })}
      </td>
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
