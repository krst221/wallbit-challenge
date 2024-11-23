import { FC } from 'react'
import ItemCard from './ItemCard'
import { useCart } from '@/hooks/useCart'

const ItemCards: FC = () => {
  const { cart } = useCart()

  return (
    <div className="md:hidden flex-1 w-full min-h-0 flex flex-col items-center">
      {cart.map(item => 
        <ItemCard 
          key={item.id} 
          item={item} 
        />
      )}
    </div>
  )
}

export default ItemCards