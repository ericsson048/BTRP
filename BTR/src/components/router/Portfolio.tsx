import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {BsArrowUpRight,BsGithub} from "react-icons/bs"
import {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import WorkSliderBtns from '@/components/ui/WorkSliderBtns'
import { Link } from "react-router-dom";
import axios from "axios";

interface Stack {
  id: number;
  name: string;
  project_id: number;
}

interface Project {
  id: number;
  num: string;
  category: string;
  title: string;
  description: string;
  img: string;
  live: string;
  github: string;
  stack: Stack[];
}


// const projects=[
//   {
//     num:"01",
//     category:"frontend",
//     title:"project1",
//     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in felis non neque finibus ullamcorper.",
//     img:"./work/thumb1.png",
//     stack:[{name:"html 5"},{name:"css 3"},{name:"javascript"}],
//     live:"",    
//     github:""
//   },
//   {
//     num:"02",
//     category:"fullstack",
//     title:"project2",
//     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in felis non neque finibus ullamcorper.",
//     stack:[{name:"next.js"},{name:"tailwindcss"}],
//     img:"./work/thumb2.png",
//     live:"",    
//     github:""
//   },
//   {
//     num:"03",
//     category:"fullstack",
//     title:"project3",
//     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in felis non neque finibus ullamcorper.",
//     stack:[{name:"next.js"},{name:"tailwindcss"}],
//     img:"./work/thumb3.png",
//     live:"",    
//     github:""
//   }
// ]

function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      // Get all projects
      const projectsResponse = await axios.get('http://localhost:3500/projects');
      const projects = projectsResponse.data;

      // Get all stacks
      const stacksResponse = await axios.get('http://localhost:3500/project-stacks');
      const stacks = stacksResponse.data;

      // Map projects with their stacks
      const projectsWithStacks = projects.map((project: Project) => {
        const projectStacks = stacks.filter((stack: Stack) => 
          stack.project_id === project.id
        );
        return {
          ...project,
          stack: projectStacks
        };
      });

      setProjects(projectsWithStacks);
      setProject(projectsWithStacks[0]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSliderChange = (swiper: { activeIndex: number }) => {
    const currentslide = swiper.activeIndex;
    setProject(projects[currentslide]);
  };

  if (isLoading) {
    return <div className="w-full h-full grid place-content-center text-3xl">Loading...</div>;
  }

  if (!project) {
    return <div className="w-full h-full grid place-content-center text-3xl">No projects found</div>;
  }


  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Section Expérience */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Expérience</h2>
            <p className="text-gray-600 leading-relaxed">
              Au sein de BTR, j'ai contribué à divers projets en tant que développeur web, en mettant l'accent sur la création d'applications performantes et intuitives. J'ai collaboré avec des équipes interfonctionnelles pour concevoir des solutions innovantes, optimiser les processus et garantir une expérience utilisateur de qualité.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="./experience.png"
              alt="Expérience"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-60 h-40"
            />
          </div>
        </div>
      </section>

      {/* Section Projets */}
    <div className='h-fit w-full justify-center flex flex-col p-4 xl:px-0  relative'>
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px] mb-0   justify-center relative">
          {/* Section Projet */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-center items-center order-2 xl:order-none relative">
            <div className="flex flex-col gap-[30px] h-[50%] bg-purple- justify-center items-start">
              <div className="text-8xl font-extrabold text-transparent leading-none text-outline">{parseInt(project.num) < 10 ? `0${project.num}` : project.num}</div>
              <div className="text-[42px] flex flex-col font-bold leading-none text-gray-900  transition-all duration-500 capitalize">
                {project.title}
                <p className="text-2xl text-gray-500">{project.category}</p>
              </div>
              <p className="text-gray-500">{project.description}</p>
              <ul className='flex gap-4'>
                {project.stack.map((itm, idx) => (
                  <li className="text-xl text-emerald-400" key={idx}>
                    {itm.name}
                    {idx !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className='border border-gray-950/20 bg-gray-950/20 w-full h-1'></div>
              <div className='flex items-center gap-[30px]'>
                <Link to={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-gray-400 flex justify-center items-center group'>
                        <BsArrowUpRight className="text-white text-3xl " />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link to={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-gray-400 flex justify-center items-center group'>
                        <BsGithub className="text-white text-3xl " />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>

          {/* Section Slider */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className='xl:h-[520px] mb-12 relative'
              onSlideChange={handleSliderChange}
            >
              {projects.map((itm, idx) => (
                <SwiperSlide key={idx} className='w-full'>
                  <div className="h-[460px] max-md:h-fit relative group bg-pink-50/60 flex justify-center items-center">
                    <div className='h-full w-full bg-black/10 z-10 absolute top-0 bottom-0'></div>
                    <div className="relative w-full h-full">
                      <img src={itm.img} alt='' className='object-cover' />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <WorkSliderBtns
                containerStyle='flex gap-2 items-center absolute bottom-[calc(50%)] z-20 w-full justify-between'
                buttonStyle='bg-emerald-400/50 hover:bg-emerald-400 text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all'
                iconStyle='text-white text-2xl'
              />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Portfolio;
