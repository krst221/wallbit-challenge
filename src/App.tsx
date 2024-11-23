import Cart from "./components/cart/Cart"
import AddItems from "./components/utils/AddItems"
import { Toaster } from "sonner"
import wallbit from "./assets/image.webp"
import { CartProvider } from "./context/cart"

function App() {

  return (
    <CartProvider>
      <main className="flex items-center h-[calc(lvh)] justify-start flex-col">
        <div className="flex items-center justify-start w-full mb-5 p-2 border-b border-b-gray-600">
          <img 
            className="w-[150px] sm:w-[200px] aspect-15/4" 
            src={wallbit} 
            alt="Fake Store API" 
            loading="eager" 
          />
        </div>
        <AddItems />
        <Cart />
        <Toaster richColors/>
      </main>
    </CartProvider>
  )
}

export default App
