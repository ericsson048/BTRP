import { Link } from "react-router-dom"
import DomainPricingTable from "../DomainPricingTable"
import PricingGrid from "../FeatureList"
import { Button } from "../ui/button"
import DomainTransferForm from "../DomainTransferForm"
import { useState } from 'react';

function Nomdedomaine() {
  const [Open, setOpen] = useState(false)
  return (
    <main >
      <PricingGrid/>
        <div className="bg-gray-300 text-white p-4 mt-4">
            <div className="container mx-auto">
                <h2 className="text-xl font-bold">Trouver et enregistrer un nom de domaine :</h2>
                <div className="flex items-center mt-2 flex-wrap">
                    <span className="bg-white text-black px-4 py-2 rounded-l-lg">WWW.</span>
                    <input type="text" className="flex-grow min-w-0 px-4 py-2" placeholder="mon-nom-de-do" />
                    <span className="bg-white text-black px-4 py-2">.com</span>
                    <button className="bg-primary text-white px-4 py-2 rounded-r-lg">Rechercher</button>
                </div>
            </div>
        </div>
        <DomainPricingTable/>
        <div className="flex p-4 justify-center items-center w-full gap-3 max-md:flex-col">
          <Link to="/hebergement-web" className="border p-3 gap-3 space-y-3 rounded-lg">
            <div className="flex justify-center items-center gap-2">
            <div className="flex flex-col">
            <h1 className="text-2xl font-mono">Ajouter un hébergement Web</h1>
            <p className="text-primary/50">Choisissez parmi une gamme de forfaits d'hébergement Web</p>
            </div>
            <img src="./cloud hosting.png" alt="host" className="w-24 h-24" />
            </div>
            <p>Nous avons des forfaits conçus pour s'adapter à tous les budgets</p>
            <Button className="max-md:w-full">Découvrez le package maintenant</Button>
          </Link>

          <div className="border p-3 gap-3 space-y-3 rounded-lg" onClick={()=>setOpen(!Open)}>
            <div className="flex justify-center items-center gap-2">
            <div className="flex flex-col">
            <h1 className="text-2xl font-mono">Transférez-nous votre domaine</h1>
            <p className="text-primary/50">Transférez maintenant pour prolonger votre domaine d'un an !*</p>
            </div>
            <img src="./domaine.png" alt="host" className="w-24 h-24" />
            </div>
            <p className="text-gray-400">* Excludes certain TLDs and recently renewed domains</p>
            <Button className="max-md:w-full">Transférer un domaine</Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
        <DomainTransferForm className={Open ? "" : "hidden"}/>
        </div>
    </main>
  )
}

export default Nomdedomaine
