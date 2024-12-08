import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import logo from "../../../public/WhatsApp Image 2024-09-18 at 22.58.28_13989f03.jpg"
import { buttonVariants } from "../ui/button";
import { HomeIcon, ExternalLinkIcon, PersonIcon, Pencil2Icon,  } from "@radix-ui/react-icons";
import { FaPhone } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function NavBar() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Initial check for user authentication
    checkAuthStatus();

    // Listen for authentication changes
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', checkAuthStatus);
    };
  }, []);

  const checkAuthStatus = () => {
    const userInfo = localStorage.getItem('userDetails');
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user info:', error);
        localStorage.removeItem('userDetails');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'userDetails') {
      checkAuthStatus();
    }
  };

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('userDetails');
      // Clear user state
      setUser(null);
      
      // Make API call to logout
      await fetch('http://localhost:3500/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Dispatch auth change event
      window.dispatchEvent(new Event('auth-change'));
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Card className="rounded-none  block max-[929px]:hidden">
      <CardContent className="relative flex flex-col items-center justify-center text-xl p-0 px-6 pt-3 space-y-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10 " />
            <p className="text-primary font-bold"><span className="text-red-400">Burundi</span> <span className="text-slate-400/80">en Temps </span> Réel</p>
          </div>
          <a href="tel:+25777576860" className="flex gap-3 p-2 justify-center items-center hover:bg-slate-500/10">
            +257 77576860 <FaPhone/>
          </a>
          {user ? (
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <button
                onClick={handleLogout}
                className={buttonVariants({variant:"destructive"})+"border border-black transform hover:scale-105 duration-1000"}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/log-in" className={buttonVariants({variant:"outline"})+"border border-black transform hover:scale-105 duration-1000"}>
                Login
              </Link>
              <Link to="/sign-in" className={buttonVariants({variant:"default"})+"border border-black transform hover:scale-105 duration-1000"}>
                Sign up
              </Link>
            </div>
          )}
        </div>
        <nav className=" relative flex items-center justify-between w-full p-0 gap-3 text-xl">                
          <Link to="/" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2">< HomeIcon width={20} height={20}/>Acceuil</Link>
          <Link to="/hebergement-web" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2"><Hebergement width={20} height={20}/> Hebergement</Link>
          <Link to="/nom-de-domaine" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2"><ExternalLinkIcon width={20} height={20} />Domaine</Link>
          {/* <Link to="/services" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2"><GearIcon width={20} height={20}/>Services</Link> */}
          <Link to="/notre-equipe" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2"><PersonIcon width={20} height={20}/>Notre Equipe</Link>
          <Link to="/publication" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2"><Pencil2Icon width={20} height={20}/>Publications</Link>
          <Link to="/portfolio" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2"><MyIcon width={20} height={20} />Portfolio</Link>
          <Link to="/contact" className="hover:bg-primary p-1 rounded-lg rounded-b-none hover:text-white duration-500 flex flex-col justify-center items-center gap-2"><Contacts width={20} height={20} />Contacts</Link>
        </nav>
      </CardContent>
    </Card>
  );
}

export default NavBar;
interface MyIconProps {
  width?: number;
  height?: number;
}

interface HebergementProps {
  width?: number;
  height?: number;
}

const  Hebergement:React.FC<MyIconProps>=({ width = 15, height = 15, ...props }: HebergementProps)=> {
  return (
    <svg
      viewBox="0 0 2048 2048"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M142 0h1765v2l9 1 21 6 17 7 16 9 15 11 10 9 7 6 7 8 10 13 9 15 9 19 6 18 3 12h2v1261l-2 1-6 23-6 15-8 16-7 11-9 12-9 10-9 9-10 8-15 10-21 11-21 7-19 4-20 2-261 1-1 52-3 17-5 15-8 16-7 11-9 10-12 12-15 10-19 9-18 5-15 2h-448v84l1 2 14 5 15 8 10 7 10 8 13 13 11 15 9 16 6 15v2h428l15 2 11 6 9 9 6 12 1 4v16l-4 11-7 9-7 6-12 5-6 1-433 1-5 12-8 16-8 12-11 13-10 10-17 12-17 9-19 7-15 4h-48v-2l-21-6-14-6-18-11-14-12-8-8-11-14-9-15-7-16-2-5-435-1-13-4-8-6-7-8-5-10-1-3v-18l5-12 6-8 9-7 6-2 7-1h432l3-10 8-16 6-10 10-13 6-7 8-7 10-8 13-8 15-7 10-3v-86H534l-15-2-15-4-18-8-15-10-12-11-9-9-7-10-8-14-7-17-4-20-1-13v-42H161l-21-2-22-5-20-8-19-10-14-10-14-12-9-9-11-14-9-14-9-17-6-16-7-28V143l4-15 6-20 8-18 11-18 10-13 3-4h2l2-4 8-8 11-9 13-9 14-8 18-8 24-7zm24 80l-18 2-15 5-13 7-11 9-9 9-9 14-6 13-4 18-1 26v168l5 1h756l16 2 11 6 8 8 6 12 1 4v17l-4 10-7 9-8 6-10 4-6 1-767 1-1 48v884l1 16 4 17 8 17 11 14 10 9 14 9 12 5 20 4h263l1-74 2-19 4-16 7-16 6-11 8-11 2-3-1-4-8-11-8-14-7-17-4-20-1-12v-199l2-18 4-16 7-16 6-11 12-16 9-9 12-9 15-9 15-6 16-4 23-2h954l27 2 16 4 18 8 13 8 10 8 8 7 11 14 7 11 7 15 5 16 2 14 1 49-1 169-3 16-4 13-7 16-7 11-7 9 1 5 7 9 8 14 6 14 4 13 2 14 1 54-1 164-3 16-4 13-7 16-7 11-7 9 1 5 7 9 8 14 6 14 5 19 1 8 1 84h264l16-3 13-5 14-8 11-9 9-11 7-11 6-15 3-16V432l-769-1-13-4-8-6-7-8-5-12v-18l3-8 6-10 7-6 10-5 11-2h763l2-1V159l-3-16-5-13-6-11-7-9-10-10-10-7-16-8-17-4-11-1zm378 560l-13 2-8 4-10 9-5 8-3 10-1 14v183l2 14 6 12 7 7 8 5 10 3h973l10-3 10-6 7-8 4-8 2-8V673l-4-12-6-8-8-7-9-4-12-2zm-1 352l-12 2-8 4-10 9-5 8-3 10-1 14v183l2 14 6 12 7 7 9 5 9 3h973l10-3 10-6 7-8 4-8 2-8v-205l-4-12-6-9-8-6-9-4-12-2zm0 352l-12 2-8 4-10 9-5 8-3 10-1 14v183l2 14 6 12 7 7 9 5 10 3h972l10-3 10-6 7-8 4-8 2-8v-205l-4-12-6-9-8-6-9-4-12-2zm471 513l-13 4-10 6-10 9-7 11-5 16v18l4 13 6 11 6 7 11 8 8 4 12 3h15l12-3 12-6 10-8 7-10 4-8 3-12v-17l-4-13-6-11-9-10-11-7-10-4-5-1z" />
      <path d="M647 735h330l18 2 10 5 8 7 7 11 3 11v9l-3 12-8 12-11 8-8 3-6 1H642l-9-2-8-4-8-7-7-11-3-11v-9l3-12 6-10 9-8 10-5zM647 1087h331l17 2 10 5 8 7 7 11 3 11v9l-2 9-6 11-5 5-7 6-10 4-6 1H642l-9-2-11-6-8-9-5-10-2-8v-9l3-12 6-10 9-8 10-5zM647 1439h331l17 2 10 5 8 7 7 11 3 11v9l-2 9-6 11-5 5-7 6-10 4-7 1H642l-9-2-11-6-8-9-5-10-2-8v-9l3-12 6-10 9-8 10-5zM1182 1088h17l11 4 8 6 7 8 5 10 1 4v15l-4 11-6 9-8 7-8 4-8 2h-13l-10-3-8-5-5-4-6-9-4-9-1-5v-9l3-12 6-10 7-7 12-6zM1182 736h17l11 4 8 6 7 8 5 10 1 4v15l-4 11-6 9-8 7-8 4-8 2h-13l-10-3-8-5-5-4-6-9-4-9-1-5v-9l3-12 6-10 7-7 12-6zM1182 1440h17l11 4 8 6 7 8 5 10 1 4v15l-4 11-6 9-8 7-8 4-8 2h-13l-10-3-8-5-5-4-7-11-3-7-1-6v-8l3-12 6-10 7-7 12-6zM1391 1088h18l11 4 10 8 7 10 3 8 1 10-2 13-6 11-6 7-10 6-10 3h-13l-13-4-8-6-7-8-5-11-1-3v-15l3-10 7-11h2v-2l11-7zM1392 736h17l11 4 10 8 6 8 4 11 1 9-2 13-6 11-6 7-10 6-10 3h-13l-11-3-9-6-8-9-5-11-1-3v-15l3-10 7-11 11-8 6-3zM1391 1440h18l11 4 10 8 7 10 3 9 1 9-2 13-6 11-6 7-10 6-11 3h-12l-13-4-8-6-7-8-5-11-1-3v-15l3-10 7-11h2v-2l11-7zM1015 352h18l10 4 6 4 5 5 6 8 4 11v16l-4 11-7 9-7 6-11 5-5 1h-12l-11-3-9-6-7-7-6-12-1-3v-18l5-12 6-8 9-7zM247 176h17l9 3 8 5 5 5 6 8 4 11v16l-4 11-7 9-7 6-11 5-5 1h-12l-11-3-9-6-8-9-5-10-1-3v-18l5-12 6-8 9-7zM631 176h17l9 3 9 6 5 5 6 9 3 9v16l-4 11-7 9-7 6-11 5-5 1h-12l-11-3-9-6-8-9-5-10-1-3v-18l5-12 6-8 9-7zM439 176h17l9 3 9 6 5 5 6 9 3 9v16l-4 11-7 9-7 6-11 5-5 1h-12l-11-3-9-6-8-9-5-10-1-3v-18l5-12 6-8 9-7zM1909 0l2 1z" />
    </svg>
  )
}


const MyIcon: React.FC<MyIconProps> = ({ width = 15, height = 15, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Permet de passer des props supplémentaires
    >
      <path
        d="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface ContactsProps {
  width?: number;
  height?: number;
}

const Contacts: React.FC<ContactsProps> = ({ width = 15, height = 15, ...props }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props} // Permet de passer des props supplémentaires
      >
        <path
          d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    );
  };
  
export { MyIcon,  Contacts, Hebergement };
