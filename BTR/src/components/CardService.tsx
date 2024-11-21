import { Card, CardContent } from "./ui/card"

const service = [
    {
        name: "Site Web",
        image:"./service/1.png"
    },
    {
        name: "Application Web",
        image:"./service/2.webp"
    },
    {
        name: "Application Mobile",
        image:"./service/3.jpeg"
    },
    {
        name: "Application  Bureau",
        image:"./service/4.jpg"
    },
    {
        name: "Hebergement",
        image:"./service/5.webp"
    },
    {
        name: "Nom du Domaine",
        image:"./service/6.jpg"
    }
]

export {service}

function CardService() {
    
  return (
    <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 justify-center items-center justify-items-center space-x-2 space-y-6 mb-6 px-6">
        {service.map((item, idx) => {
            return ( 
                <Card key={idx} className="w-[350px] max-sm:w-[90%] h-[200px] overflow-hidden ">
                    <CardContent className="w-full h-full p-0 relative ">
                        <img src={item.image} alt={item.name}  className="object-cover h-full w-full" /> 
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] w-fit translate-y-[-50%]  px-1 py-3 text-white  rounded-full bg-primary/50 hover:shadow-2xl hover:shadow-black/35">{item.name}</div>
                    </CardContent>
                </Card>
            );
        })}
    </div>
  )
}

export default CardService