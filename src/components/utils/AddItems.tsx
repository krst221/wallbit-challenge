import { FC, useState, FormEvent, ChangeEvent } from "react"
import { FetchCartItem } from "../../services/services"
import { toast } from "sonner"
import { useCart } from "@/hooks/useCart"

interface FormData {
  id: number | ''
  amount: number | ''
}

const AddItems: FC = () => {
  const { cart, addToCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    id: '',
    amount: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({
          ...prev,
          [name]: value === '' ? '' : Number(value)
      }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { id, amount } = formData

    if (!id || !amount || id < 1 || amount < 1) {
      toast.error('Por favor, ingrese valores válidos')
      return
    }

    setLoading(true)

    try {
      const existingItem = cart.find(i => i.id === id)     
      if (existingItem) {
        const amountToAdd = Math.min(existingItem.amount + amount, 100)
        // Actualiza el item ya existente en el carro
        addToCart({...existingItem, amount: amountToAdd}, 'update')
        return
      }
      // Haz el fetch si el item no esta en el carro    
      const newItem = await FetchCartItem(Number(id), Number(amount))
      addToCart(newItem, 'add')
    } catch (error) {
      toast.error(`Error al obtener el producto ${id}`)
    } finally {
      setLoading(false)
      setFormData({ id: '', amount: '' })
    }
  }

  return (
    <div className="flex flex-col p-4 mb-1 md:mb-4 gap-7 items-start border border-gray-600 rounded-lg
      bg-gray-800 justify-between w-[calc(100%-24px)] max-w-[1148px]"> 
      <h1 className="text-xl font-bold md:text-2xl">Añadir productos</h1>
      <form 
        className="flex items-center flex-col md:flex-row justify-between w-full gap-5" 
        onSubmit={handleSubmit} 
        aria-label="add-product-form"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="flex flex-col items-start gap-1">
            <label 
              htmlFor="amount" 
              className="text-base font-bold"
            >Cantidad</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              className="w-[250px] h-[32px] font-semibold"
              onChange={handleChange}
              placeholder="Ingrese cantidad"
              aria-label="Cantidad"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-1">
          <label 
            htmlFor="amount"
              className="text-base font-bold"
          >ID del Producto</label>
            <input
              id="id"
              name="id"
              type="number"
              value={formData.id}
              className="w-[250px] h-[32px] font-semibold"
              onChange={handleChange}
              placeholder="Ingrese ID"
              aria-label="ID del producto"
              required
            />
          </div>
        </div>
        <button
          className="bg-blue-900 font-bold text-white py-2 px-3 h-[40px] rounded-md 
          disabled:opacity-50 enabled:hover:opacity-75 text-sm sm:text-base"
          type="submit"
          name="Añadir producto"
          disabled={!formData.id || !formData.amount || loading}
        >
          {loading ? 'Cargando..' : 'Añadir producto'}
        </button>
      </form>
    </div>
  )
}

export default AddItems
