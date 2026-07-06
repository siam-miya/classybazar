// store/useCartStore.js
import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  shippingMethod: 'inside', // default 'inside' (Inside Dhaka)

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

  // কোয়ান্টিটি বাড়ানো বা কমানো
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ),
  })),

  // শিপিং মেথড (Inside/Outside Dhaka) আপডেট করা
  setShippingMethod: (method) => set({ shippingMethod: method }),
}));

export default useCartStore;