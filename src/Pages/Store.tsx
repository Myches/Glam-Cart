import { ColorRing } from 'react-loader-spinner';
import Pagination from "../Components/Pagination";
import { useCart } from "../Context/cartContext";
import  { useState , useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface Product {
  image_link: string;
  alt: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  id: number;
}

export default function Store () {


    const { getItemQuantity , increaseItemQuantity , decreaseItemQuantity ,removeItem  }  = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [postsPerPage] = useState<number>(20)
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const productDetails = (id:number) => {
      navigate(`/Details/${id}`);
    }

    const [products, setProducts] = useState<Product[]>([]);

    const fetchPropertiesData = async () => {
      try {
        const response = await axios.get(
          "https://makeup-api.herokuapp.com/api/v1/products.json"
        );
    const first15Products: Product[] = response.data.slice(430, 900);
        setProducts(first15Products);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setIsLoading(false);
        setProducts([]);
      }
    };
    
    useEffect(() => {
      fetchPropertiesData();
    }, []);





    const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter((product:Product) => product.brand === selectedCategory);




const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = filteredProducts.slice(indexOfFirstPost,indexOfLastPost)

const paginate = (pageNumber:number) =>  setCurrentPage(pageNumber)




    return (
        <div className="w-full mx-auto bg-black text-gray-400">

          
            <h1 className="pt-8 flex justify-center items-center text-xl font-bold">Recommended Products</h1>
            <ul className="lg:flex-row justify-center items-center flex flex-col lg:space-y-0 space-y-4 pt-8 lg:space-x-4 space-x-0 font-bold lg:text-md text-sm">
              <li><button className="border rounded-2xl lg:p-4 p-2 border-gray-400 hover:bg-gray-500 hover:text-black" onClick={() => setSelectedCategory('All')} >ALL PRODUCTS</button></li>
              <li><button className="border rounded-2xl lg:p-4 p-2 border-gray-400  hover:bg-gray-500 hover:text-black " onClick={() => setSelectedCategory('nyx')} >NYX</button></li>
              <li><button className="border rounded-2xl lg:p-4 p-2 border-gray-400 hover:bg-gray-500 hover:text-black" onClick={() => setSelectedCategory('maybelline')}>MAYBELLINE</button></li>
              <li><button  className="border rounded-2xl lg:p-4 p-2 border-gray-400  hover:bg-gray-500  hover:text-black"onClick={() => setSelectedCategory('smashbox')} >SMASHBOX</button></li>
              <li><button  className="border rounded-2xl lg:p-4 p-2 border-gray-400  hover:bg-gray-500  hover:text-black"onClick={() => setSelectedCategory('covergirl')} >COVERGIRL</button></li>
             


            </ul>

            {isLoading ? (

<div className='flex justify-center items-center'>
  <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="blocks-loading"
  colors={['#080808', '#D2D2D2', '#AAAAAA', '#BDBDBD', '#FFFFFFF']}
  
/>
</div> ): (



            <div className="lg:grid lg:grid-cols-4 gap-x-4 grid grid-cols-1 gap-y-4 p-12 ">
            {currentPosts.map((data:Product , index:number ) => (
          <div key={index} className="p-4 cursor-pointer hover:scale-110 transition ease-in-out  " >
            <div onClick={() => productDetails(data.id)} >
            <img
              src={data.image_link}
              alt={data.alt}
              className="w-[500px] h-[250px] border rounded-2xl  md:ml-[60px] ml-0 lg:ml-0"
            />

            <p className="text-[16px]  pt-2 flex justify-center">
              {data.name.substring (0,20)}...
            </p>
            <p className="text-sm  flex justify-center">
              {data.category}
            </p>

            <p className="text-sm font-bold flex justify-center">${data.price}</p>
            </div>

            { getItemQuantity(data.id) === 0 ? (
            <p className="bg-gray-400 w-[50%] mx-auto text-sm flex justify-center items-center font-bold border-black p-2 border rounded-2xl text-black cursor-pointer hover:bg-gray-600 hover:text-white"
              onClick={() => increaseItemQuantity(data.id)}
            >
            +  Add to Cart 
            </p>

            ) : 
            <div className="flex-col items-center justify-center">
              <div className="flex items-center justify-center space-x-4">
                <button className="px-4 bg-black border  text-gray-400" onClick={()=>decreaseItemQuantity(data.id)}>-</button>
                <div>{getItemQuantity(data.id)} in cart</div>
                <button className="px-4 bg-black border text-gray-400" onClick={() => increaseItemQuantity(data.id)} >+</button>
              </div>
             <div className="flex items-center justify-center pt-2">
               <button className="p-2 bg-red-700 text-black border-none font-bold rounded-lg" onClick={() => removeItem (data.id)}>Remove</button> </div>
            </div>
            
            }
          </div>

           ))}


          </div> )}
          <Pagination  postsPerPage={postsPerPage}  totalPosts={filteredProducts.length}  paginate={paginate}  />
   
        </div>
    )
    }