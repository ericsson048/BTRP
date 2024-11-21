import { Card, CardContent } from './ui/card'

function Mission({ reverse, title, description, image }: { reverse?: boolean; title: string; description: string; image: string }) {
  return (
    <div className='p-6 w-full flex flex-col items-center space-y-3 '>
        <h1 className='text-4xl font-bold text-center text-primary'>{title}</h1>
        <div className={`flex justify-center ${reverse ? 'flex-row-reverse' : ''} max-md:flex-col max-sm:items-center`}>
            <Card className='w-[45%] h-[400px] overflow-hidden max-md:h-[500px] max-md:w-full'>
                <CardContent className='h-full p-0 relative'>
                    <img src={image} alt="mission" className='absolute object-contain h-full w-full' />
                </CardContent>
            </Card>
            <div className='w-[45%] p-4 max-md:px-0 px-12 text-start  max-md:w-full'>
                <p className='w-full text-start  max-sm:text-xl '>{description}</p>
            </div>
        </div>
    </div>
  )
}

export default Mission