import Link from "next/link";

interface Props {
    isUser: boolean;
}

export default function Sidebar({ isUser }: Props){
    return(
        <div className="sidebar">
            {isUser ? 
            <>
                <Link href="/signup">
                    Signup
                </Link>
                <Link href="/login">
                    Login
                </Link>
            </>: null}
            <Link href="/signup">

            </Link>
        </div>
    )
}
