import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const NavigationBar = () => {

    return (
<>
<div className="NavBar ml-[-50px] h-[100px] w-full flex items-center justify-between px-[100px]">
<div className="Nav-links h-full w-[500px] flex justify-evenly items-center">
<Link to="/Home" className="Home">Home</Link>
<Link to="/AboutUs" className="AboutUs">About </Link>
<Link to="/ContactUs" className="ContactUs">Contact</Link>
<Link to="/Blog" className="Blog">Blog</Link>
<Link to="/Research" className="Research">Research</Link>
</div>
<div className="Icons flex items-center  w-[500px]"></div>
<button className="h-12 w-24 bg-[#b51616] ml-[-50px] rounded-full">Apply</button>
</div>

</>

    )
}

export default NavigationBar;