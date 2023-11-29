
import { useLocation } from 'react-router-dom';
import  { useState,useEffect } from 'react';
import { useCart } from '../Context/cartContext';
import axios from "axios";
import Pagination from '../Components/Pagination';
import { ColorRing } from 'react-loader-spinner';
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



export default function Search() {
 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postsPerPage] = useState<number>(20)
  const [currentPage,setCurrentPage] = useState<number>(1)

  
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          setIsLoading(true);
          setError(null);

          const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${query}`);
          const data = response.data
          setSearchResults(data);
          setIsLoading(false);
        } catch (error:any) {
          setError(`Error fetching products: ${error.message}`);
          setSearchResults([]);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setSearchResults([]);
        setError('Please Enter a Search Query.');
      }
    };

    fetchSearchResults();
  }, [query]);

  const navigate = useNavigate();

  const productDetails = (id:number) => {
    navigate(`/Details/${id}`);
  }


  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart();
  
  
  const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = searchResults.slice(indexOfFirstPost,indexOfLastPost)

const paginate = (pageNumber:number) =>  setCurrentPage(pageNumber)


  return (
    <div className=" w-full bg-black text-gray-400">
     
     {isLoading ? (

      <div className='flex justify-center items-center'>
        <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        colors={['#080808', '#D2D2D2', '#AAAAAA', '#BDBDBD', '#FFFFFFF']}
        
      />
      </div>
      ) : error ? (
        <p>{error}</p>
      ) : (

        <div className="lg:grid grid-cols-4 gap-x-4 gid grid-cols-1 gap-y-4 p-12">
            {currentPosts.map((data:Product , index:number ) => (
          <div key={index} className="p-4 cursor-pointer hover:scale-110 transition ease-in-out"  >
            <div  onClick={() => productDetails(data.id)}>
            <img
              src={data.image_link}
              alt={data.alt}
              className="w-[500px] h-[250px] border rounded-2xl"
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

<Pagination  postsPerPage={postsPerPage}  totalPosts={searchResults.length}  paginate={paginate}  />
      </div>
  );
}