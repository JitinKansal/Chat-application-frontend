import './Avatar.css'


function Avatar() {
    
    const Images = ["./PNG/blue.png","./PNG/dark.png","./PNG/GL-bajaj-style.png","./PNG/purple.png","./PNG/red.png","./PNG/yellow.png","./ICONS/default-green.ico"];
    const rand = Math.floor(Math.random() * Images.length);
    return(
    <img className="Avatar" src={Images[rand]} alt="Avatar"></img>
    )
}

export default Avatar;