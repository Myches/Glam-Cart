






export default function Contact() {


 

    return (
      <div className="m-8 ">
      
       
<div className=" mt-[100px] md:ml-20 text-gray-400 flex flex-col lg:flex lg:flex-row gap-y-12 md:flex  md:justify-between  md:items-center  mb-[200px]">


<div className="lg:w-1/3 leading-loose w-full"><p>Feel free to reach out to us. Our dedicated team of beauty enthusiasts is committed to providing you with top-notch service and assistance.

Your satisfaction is our priority, and we value your input. We can't wait to connect with you and assist you on your journey to discovering the perfect makeup essentials.</p>

<p className="md:py-6 py-4">Tel:+233(0)222222222 .</p>


OR

<p className="md:py-6 py-4">
        Email: <a href="mailto:andorfulmichaelebo@gmail.com" className='hover:text-teal-400'>glamscart@gmail.com</a>
      </p>
</div>

<div className="lg:w-1/2 w-full lg:flex-col  lg:justify-center ">

      
        <div className='flex flex-col  pb-8'>
          <label htmlFor="name">Whats your name?</label>
          <input type="text" id="name" name="name"  className="md:w-[400px]   bg-transparent focus:outline-none border-b border-gray-500  h-[40px]"  />
         
        </div>

        <div className='flex flex-col  py-8'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"  className="md:w-[400px] focus:outline-none  h-[40px] bg-transparent border-b border-gray-500 "/>
          
        </div>

        <div className='flex flex-col  pb-8'>
        <label htmlFor="message">Message</label>
          <input type="textarea" id="message" name="message" className="h-[100px] bg-transparent border-b border-gray-500 focus:outline-none "  />
          
        </div>


        <button type="submit" className='bg-gray-500 w-[80px] text-black  p-2' disabled={true} >Send</button>
      


</div>
</div>
</div>


        
    );
  }
  
  
    