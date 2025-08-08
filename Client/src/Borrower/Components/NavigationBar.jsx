import React from "react";
import {Link} from "react-router-dom";


const NavigationBar = () => {

    return (
<>
<div className=" h-[100px] w-full bg-[#d9d9d9] flex items-center justify-around">
<div className="Nav-links h-full w-[500px] flex justify-evenly items-center">
<Link to="/Home" className="Home">Home</Link>
<Link to="/AboutUs" className="AboutUs">About US</Link>
<Link to="/ContactUs" className="ContactUs">Contact Us</Link>
<Link to="/Blog" className="Blog">Blog</Link>
<Link to="/Research" className="Research">Research</Link>
</div>
<div className="Icons"></div>
<button className="h-12 w-24 bg-white rounded-full">Login</button>
</div>

</>

    )
}

export default NavigationBar;