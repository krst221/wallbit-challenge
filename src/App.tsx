import Cart from "./components/cart/Cart"
import AddItems from "./components/utils/AddItems"
import { Toaster } from "sonner"
import wallbit from "./assets/image.webp"
import { CartProvider } from "./context/cart"

function App() {

  return (
    <CartProvider>
      <main className="flex items-center h-lvh justify-start flex-col">
        <img 
          className="w-[300px] sm:w-[400px] m-4 aspect-15/4" 
          src={wallbit} 
          alt="Fake Store API" 
          loading="eager" 
        />
        <AddItems />
        <Cart />
        <Toaster richColors/>
      </main>
    </CartProvider>
  )
}

export default App
