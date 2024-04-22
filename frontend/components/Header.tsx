import Image from "next/image"
import Link from "next/link"
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa"

const socials = [
  {icon: <FaYoutube />, href: '#'},
  {icon: <FaFacebook />, href: '#'},
  {icon: <FaInstagram />, href: '#'},
  {icon: <FaTwitter />, href: '#'},
]

const Header = () => {
  return (
    <header className="py-6 shadow-md">
      <div className="container mx-auto bg-yellow-300 ">
        header
      </div>
    </header>
  )
}

export default Header