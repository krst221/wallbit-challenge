import { FC, useMemo } from 'react'
import { formatDate, formatPrice } from '../../utils/format'
import CartTable from './table/CartTable'
import ItemCards from './cards/ItemCards'
import WarningModal from '../utils/WarningModal'
import { useCart } from '@/hooks/useCart'

const Cart: FC = () => {
  const { cart, date, handleWarning } = useCart()

  const { totalProducts, totalPrice } = useMemo(() => {
    return cart.reduce((acc, item) => ({
      totalProducts: acc.totalProducts + item.amount,
      totalPrice: acc.totalPrice + item.price * item.amount,
    }), { totalProducts: 0, totalPrice: 0 });
  }, [cart]);

  return (
    <>
      <div className="flex flex-col md:overflow-auto p-4 m-6 mb-3 gap-7 text-left border border-gray-600 
        rounded-lg bg-gray-800 items-start w-[calc(100%-24px)] max-w-[1148px]">
        <div className="flex items-start justify-between w-full pr-1">
          <h1 className="text-xl font-bold max-w-[260px] min-[430px]:max-w-full md:text-2xl">
            Carro de compra <span className="text-xl mr-3">🛒</span> 
            <span className="text-base">{date && cart.length > 0 && formatDate(date)}</span>
          </h1>
          {cart.length > 0 &&
            <button
              title="Vaciar carro"
              className="hover:opacity-75 text-xl"
              onClick={() => handleWarning('clear')}
            >🗑️</button>
          }
        </div>
        
        {cart.length > 0 ? (
          <>
            <CartTable />
            <ItemCards />
            <div className="mt-auto mb-2 text-base">
              <h3>Total productos: <span className="font-bold">{totalProducts}</span></h3>
              <h3>Subtotal: <span className="font-bold">{formatPrice(totalPrice)}</span></h3>
            </div>
          </>
        ) : (
          <p>No hay productos en el carro aún, prueba agregando arriba con su id y la cantidad que deseas ingresar</p>
        )}
      </div>
      <WarningModal />
    </>
  )
}

export default Cart
