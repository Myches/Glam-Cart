import './index.css'
import './App.css'

import Home from './Pages/Home';

import CartContextProvider from './Context/cartContext';





export default function App() {
  



  return (

    <CartContextProvider>
    <div  className='w-full '>
    <Home />
    </div> 
    </CartContextProvider>

  );
}