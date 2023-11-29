import {HiOutlineMail} from 'react-icons/hi'


export default function Footer ()  {
    return (
<div className="bg-gray-500 text-black p-8 text-[18px]">
        <div className="flex-col  w-[80%] mx-auto space-y-10 ">
            <p className="flex justify-center items-center text-[25px] ">Join Us</p>
            <p className=" lg:w-[60%] w-full mx-auto"> We will let you know when we have new arrivals,
             events and promo's don't worry we send them infrequently,
              just a friendly hi now and again!</p>

           <p className="flex justify-around mx-auto text-xl text-black border-b border-black lg:w-[400px] ">
         <input  type='email' placeholder="Enter your email" className=" p-2   bg-transparent focus:outline-none " />
        <button type='button'><HiOutlineMail /></button> 
            </p>   

            <div className='flex justify-center items-center space-x-6'>
                <img src='images/facebook.svg'  alt='logo'  />
                <img src='images/instagram.svg' alt='logo'  />
            </div>
 
            <ul className="lg:flex-row lg:space-x-12 lg:space-y-0 flex flex-col space-y-6 justify-center items-center">
                <li>Contact</li>
                <li>FAQ</li>
                <li>Shipping</li>
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
            </ul>

            <p className="flex  justify-center items-center p-4 text-[16px] lg:text-[18px]">@2023 glamcart.netlify.app</p>
            </div>
        </div>
    )
}