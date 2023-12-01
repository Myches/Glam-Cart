import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/cartContext';
import { ColorRing } from 'react-loader-spinner';

interface Product {
  image_link: string;
  alt: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  id: number;
  description: string;
}

export default function Details() {
  const { id } = useParams();
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart();

  const [details, setDetails] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPropertiesData = async () => {
    try {
      const response = await axios.get(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`);
      const data: Product = response.data;

      setDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      setIsLoading(false);
      setDetails(null);
    }
  };

  useEffect(() => {
    fetchPropertiesData();
  }, [id]);

  return (
    <div className='w-full bg-black text-gray-400 lg:h-[100vh] h-[100%]  flex justify-center items-center '>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <ColorRing
            height={100}
            width={100}
            ariaLabel='blocks-loading'
            colors={['#080808', '#D2D2D2', '#AAAAAA', '#BDBDBD', '#FFFFFF']}
          />
        </div>
      ) : (
        <div>
          {details && (
            <div className='p-8  lg:grid lg:grid-cols-2  grid grid-cols-1 gap-y-4'>
              <img
                src={details.image_link}
                alt={details.alt}
                className='w-[500px] h-[250px] border rounded-2xl'
              />

              <div className='m-8 space-y-4'>
              <p className='text-[16px] pt-2 flex justify-center font-bold'>{details.name}</p>
              <p className='text-sm font-bold flex justify-center'>{details.description.substring (0,700)}...</p>
              <p className='text-sm flex justify-center font-bold'>Category : {details.category}</p>
              <p className='text-sm flex justify-center font-bold'>Brand : {details.brand}</p>
              <p className='text-sm font-bold flex justify-center font-bold'>Price : ${details.price}</p>
              {getItemQuantity(details.id) === 0 ? (
                <p
                  className='bg-gray-400 w-[50%] mx-auto text-sm flex justify-center items-center font-bold border-black p-2 border rounded-2xl text-black cursor-pointer hover:bg-gray-600 hover:text-white'
                  onClick={() => increaseItemQuantity(details.id)}
                >
                  + Add to Cart
                </p>
              ) : (
                <div className='flex-col items-center justify-center'>
                  <div className='flex items-center justify-center space-x-4'>
                    <button className='px-4 bg-black border text-gray-400' onClick={() => decreaseItemQuantity(details.id)}>-</button>
                    <div>{getItemQuantity(details.id)} in cart</div>
                    <button className='px-4 bg-black border text-gray-400' onClick={() => increaseItemQuantity(details.id)}>+</button>
                  </div>
                  <div className='flex items-center justify-center pt-2'>
                    <button className='p-2 bg-red-700 text-black border-none font-bold rounded-lg' onClick={() => removeItem(details.id)}>Remove</button>
                  </div>
                </div>
              )}
            </div></div>
          )}
        </div>
      )}
    </div>
  );
}
