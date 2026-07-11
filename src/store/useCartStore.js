import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // ১. persist ইম্পোর্ট করা হয়েছে

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      shippingMethod: 'inside', 

      // কার্টে প্রোডাক্ট যোগ করা
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      // কার্ট থেকে প্রোডাক্ট রিমুভ করা
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),

      // কোয়ান্টিটি বাড়ানো বা কমানো
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      setShippingMethod: (method) => set({ shippingMethod: method }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'classybazar-shopping-cart', 
    }
  )
);