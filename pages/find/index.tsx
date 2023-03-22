import Link from "next/link"

export default function Find(){
    return(
        <div className="find">
            <div className="search-row">
                <input placeholder="search for events..." className="search" />
                <Link href={true ? "/" : {} } className="image-container">
                    <img src="/magnifier.png" className="search-magnifier" />
                </Link>
            </div>
            <div className="find-container">
                <Link href="/" className="find-card">
                    <img src="" />
                    <h2></h2>
                    <p></p>
                </Link>
                <Link href="/" className="find-card">
                    <img src="/venue.png" />
                    <h2>Venues</h2>
                    <p>discover new locations to listen to your favorite artists</p>
                </Link>
                <Link href="/" className="find-card">
                    <img src="/venue.png" />
                    <h2></h2>
                    <p></p>
                </Link>
            </div>
            <div></div>
        </div>
    )
}