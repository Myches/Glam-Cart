import { Link } from 'react-router-dom';
import Products from '../Pages/Products';


export default function HomePage () {


    return (
        <div className='bg-black text-gray-400'>
           
        <div className='w-full h-[900px] relative' style={{
            backgroundImage: `url(/images/pexels-becerra-govea-photo-5733000.jpg )`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
         
          }}>

       <div className="text-[40px] text-white  tracking-[10px] leading-[1.1] absolute top-[40%] left-[10%] space-y-8 ">
      <p className="text pb-4"> FENTY BEAUTY  </p> 
    <Link to="/Store"><button  className="p-4 text-[25px] border w-[200px]  bg-gray-600 rounded-lg text-black border-none">Shop Now</button></Link>  
       </div>
       </div>

       <div className="flex justify-center items-center   h-[500px]">
        <p className="lg:text-[25px] text-[18px] w-[70%] italic">"Unlock Your Inner Radiance : Explore a Dazzling Array of Makeup Essentials & Trends - Your Journey to Effortless Elegance Begins Here! ".</p>
       </div>

       <div className="px-8 py-[200px] lg:flex-row  lg:justify-center lg:items-center flex  flex-col justify-center items-center w-full bg-gray-500 gap-y-12 text-black">
        <div className="flex-col  lg:w-[50%] w-full">
            <div className="w-[80%] ">
                <h1 className="flex justify-center items-center p-8 text-[25px]  tracking-[10px] leading-[1.1] ">Homegrown</h1>
       <p>Discover the magic of our new UltraGlow Highlighter!  Illuminate your features with this radiant formula that gives you a stunning, dewy glow. Our finely milled pigments blend seamlessly, creating a luminous finish that lasts all day.
         Elevate your makeup game with the UltraGlow Highlighter and shine like never before! 
         
         </p>
            </div>

            <button  className=" p-4 text-[25px] border w-[300px]  bg-black rounded-lg text-gray-300 border-none mt-8 mx-auto">Find out more</button>

            </div>
        <div className="lg:w-[50%] w-full  ">
            <img src="images/pexel.jpg" alt="image"  className=" flex justify-center items-center  " />
        </div>
 
       </div>
       <Products />
       <div className="flex justify-center items-center  opacity-70" style={{
            backgroundImage: `url(/images/pexels-cottonbro-studio-10609766.jpg )`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            width : '100%',
            height:'500px'
            
          }} >
       <p className=' text text-[30px] text-white  p-12 bg-black'>GET 20% DISCOUNT OFF SELECTED ITEMS,THIS FESTIVE SEASON</p>
      </div>
        </div>
    )
}