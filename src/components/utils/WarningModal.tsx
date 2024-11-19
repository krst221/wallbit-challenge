import { useCart } from "@/hooks/useCart"
import { FC } from "react"

const WarningModal: FC = () => {
  const { modalData, setModalData, removeFromCart, clearCart } = useCart()

  const handleClick = (type?: string) => {
    setModalData({ open: false })
    if (type === 'remove' && modalData.id) removeFromCart(modalData.id)
    else if (type === 'clear') clearCart()
  }

  return (
    <>
      {modalData.open &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/50 transition-opacity duration-500" aria-hidden="true"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                      <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                        aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 
                          2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold text-white-900" id="modal-title">
                        {modalData.type === 'remove' 
                          ? 'Eliminar objeto'
                          : 'Vaciar carro'
                        }
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-400">
                          {modalData.type === 'remove' 
                            ? '¿Estás seguro de que quieres eliminar el objeto?'
                            : '¿Estás seguro de que quieres vaciar el carro?'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className="inline-flex w-full justify-center rounded-md bg-red-600 
                      px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 
                      sm:ml-3 sm:w-auto"
                    name="Eliminar"
                    onClick={() => handleClick(modalData.type)}
                    >Eliminar</button>
                  <button 
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white 
                    px-3 py-2 text-sm text-black font-semibold text-white-900 shadow-sm 
                    ring-gray-400 hover:bg-gray-400 sm:mt-0 sm:w-auto"
                    onClick={() => handleClick()}
                    >Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default WarningModal