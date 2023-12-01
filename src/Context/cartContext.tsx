import React, { useState, useContext, ReactNode,useEffect } from 'react';
import axios from "axios";



type CartContextProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartContext = {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  cartQuantity : number
  cartItems : CartItem []
  products : Product []
};

interface Product {
  image_link: string;
  alt: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  id: number;
}




export const CartContext = React.createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);  
  const [products, setProducts] = useState<Product[]>([]);



  const fetchPropertiesData = async () => {
    try {
      const response = await axios.get(
        "https://makeup-api.herokuapp.com/api/v1/products.json"
      );

      

      setProducts(response.data);
      
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  
  

  const cartQuantity = cartItems.reduce ((quantity,item) => item.quantity + quantity,0)

  

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeItem(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{products, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem,cartItems,cartQuantity }}
    >
      {children}
    
    </CartContext.Provider>
  );
}

export default CartContextProvider;
