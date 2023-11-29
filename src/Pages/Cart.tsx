import { useCart } from "../Context/cartContext"
import CartItem from "./CartItem"









export default function Cart () {

         const {cartItems,products} = useCart()



         

    return (
        <div className="flex-col w-full h-full bg-black text-white" >
        

        
             <div className=" justify-center items-center w-[80%] pt-[5%] space-y-12 ">
              <h1 className="flex justify-center items-center lg:text-2xl  tracking-[10px] leading-[1.1] mx-4 ">Shopping Cart</h1>
                {cartItems.map((item:any) => (
                   <CartItem key= {item.id} {...item} />
                )
                
                
                )}
                <div className="flex-col flex justify-center items-center text-2xl font-bold pb-12">
  Total ${cartItems.reduce((total, cartItem) => {
    const item = products.find(i => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0)}
</div>

            
             </div>
        </div>

    )
    
}