import { useEffect, useState } from "react";

export default function Navbar(){
    const [scrollY, setScrollY] = useState<any>(0);
    let sidebar: HTMLElement | undefined;

    useEffect(() => {
        sidebar = document.querySelector(".sidebar") as HTMLElement;

        const handleScroll = () => {
            setScrollY(window.scrollY);
            console.log(scrollY);
        };

        handleScroll();
 
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    });

    return(
        <div className={`navbar ${scrollY !== 0 ? "navbar-show" : ""}`}>
            <img onClick={() => sidebar?.classList.add("visible")} className={`hamburger ${scrollY !== 0 ? "black" : ""}`} src="/hamburger.png" />
            <img className={`logo ${scrollY !== 0 ? "black" : ""}`} src="/live-scene.png" />
            <h1 className="name"></h1>
        </div>
    )
}