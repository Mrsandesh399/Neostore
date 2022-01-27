import React from 'react'

export default function Footer() {
    return (
        <>
        <footer class="bg-dark text-white pt-5 pb-4 ">
<div className='main-footer'>
<div className='container'>
<div className='row'>

   <div className='col-md-4 col-sm-6'>
   <h4> About Company</h4>
   <p>Neosoft tecnology is here to quick and easy for shopping</p>
   
   <h6>Contact Information</h6>
   <ul className='list-unstyled'>
   <li>Email:contact@neosoftmail.com</li>
   <li>Phone:+910000000000</li>
   <li>MUMBAI,INDIA</li>
   </ul>
</div>

<div className='col-md-4 col-sm-6'>
   <h4> Information</h4>
   <a href='#'> Terms and Conditions</a><br/>
   <a href='#'> Gurantee and Return Policy</a><br/>
   <a href='#'> Contact Us</a><br/>
   <a href='#'> Locate us</a><br/>


  
</div>
<div className='col-md-4 col-sm-6'>
    <h4>Newsletter</h4>
    <p>Signup to get exclusive offer from our favorite brands and to be well up in the news</p>
    
    <input type="search" placeholder='your email..'></input>
    <br></br>
    <br></br>
    <button color='white'>Subscribe</button>
</div>
   
</div>
<div className='footer-bottom'></div>
<p className='text-xs-center'>
    Copyright 2017 NeoSOFT Technology All rights reserved| Design By Sandesh Umathe
</p>


</div>

</div>
</footer>
     </>
    )
}
