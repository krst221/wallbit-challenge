import { FC } from "react"
import { useCart } from '@/hooks/useCart'

interface Props {
  id: number
  amount: number
  children: React.ReactNode
}

const AmountButtons: FC<Props> = ({ id, amount, children }) => {
  const { handleAmount } = useCart()
  
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className='bg-white px-[6px] text-xs py-[2px] w-[20px] m-0 text-black font-bold rounded 
          disabled:opacity-40 enabled:hover:bg-gray-400'
        disabled={amount === 1}
        onClick={() => handleAmount('down', id)}
      >-</button>    
      {children}
      <button
        className='bg-white px-[6px] text-xs py-[2px] w-[20px] m-0 text-black font-bold rounded 
          disabled:opacity-40 enabled:hover:bg-gray-400'
        disabled={amount === 100}
        onClick={() => handleAmount('up', id)}
      >+</button>
    </div>
  )
}

export default AmountButtons
