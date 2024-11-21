import React from 'react';
import { FaFacebook, FaGithub, FaInstagram,  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

 

interface TeamMemberProps {
  name: string;
  title: string;
  imageUrl: string;
  socialLinks: {
    facebook: string;
    github: string;
    instagram: string;
  };
  responsibilities?:string[]
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  imageUrl,
  socialLinks,
  responsibilities
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className='min-h-[200px] max-w-md rounded-lg border md:min-w-[450px] bg-gray-500/10 h-auto'>
      <ResizablePanel defaultSize={35}
      >
      <div className="relative flex flex-col items-center rounded-lg shadow-md p-4 bg-gray-100 w-full h-full bg-primary/10">
        <img src={imageUrl} alt={name} className="absolute w-full h-full top-0" />
        <div className="flex flex-col justify-center items-center text-center absolute bottom-0 right-0 left-0 p-2 bg-white/55">
            <h3 className="text-xl font-bold text-primary mt-4">{name}</h3>
      <p className="text-gray-600 text-sm mt-1">{title}</p>
      <div className="flex flex-wrap justify-center mt-4">
        <Link
          to={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-sky-500 duration-300"
        >
          <FaFacebook className='size-7 '/>
        </Link>
        <Link
          to={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-900 duration-300 ml-4"
        >
          <FaGithub className='size-7'/>
        </Link>
        <Link
          to={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white  hover:text-pink-400 duration-300 ml-4"
        >
          <FaInstagram className='size-7'/>
        </Link>
      </div>
      </div>
      
    </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <div className="flex flex-col items-center p-3 gap-2">
          <h3 className='font-bold text-xl text-primary/55'>Responsabilités</h3>
          <div className="flex flex-col text-start w-full">
                {responsibilities?.map((item, index) => (
                <p key={index} className='text-[0.8rem] text-gray-600 max-sm:text-[0.7rem]'><span className='text-[0.9rem] text-primary'>{index}</span>.{item}</p>
              ))}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default TeamMember;
