import React from "react";
import {Link} from "react-router-dom";


const NavigationBar = () => {

    return (
<>
<div className="Nav-Bar">
<div className="Nav-links ">
<Link to="/Home" className="Home">Home</Link>
<Link to="/AboutUs" className="AboutUs">About US</Link>
<Link to="/ContactUs" className="ContactUs">Contact Us</Link>
<Link to="/Blog" className="Blog">Blog</Link>
<Link to="/Research" className="Research">Research</Link>
</div>
<div className="Icons"></div>
</div>

</>

    )
}

export default NavigationBar;