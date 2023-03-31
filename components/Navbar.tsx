import { useEffect, useState } from "react";

interface Props {
    isUser: boolean;
}

export default function Navbar({ isUser }: Props){
    const [scrollY, setScrollY] = useState<any>(0);
    let sidebar: HTMLElement | undefined;
    let body: HTMLElement | undefined;

    useEffect(() => {
        sidebar = document.querySelector(".sidebar") as HTMLElement;
        body = document.querySelector(".home") as HTMLElement;

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

    function handleClick(){
        sidebar?.classList.add("visible");
        body?.classList.add("darken");
    }

    return(
        <div className={`navbar ${scrollY !== 0 ? "navbar-show" : ""}`}>
            <img onClick={() => handleClick()} className={`hamburger ${scrollY !== 0 ? "black" : ""}`} src="/hamburger.png" />
            <img className={`logo ${scrollY !== 0 ? "black" : ""}`} src="/live-scene.png" />
            <h1 className="name"></h1>
        </div>
    )
}