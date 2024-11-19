import { FC, useState, FormEvent, ChangeEvent } from "react"
import { FetchItem } from "../../services/services"
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
      toast.error('Por favor ingrese valores válidos')
      return
    }

    setLoading(true)

    try {
      const existingItem = cart.find(i => i.id === id)     
      if (existingItem) {
        const amountToAdd = Math.min(existingItem.amount + amount, 100)
        // Actualiza el item ya existente en el carro
        addToCart({...existingItem, amount: amountToAdd}, 'add')
        return
      }
      // Haz el fetch si el item no esta en el carro    
      const newItem = await FetchItem(Number(id), Number(amount))
      addToCart(newItem, 'update')
    } catch (error) {
      if (error instanceof Error) toast.error('Error al añadir el producto: ' + error)
      else toast.error('Error al añadir el producto')
    } finally {
      setLoading(false)
      setFormData({ id: '', amount: '' })
    }
  }

  return (
    <div className="flex flex-col p-3 mb-1 md:mb-4 gap-7 items-start justify-between 
      w-[70%] md:min-w-[580px] max-w-[1200px]"> 
      <h1 className="text-base md:text-xl xl:text-2xl">Añadir productos</h1>
      <form 
        className="flex items-center flex-col xl:flex-row justify-between w-[95%] gap-5" 
        onSubmit={handleSubmit} 
        aria-label="add-product-form"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="flex flex-col items-start gap-1">
            <label 
              htmlFor="amount" 
              className="text-sm sm:text-base md:text-xl pl-2"
            >Cantidad</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min={1}
              max={100}
              value={formData.amount}
              className="w-[209px]"
              onChange={handleChange}
              placeholder="Ingrese cantidad"
              aria-label="Cantidad"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-1">
          <label 
            htmlFor="amount"
            className="text-sm sm:text-base md:text-xl pl-2"
          >ID del Producto</label>
            <input
              id="id"
              name="id"
              type="number"
              min={1}
              value={formData.id}
              className="w-[209px]"
              onChange={handleChange}
              placeholder="Ingrese ID"
              aria-label="ID del producto"
              required
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-3 h-[40px] rounded-md 
          disabled:opacity-50 enabled:hover:bg-blue-600 text-sm sm:text-base"
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
