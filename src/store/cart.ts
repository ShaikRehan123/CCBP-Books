import { Book } from "@/types";
import { create } from "zustand";

type CartStore = {
  cart: Book[];
  addToCart: (item: Book) => void;
  removeFromCart: (isbn13: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item: Book) =>
    set((state: { cart: Book[] }) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (isbn13: string) =>
    set((state: { cart: Book[] }) => ({
      cart: state.cart.filter((cartItem: Book) => cartItem.isbn13 !== isbn13),
    })),
  clearCart: () => set({ cart: [] }),
}));
