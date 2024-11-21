import React from 'react';
import { FaGift } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import {  useNavigate } from 'react-router-dom';

type PriceCardProps = {
  title?: string;
  subtitle?: string;
  oldPrice?: string;
  newPrice?: string;
  discount?: string;
  features?: string[];
  featuresS?:string[];
  featuresT?:string[];
  isBestSeller?: boolean;
  ttcPrice?: string;
  url?:string
};

const PriceCard: React.FC<PriceCardProps> = ({
  title = '',
  subtitle = '',
  oldPrice = '',
  newPrice = '',
  discount = '',
  features = [],
  featuresS=[],
  featuresT=[],
  isBestSeller = false,
  ttcPrice = '',
  url=""
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
      {isBestSeller && <div className="bg-yellow-400 text-center font-bold text-xs py-1">Best Seller</div>}
      <div className="bg-primary/85 text-white">
        <div className={`flex flex-col w-full py-3 ${isBestSeller ? 'bg-[#0c2a6a]':'bg-[#f60]'}`}>
        <h3 className={`text-2xl font-bold text-center ${isBestSeller&& "text-yellow-400"}`}>{title}</h3>
        <p className="text-center">{subtitle}</p>
        </div>
        <img src={!isBestSeller? "https://www.lws.fr/_ui/images/theme2021/svg/triangle_orange.svg":"https://www.lws.fr/_ui/images/theme2021/svg/triangle_bleu.svg"} alt="" />
        <div className="my-4 text-center">
          <span className="bg-blue-700 px-6 py-2 rounded-full text-sm">{`Offre spéciale ${discount}`}</span>
        </div>
        <div className="flex items-center space-x-2 justify-center flex-col gap-2 space-y-2 mt-5">
      <div className='flex flex-row items-center gap-2'>
      <span className="text-gray-500 line-through text-lg">{oldPrice}</span>
      <div className="flex items-baseline relative">
        <span className="text-5xl font-bold">{newPrice.split(',')[0]},</span>
        <span className="text-2xl font-bold absolute bottom-7 left-7">{newPrice.split(',')[1]}</span>
        <span className="text-xl font-bold ml-1">€ HT/mois</span>
      </div>
      </div>
      <p className="text-sm">({ttcPrice} TTC)</p>
    </div>
        <button onClick={()=>navigate(url)}  className="bg-primary text-white py-2 px-6 mt-4 w-full">Commander</button>
      </div>
      <div className="p-5">
        <h4 className="text-gray-500 font-semibold">Ressources (CPU, RAM, I/O...)</h4>
        <ul className="mt-4 text-gray-700 space-y-2">
          <div className="border-t border-slate-400 gap-3 space-y-3 py-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>{feature}</span>
            </li>
          ))}
          </div>
          <div className="border-t border-slate-400 gap-3 space-y-3 py-6">
          {featuresS.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <FaGift className="text-xl text-primary" /><span>{feature}</span>
            </li>
          ))}
          </div>
          <div className="border-t border-slate-400 gap-3 space-y-3 py-6">
          {featuresT.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <MdSecurity className="text-xl text-green-500" /><span>{feature}</span>
            </li>
          ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PriceCard;
