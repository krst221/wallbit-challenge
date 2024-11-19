// src/test/Cart.integration.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { CartProvider } from '@/context/cart'
import Cart from '@/components/cart/Cart'
import AddItems from '@/components/utils/AddItems'

describe('Cart Integration', () => {
  const mockItem: CartItem = {
    id: 1,
    title: 'Test Product',
    price: 10,
    amount: 2,
    image: 'test.jpg'
  }

  beforeEach(() => {
    // Limpiar localStorage
    window.localStorage.clear()
    
    // Fetch mock
    global.fetch = vi.fn((): Promise<Response> =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => mockItem,
      } as Response)
    );
  })

  it('deberia de añadir un item al carro y mostrar los totales', async () => {
    render(
      <CartProvider>
        <AddItems />
        <Cart />
      </CartProvider>
    )

    // Añadir item
    const amountInput = screen.getByPlaceholderText('Ingrese cantidad')
    const idInput = screen.getByPlaceholderText('Ingrese ID')
    const addButton = screen.getByRole('button', { name: 'Añadir producto' })

    fireEvent.change(idInput, { target: { value: '1' } })
    fireEvent.change(amountInput, { target: { value: '2' } })
    fireEvent.click(addButton)

    // Espera a que se renderice el item
    const productElements = await screen.findAllByText('Test Product')
    expect(productElements.length).toBe(2)

    // Comprueba que el precio se ha actualizado
    const priceElements = await screen.findAllByText('$20.00')
    expect(priceElements.length).toBe(2)

    // Verify el total de productos
    const totalProductsElements= await screen.findByText('Total productos: 2')
    expect(totalProductsElements).toBeInTheDocument()
  })

  it('deberia de actualizar el total de items y cantidades', async () => {
    render(
      <CartProvider>
        <AddItems />
        <Cart />
      </CartProvider>
    )

    // Añadir item
    const amountInput = screen.getByPlaceholderText('Ingrese cantidad')
    const idInput = screen.getByPlaceholderText('Ingrese ID')
    const addButton = screen.getByRole('button', { name: 'Añadir producto' })

    fireEvent.change(idInput, { target: { value: '1' } })
    fireEvent.change(amountInput, { target: { value: '2' } })
    fireEvent.click(addButton)

    // Aumentar cantidad
    const increaseButton = await screen.findAllByText('+')
    fireEvent.click(increaseButton[0])

    const totalProductsElement = await screen.findByText('Total productos: 3');
    expect(totalProductsElement).toBeInTheDocument()

    const totalPriceElement = await screen.findByText('Total a pagar: $30.00');
    expect(totalPriceElement).toBeInTheDocument();
  })

  it('deberia de eliminar un item del carrito', async () => {
    render(
      <CartProvider>
        <AddItems />
        <Cart />
      </CartProvider>
    )

    // Añadir item
    const amountInput = screen.getByPlaceholderText('Ingrese cantidad')
    const idInput = screen.getByPlaceholderText('Ingrese ID')
    const addButton = screen.getByRole('button', { name: 'Añadir producto' })

    fireEvent.change(idInput, { target: { value: '1' } })
    fireEvent.change(amountInput, { target: { value: '2' } })
    fireEvent.click(addButton)

    // Darle a la X
    const removeButton = await screen.findAllByText('X')
    fireEvent.click(removeButton[0])

    // Confirmar eliminación en el modal
    const modalConfirm = screen.getByRole('button', { name: 'Eliminar' })
    fireEvent.click(modalConfirm)
    
    expect(screen.getByText(/No hay productos en el carro aún/i)).toBeInTheDocument()
  })

  it('el carrito deberia de persistir en el localStorage', async () => {
    render(
      <CartProvider>
        <AddItems />
        <Cart />
      </CartProvider>
    )

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Ingrese cantidad'), { target: { value: '1' } })
      fireEvent.change(screen.getByPlaceholderText('Ingrese ID'), { target: { value: '1' } })
      fireEvent.click(screen.getByRole('button', { name: 'Añadir producto' }))
    })

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    expect(storedCart).toHaveLength(1)
    expect(storedCart[0]).toEqual(expect.objectContaining(mockItem))
  })
})