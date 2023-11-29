
import { useCart } from "../Context/cartContext"
import { TiDelete } from 'react-icons/ti';



type CartItemProps = {
    id:number,
    quantity:number
}



export default function CartItem ({id,quantity} : CartItemProps) {


   
const {removeItem , products} = useCart()



const item:any = products.find(i => i.id === id)
if (item === null) {
  return null;
}
const totalPrice = item?.price  * quantity ;


    return (   
        <div className="flex justify-center items-center w-full ">
          <div className="lg:grid grid-cols-3 gap-4 grid-grid-cols-1 m-8">
          

          <div>
            <img src={item?.image_link} alt="logo" className="w-[300px] h-[150px]"  />
            </div>
   
            
            <div className="flex-col flex justify-center items-center text-[18px]">
            <h1 className="">{item?.name.substring (0,20)}...</h1>
            {quantity > 1 && (

              <span className="flex-row ">Quantity : <span className="text-blue-900 font-bold">{quantity}x</span></span>
              
            )}    
        <p className="">Price : <span className="text-blue-900 font-bold"> ${item?.price}</span></p>
        </div>

        <div className=" flex justify-center items-center space-x-2  text-[18px]">
        <p className="font-bold ">Price Total : <span className="text-blue-800"> ${totalPrice}</span></p> 
        <button className=" border border-black p-2"  onClick={() => removeItem(item?.id)}><TiDelete /></button>
        </div>
        </div></div>
    )
    }