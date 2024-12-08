import { useState } from 'react';
import { useParams } from 'react-router-dom';

const HostingPlan: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const { id } = useParams();
  const price = id ? parseFloat(id.split("")[0]) : 0;

  let newPrice = 0;
  console.log(price);

  switch (price) {
    case 1.49:
        newPrice = 2.99;
        break;
    case 3.49:
        newPrice = 4.99;
        break;
    case 9.99:
        newPrice = 10.99;
        break;
    default:
      newPrice = price;
  }
  const plans: Record<number, { discount: number; save: number; monthlyPrice: number; renewalPrice: number; total: number }> = {
    1: { discount: 50, save: 19, monthlyPrice: price, renewalPrice: newPrice, total: price*12},
    2: { discount: 50, save: 37, monthlyPrice: price, renewalPrice: newPrice*0.8498, total: price*24 },
    3: { discount: 50, save: 55, monthlyPrice: price, renewalPrice: newPrice*0.8498, total: price*36 },
  };

  const handlePlanChange = (years: number) => {
    setSelectedPlan(years);
  };

  const selected = plans[selectedPlan];

  return (
    <div className="flex flex-col w-full mx-auto p-6 bg-gray-50 rounded-lg shadow-md md:flex-row">
     <div className="flex flex-col items-center justify-between flex-1 md:flex-[2]">
     <h2 className="text-xl font-semibold mb-4 text-start w-full">Choisissez votre durée</h2>
      <h3 className="text-lg font-medium mb-6 text-gray-700 text-start w-full">Hébergement BTR Perso</h3>
      <div className="space-y-4 w-full">
        {[1, 2, 3].map((years) => (
          <label 
            key={years} 
            className={`block p-4 border rounded-lg cursor-pointer ${
              selectedPlan === years ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <input
                type="radio"
                name="duration"
                value={years}
                checked={selectedPlan === years}
                onChange={() => handlePlanChange(years)}
                className="form-radio text-blue-600"
              />
              <div className="ml-4 text-lg font-medium">{years} an{years > 1 ? 's' : ''}</div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-semibold">
              -{plans[years].discount}% Économisez {plans[years].save}€ !
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span className="font-medium text-black">{plans[years].renewalPrice-(plans[years].renewalPrice*0.3)} €</span>/mois
            </div>
            <div className="text-sm text-gray-500">Prix renouvellement: {plans[years].renewalPrice} €/mois</div>
            <div className="mt-1 text-sm text-gray-600 flex items-center">
              <span role="img" aria-label="gift" className="mr-1">🎁</span> 
              Nom de domaine gratuit 1 an avec protection Whois
            </div>
          </label>
        ))}
      </div>
     </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg h-fit flex-1">
        <h3 className="text-lg font-semibold mb-2">Récapitulatif</h3>
        <div className="text-sm text-gray-700">
          Hébergement BTR Perso - {selectedPlan} an{selectedPlan > 1 ? 's' : ''}
        </div>
        <div className="text-sm text-gray-500 mt-1">Total HT: {selected.total.toFixed(2)} €</div>
        <div className="text-sm text-gray-500">Taxes: 0,00 €</div>
        <div className="mt-2 text-lg font-semibold text-blue-600">Total TTC: {selected.total.toFixed(2)} €</div>
        <div className="text-sm text-green-600 font-semibold">Votre remise: -{plans[selectedPlan].save}€</div>
        <button className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600">
          Continuer ma commande
        </button>
      </div>
    </div>
  );
};

export default HostingPlan;
