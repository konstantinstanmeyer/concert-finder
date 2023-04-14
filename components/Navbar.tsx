import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface Props {
    isUser: boolean;
    session: Session | null;
}

// displays basic information and brand logo, including handling for sidebar navigation(hamburger)
export default function Navbar({ isUser, session }: Props){
    const [scrollY, setScrollY] = useState<any>(0);
    let sidebar: HTMLElement;
    let cover: HTMLElement;
    let userInfo: HTMLElement;
    // initialize scroll event listener for the home page / grab elements after DOMContentLoaded
    useEffect(() => {
        sidebar = document.querySelector(".sidebar") as HTMLElement;
        cover = document.querySelector(".cover") as HTMLElement;
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

    async function handleGoogleSignin(){
        signIn('google', { callbackUrl: 'http://localhost:3000' })
    }

    function handleClick(){
        sidebar.classList.toggle("visible");
        cover.classList.add("display");
        userInfo?.classList.add('darken');
    }

    return(
        <div className={`navbar ${scrollY !== 0 ? "navbar-show" : ""}`}>
            <img onClick={() => handleClick()} className={`hamburger ${scrollY !== 0 ? "black" : ""}`} src="/hamburger.png" />
            <img className={`logo ${scrollY !== 0 ? "black" : ""}`} src="/LiveScene.png" />
            {/* <p className="livescene">LIVE<span className="scene">Scene</span></p> */}
            {session ?
                <div className={`name-container`}>
                    <h1 className={`name ${scrollY !== 0 ? "" : "white"}`}>Hello, {session?.user?.name?.split(' ')[0]}</h1> 
                    <Link href={`/profile`} className={`view-profile ${scrollY === 0 ? "" : "white"}`}>view profile</Link>
                </div>
                :
                <button onClick={handleGoogleSignin} className={`navbar-login ${scrollY === 0 ? "" : "invert-background"}`}>
                    <img className="google-word" src="/google.png" />
                    <p className="navbar-signin">Sign in with Google</p>
                </button>
            }
        </div>
    )
}