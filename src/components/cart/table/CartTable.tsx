import { FC, useState } from 'react'
import TableItem from './TableItem'
import { useCart } from '@/hooks/useCart'

type SortColumn = 'amount' | 'title' | 'price' | 'total'
type SortDirection = 'asc' | 'desc'

const CartTable: FC = () => {
	const { cart } = useCart()
	const [sortConfig, setSortConfig] = useState<{
		column: SortColumn
		direction: SortDirection
	}>({
		column: 'amount',
		direction: 'asc'
	})

	const sortedItems = [...cart].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1
    
    switch (sortConfig.column) {
      case 'amount':
        return (a.amount - b.amount) * direction
      case 'title':
        return a.title.localeCompare(b.title) * direction
      case 'price':
        return (a.price - b.price) * direction
      case 'total':
        return ((a.price * a.amount) - (b.price * b.amount)) * direction
      default:
        return 0
    }
  })

  const handleSort = (column: SortColumn) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const SortArrow = ({ column }: { column: SortColumn }) => {
		const showArrow = () => {
			if (sortConfig.column !== column) return ''
			return sortConfig.direction === 'asc' 
				? '↑' 
				: '↓'
		}
    return (
      <span className="ml-2 w-2 inline-block">
        {showArrow()}
      </span>
    )
  }


  return (
    <div className="hidden md:block flex-1 w-full min-h-0 overflow-auto pr-1">
			<table className="w-full border-collapse">
				<thead className="sticky top-0 border-b bg-black z-10">
					<tr className="border-b after:absolute after:bottom-[-2px] 
					after:left-0 after:right-0 after:h-px after:bg-gray-200">
						<th 
							className="text-left p-2 whitespace-nowrap cursor-pointer text-gray-400 hover:bg-gray-900"
							onClick={() => handleSort('amount')}
						>
							Cantidad
							<SortArrow column="amount" />
						</th>
						<th 
							className="text-left p-2 whitespace-nowrap cursor-pointer text-gray-400 hover:bg-gray-900"
							onClick={() => handleSort('title')}
						>
							Nombre
							<SortArrow column="title" />
						</th>
						<th 
							className="text-left p-2 whitespace-nowrap cursor-pointer text-gray-400 hover:bg-gray-900"
							onClick={() => handleSort('price')}
						>
							Precio U
							<SortArrow column="price" />
						</th>
						<th 
							className="text-left p-2 whitespace-nowrap cursor-pointer text-gray-400 hover:bg-gray-900"
							onClick={() => handleSort('total')}
						>
							Precio T
							<SortArrow column="total" />
						</th>
						<th className="text-center p-2 whitespace-nowrap text-gray-400">
							Foto
						</th>
						<th className="text-center p-2 whitespace-nowrap text-gray-400">Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{sortedItems.map(item => 
						<TableItem 
							key={item.id} 
							item={item} 
						/>
					)}
				</tbody>
			</table>
    </div>
  )
}

export default CartTable