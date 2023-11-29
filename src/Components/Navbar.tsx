import { useNavigate} from 'react-router-dom';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import '../index.css';
import { useCart } from '../Context/cartContext';
import Cart from '../Pages/Cart';

 


export default function Navbar() {

  
  const { openCart, cartQuantity}: any = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
 


  const navigate = useNavigate();

 

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/Search?query=${searchQuery}`);
    } else {
      // Optionally handle an empty search query error or behavior
    }
  };



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  


  return (
    
    <div className="relative border-b border-gray-400">
      <div className="flex justify-between items-center p-3 lg:h-[80px] h-[60px] text-[18px] bg-black text-gray-300 sticky top-0 left-0 right-0 w-full z-10">
        <p className="text-[18px] md:text-[25px] font-bold tracking-[5px] leading-[0.6px] lg:tracking-[10px] lg:leading-[1.1px]">
          GLAM CART
        </p>

        <ul className="space-x-6 text-[20px] nav cursor-pointer hidden lg:flex">
          
        <Link to='/'> <li>Home</li></Link> 
         <Link to='/Store'> <li>Store</li> </Link>
         <Link to='/Contact'> <li>Contact</li> </Link>
        
         
          
        </ul>

        <div className="hidden lg:flex">
          <p className="flex items-center border-b border-gray-500 text-16px"  >
            <button type="button"  onClick={handleSearch}>
              <BiSearch />
            </button>
            <input type="text"    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by brand" className="w-300px h-[40px] p-4 bg-transparent focus:outline-none" />
          </p>
          <p className="p-4 flex space-x-4">
           <button type="button">
              <BsPersonFill className='text-[22px]' />
            </button>
           
           
            
            {cartQuantity > 0 && (

              <Link to='/Cart'>
            <button type="button" onClick={openCart}   className='flex relative'>
               
                <p className='absolute right-4 top-4 border rounded-full bg-blue-900 w-[24px] text-[12px] h-[24px] p-[2px] border-none'>{cartQuantity}</p>
                <FaShoppingCart  className='text-[35px] border rounded-full p-2 '/>
              </button>
              </Link>
              
              )}
            
           
          </p> {isOpen && ( <Cart /> )}
        </div>

        <button className="lg:hidden absolute right-7 top-5 bg-White-950" onClick={toggleMenu}>
          {!isOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
        </button>
      </div>

      {isOpen && (
        <div className="bg-black w-[100%] h-[40%] flex-col flex items-center p-4 text-gray-300 z-10">
          <ul className="space-y-4 text-[14px]">
            <a href="/" onClick={toggleMenu}>
              <li className="p-2">Home</li>
            </a>
            <a href="/Store" onClick={toggleMenu}>
              <li className="p-2">Store</li>
            </a>
            <a href="/Contact" onClick={toggleMenu}>
              <li className="p-2">Contact</li>
            </a>
          </ul>

          <div className="p-4">
          
              <p className="flex items-center border-b border-gray-500 text-[16px]" >
                <button type="button" onClick={handleSearch} >
                  <BiSearch />
                </button>
                <input type="text" placeholder="Search by brand" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  className="md:w-[300px] h-[40px] p-4 bg-transparent focus:outline-none" />
              </p>
            
            <p className="p-4 flex space-x-4 flex items-center justify-center">
             
                <button type="button">
                  <BsPersonFill />
                </button>
              
              {cartQuantity > 0 && (
                <Link to='/Cart'  >
                  <button type="button" className='flex relative' onClick={openCart} >
                  <p className='absolute right-4 top-4 border rounded-full bg-blue-900 w-[24px] text-[12px] h-[24px] p-[2px] border-none'>{cartQuantity}</p>
                    <FaShoppingCart   className='text-[35px] border rounded-full p-2 '  />
                  </button>
                </Link>
               )}
            </p>{!isOpen && ( <Cart /> )}
          </div>
        </div>
      )}
    </div>
    
  );
}
