
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '../Components/Footer';
import HomePage from '../Pages/HomePage';
import Contact from './Contact';
import Store from './Store';
import Search from '../Pages/Search';
import Navbar from '../Components/Navbar';
import Cart from './Cart';
import Details from './Details';


export default function Home() {
  

  return (
    <div className='h-screen w-full'>
      <BrowserRouter>
        <Navbar  />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/Search' element={<Search  />} />
            <Route path="/Store" element={<Store />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Cart" element={<Cart />} />
            <Route  path ="/Details/:id" element={<Details />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
