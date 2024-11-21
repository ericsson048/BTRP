import { CarouselItem } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

interface CardItemProps {
  keyprop: string;
  imageprop:string;
  descriptionprop: string;
  linkprop: string;
}

function CardItem({keyprop,imageprop,linkprop,descriptionprop}: CardItemProps) {
  return (
    <CarouselItem key={keyprop} className="w-screen h-[85vh] p-0 m-0 ">
    <div className="pt-1 w-full h-full">
      <Card className="w-full h-full flex justify-center items-center rounded-none">
        <CardContent className="flex items-center justify-center p-0 w-full h-full ">
          <div className='p-0 w-full h-full relative overflow-hidden'>
          <img src={imageprop} className='w-full h-full object-cover' alt="hebergement" />
          <div className='absolute flex z-50 w-[50%] h-full top-[50%] justify-center items-center right-0 transform -translate-y-1/2 flex-col text-accent-foreground bg-slate-500/25 p-3 backdrop-blur-sm '>
            <p className="text-white text-4xl font-bold text-center text-shadow">Avec Burundi en temps reel:</p>
            <p className='text-center w-[80%] text-xl text-white font-semibold text-shadow'>{descriptionprop}</p>
            <Link className={buttonVariants({variant:'default'})+"flex justify-center items-center "} to={linkprop}><span>For more</span> <ArrowLeftIcon className="ml-2" /> </Link>          </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </CarouselItem> 
  )
}

export default CardItem