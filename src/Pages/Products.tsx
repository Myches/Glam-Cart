import  { useState, useEffect} from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "../Context/cartContext";
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



export default function Products() {

 
  const { getItemQuantity , increaseItemQuantity , decreaseItemQuantity ,removeItem  }  = useCart();

  
  const navigate = useNavigate();

  const productDetails = (id:number) => {
    navigate(`/Details/${id}`);
  }


  const [features, setFeatures] = useState<Product[]>([]);

  const fetchPropertiesData = async () => {
    try {
      const response = await axios.get(
        "http://makeup-api.herokuapp.com/api/v1/products.json"
      );

      // Extract the first 15 products
      const first15Products: Product[] = response.data.slice(85, 100);

      setFeatures(first15Products);
      console.log(first15Products)
      
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  
  
   

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-8 bg-black text-gray-400 ">
      <h1 className="text-[25px] p-8 flex justify-center items-center">
        Today's Beauty Steals
      </h1>

      <Slider {...settings}>
        {features.map((data:Product, index:number) => (
          <div key={index} className="p-4 cursor-pointer hover:scale-110 transition ease-in-out "  >
            <div  onClick={() => productDetails(data.id)}>
            <img
              src={data.image_link}
              alt={data.alt}
              className="w-[500px] h-[250px] "
            />

            <p className="text-[16px]  pt-2 flex justify-center">
              {data.name}
            </p>
            <p className="text-sm  flex justify-center">
              {data.category}
            </p>

            <p className="text-sm font-bold flex justify-center">${data.price}</p>
            </div>

            { getItemQuantity(data.id) === 0 ? (
            <p className="bg-gray-400 w-[50%] mx-auto text-sm flex justify-center items-center font-bold border-black p-2 border rounded-2xl text-black cursor-pointer hover:bg-gray-600 hover:text-black"
              onClick={() => increaseItemQuantity(data.id)}
            >
            +  Add to Cart 
            </p>

            ) : 
            <div className="flex-col items-center justify-center">
              <div className="flex items-center justify-center space-x-4">
                <button className="px-4 bg-black border text-gray-400" onClick={()=>decreaseItemQuantity(data.id)}>-</button>
                <div>{getItemQuantity(data.id)} in cart</div>
                <button className="px-4 bg-black border boder-gray-500 text-gray-400" onClick={() => increaseItemQuantity(data.id)} >+</button>
              </div>
             <div className="flex items-center justify-center pt-2">
               <button className="p-2 bg-red-700 text-black font-bold border-none rounded-lg" onClick={() => removeItem (data.id)}>Remove</button> </div>
            </div>
            
            }
          </div>
        ))}
      </Slider>
      
    </div>
  );
}
