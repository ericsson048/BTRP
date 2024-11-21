import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

function FAQ() {
  return (
    <div className="w-full flex flex-col items-center justify-between p-20 max-md:px-14 max-sm:px-5">
        <h1 className='text-4xl font-bold text-center text-primary max-sm:text-2xl'>Question & Reponse</h1>
        <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">C'est quoi le Burundi en temps réel ?</AccordionTrigger>
            <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ducimus, necessitatibus a corporis consequuntur aliquam impedit ut dolorum perferendis minus ab cupiditate, aperiam excepturi aspernatur itaque laborum voluptatem
             fuga quae praesentium tempore iste repellat quos illum? Ad itaque iste asperiores, tempora praesentium est reiciendis aut exercitationem, odit sit amet, officiis commodi aperiam perferendis delectus. Tempora, consequuntur. 
            Exercitationem tempore molestias officiis accusantium soluta voluptatibus aliquid, nemo architecto!
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">Quelle est la capitale du Burundi ?</AccordionTrigger>
            <AccordionContent>
            La capitale du Burundi est Gitega.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl">Quelles langues sont parlées au Burundi ?</AccordionTrigger>
            <AccordionContent>
            Les langues officielles sont le kirundi, le français et l'anglais.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl">Quel est le climat du Burundi ?</AccordionTrigger>
            <AccordionContent>
            Le Burundi a un climat tropical avec une saison des pluies et une saison sèche.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl">Quelles sont les principales ressources naturelles du Burundi ?</AccordionTrigger>
            <AccordionContent>
            Le Burundi est riche en ressources comme le café, le thé et les minerais.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
            <AccordionTrigger className="text-xl">Comment est la culture burundaise ?</AccordionTrigger>
            <AccordionContent>
            La culture burundaise est riche en traditions, musique et danses folkloriques.
            </AccordionContent>
        </AccordionItem>
        </Accordion>

    </div>
  )
}

export default FAQ