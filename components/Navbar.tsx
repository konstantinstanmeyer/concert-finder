import { Session } from "next-auth";
import { useEffect, useState } from "react";

interface Props {
    isUser: boolean;
    session: Session | null;
}

// displays basic information and brand logo, including handling for sidebar navigation(hamburger)
export default function Navbar({ isUser, session }: Props){
    const [scrollY, setScrollY] = useState<any>(0);
    let sidebar: HTMLElement;
    let body: HTMLElement;
    let userInfo: HTMLElement;
    // initialize scroll event listener for the home page / grab elements after DOMContentLoaded
    useEffect(() => {
        sidebar = document.querySelector(".sidebar") as HTMLElement;
        body = document.querySelector(".home") as HTMLElement;
        userInfo = document.querySelector(".name") as HTMLElement;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        handleScroll();
 
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    });

    function handleClick(){
        sidebar.classList.toggle("visible");
        body.classList.add("darken");
        userInfo.classList.add('darken')
    }

    return(
        <div className={`navbar ${scrollY !== 0 ? "navbar-show" : ""}`}>
            <img onClick={() => handleClick()} className={`hamburger ${scrollY !== 0 ? "black" : ""}`} src="/hamburger.png" />
            <img className={`logo ${scrollY !== 0 ? "black" : ""}`} src="/LiveScene.png" />
            {/* <p className="livescene">LIVE<span className="scene">Scene</span></p> */}
            <h1 className={`name ${scrollY !== 0 ? "" : "white"}`}>{session ? "Hello, " + session?.user?.name?.split(' ')[0] : ""}</h1>

        </div>
    )
}