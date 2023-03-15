import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image"

export default function Login(){
    const {data: session} = useSession();

    if(session){
        return (
            <div>
                Welcome, {`${session.user?.name}`}
                <img src={session.user?.image as string | undefined} />
                <button onClick={() => signOut()}>Sign Out</button>
            </div> 
        )
    } else {
        return(
            <div>
                <p>not signed in</p>
                <button onClick={() => signIn()}>sign in</button>
            </div>
        )
    }
}