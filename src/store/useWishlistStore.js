import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // ১. persist ইম্পোর্ট করা হয়েছে

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],

      // উইশলিস্টে অ্যাড এবং রিমুভ (টগল) করার অ্যাকশন
      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlist.find((item) => item.id === product.id);
        
        if (exists) {
          // যদি অলরেডি উইশলিস্টে থাকে, তবে রিমুভ করে দেবে
          return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
        }
        
        // না থাকলে উইশলিস্টে নতুন প্রোডাক্ট অ্যাড করবে
        return { wishlist: [...state.wishlist, product] };
      }),

      // পুরো উইশলিস্ট একবারে খালি করার জন্য
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'classy-wishlist', // ২. ব্রাউজারের localStorage-এ এই আলাদা নামে ডাটা সেভ থাকবে
    }
  )
);