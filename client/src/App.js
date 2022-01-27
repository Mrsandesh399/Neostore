import logo from './logo.svg';
import './App.css';
import Login from "./component/Login"
import Signup from "./component/Signup"
import Forgetpassword from './component/Forgetpassword';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './component/Home';
import Changepassword from './component/Changepassword';
import Products from "./component/Products"
import Profile from './component/Profile';
import Cart from './component/Cart';
import Address from "./Profilepage/Address"
import Newpass from "./Profilepage/Newpass"
import Productdetails from './component/Productdetails';
import Order from './component/Order';
import Checkout from './component/Checkout';
import Invoice from "./component/Invoice"
import Nav1 from './component/Nav';



function App() {
  return (
    <div className="App">
  
       <Router>
       
      <Routes>
        <Route path='/' exact element={<Home/>}/> 
        <Route path='/login' exact element={<Login/>}/> 
        <Route path='/signup' exact element={<Signup/>}/> 
        <Route path='/forgetpass' exact element={<Forgetpassword/>}/> 
        <Route path='/changepass' exact element={<Changepassword/>}/> 
        <Route path='/products' exact element={<Products/>}/> 
        <Route path='/profile' exact element={<Profile/>}/> 
        <Route path='/cart' exact element={<Cart/>}/> 
        <Route path='/address' exact element={<Address/>}/> 
        <Route path='/newpass' exact element={<Newpass/>}/> 
        <Route path='/productdetail/:id' exact element={<Productdetails/>}/>
        <Route path='/order' exact element={<Order/>}/>
        <Route path='/checkout' exact element={<Checkout/>}/>
        <Route path='/invoice' exact element={<Invoice/>}/>

        
      </Routes>
    </Router> 
    </div>
  );
}

export default App;
