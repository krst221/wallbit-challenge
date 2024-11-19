import { FC } from 'react'
import { formatDate } from '../../utils/format'
import CartTable from './table/CartTable'
import ItemCards from './cards/ItemCards'
import WarningModal from '../utils/WarningModal'
import { useCart } from '@/hooks/useCart'

const Cart: FC = () => {
  const { cart, date, handleWarning } = useCart()

  const calculateTotals = () => {
    return cart.reduce((acc, item) => ({
      totalProducts: acc.totalProducts + item.amount,
      totalPrice: acc.totalPrice + (item.price * item.amount)
    }), { totalProducts: 0, totalPrice: 0 })
  }

  const { totalProducts, totalPrice } = calculateTotals()
  const showDate = date && cart.length > 0

  return (
    <>
      <div className="flex flex-col md:overflow-auto p-3 m-4 gap-7 text-left 
        items-start w-[70%] md:min-w-[580px] max-w-[1200px]">
        <div className="flex items-start justify-between w-full pr-1">
          <h1 className="text-base md:text-xl xl:text-2xl">
            Carrito de compra <span className="text-xl mr-2">🛒</span> 
            {showDate && `Iniciado ${formatDate(date)}`}
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
            <div className="mt-auto mb-2 text-sm md:text-base">
              <h3>Total productos: {totalProducts}</h3>
              <h3>Total a pagar: {
                totalPrice.toLocaleString("en-US", {
                  currency: "USD",
                  style: "currency"
                })}
              </h3>
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
