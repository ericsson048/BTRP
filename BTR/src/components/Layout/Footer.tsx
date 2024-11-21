import { Card, CardContent, CardDescription } from '../ui/card'
import logo from "../../../public/WhatsApp Image 2024-09-18 at 22.58.28_13989f03.jpg"
import { Link } from 'react-router-dom'
import { FaGithub, FaInstagram, FaMailBulk, FaPhone, FaSearchLocation, FaTwitter, FaYoutube } from 'react-icons/fa'


function Footer() {
    const date = new Date()
  return (
    
    <Card className='rounded-none overflow-hidden'>
      <CardContent className='flex justify-between items-center shadow p-3 max-md:flex-col max-md:items-start max-md:gap-3'>
        <div className="flex w-[25%] flex-col items-center justify-center gap-4 max-md:w-[350px] max-sm:w-full ">
          <img src={logo} alt="BTR" className='w-[100px] h-[100px]' />
          <div className="flex gap-3">
            <Link to={"/"} className='text-black border p-3 rounded-full hover:bg-primary hover:text-white duration-700'><FaGithub/></Link>
            <Link to={"/"} className='text-black border p-3 rounded-full hover:bg-primary hover:text-white duration-700'><FaYoutube/></Link>
            <Link to={"/"} className='text-black border p-3 rounded-full hover:bg-primary hover:text-white duration-700'><FaInstagram/></Link>
            <Link to={"/"} className='text-black border p-3 rounded-full hover:bg-primary hover:text-white duration-700'><FaTwitter/></Link>
          </div>
          <Link to={"/contact"} className={"rounded-full w-[65%] border text-center p-2 hover:bg-primary hover:text-white duration-700"}>Contactez-Nous</Link>
        </div>
        <div className=" w-[75%] flex justify-center items-center gap-5 max-md:w-full max-sm:flex-col max-sm:items-start">
          <div className="flex flex-col h-52 w-[350px] p-3 max-sm:w-full">
            <h1 className='text-foreground'>Les Liens</h1>
            <div className='flex flex-col items-start'>
              <Link to={"/"} className={"text-foreground text-center p-2 hover:bg-slate-500/10"}>Hebergement</Link>
              <Link to={"/"} className={"text-foreground text-center p-2 hover:bg-slate-500/10"}>Nom du Domaine</Link>
              <Link to={"/"} className={"text-foreground text-center p-2 hover:bg-slate-500/10"}>Services</Link>
              <Link to={"/"} className={"text-foreground text-center p-2 hover:bg-slate-500/10"}>Conditions d'utilisation</Link>
            </div>
          </div>
          <div className="flex flex-col h-52 w-[350px] p-3 max-sm:w-full">
            <h1 className='text-foreground'>Contact</h1>
            <div className='flex flex-col items-start'>
              <Link to={"/"} className={"text-foreground flex gap-3 justify-center items-center text-center p-2 hover:bg-slate-500/10"}><FaSearchLocation/> Kiriri</Link>
              <Link to={"/"} className={"text-foreground flex gap-3 justify-center items-center text-center p-2 hover:bg-slate-500/10"}><FaPhone/> +(257) 77686800|68685800</Link>
              <Link to={"/"} className={"text-foreground flex gap-3 justify-center items-center text-center p-2 hover:bg-slate-500/10"}><FaMailBulk/> contact@btr.com</Link>
            </div>
          </div>
        </div>
      </CardContent>
        <CardDescription className='flex flex-col items-center justify-center p-3 gap-1  bg-current'>
            <p className='text-sm text-accent'> Burundi en Temps Reel &copy; {date.getFullYear()}</p>
            <p className='text-white/40'> All Right Reserved </p>
            <p className='text-white/40 max-sm:text-sm max-[400px]:text-[8px]'>Developed by Ericsson Ishaka </p>
        </CardDescription>
    </Card>
  )
}

export default Footer