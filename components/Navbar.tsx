import { useEffect, useState } from "react";

export default function Navbar(){
    const [scrollY, setScrollY] = useState<any>(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            console.log(scrollY)
        };

        handleScroll();
 
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    });

    return(
        <div className={`navbar ${scrollY !== 0 ? "navbar-show" : ""}`}>
            
        </div>
    )
}