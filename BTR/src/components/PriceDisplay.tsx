
const PriceDisplay = () => {
  const oldPrice = '2,99 €';
  const newPrice = '1,';

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-500 line-through text-lg">{oldPrice}</span>

      <div className="flex items-baseline text-primary">
        <span className="text-5xl font-bold">{newPrice.split(',')[0]},</span>
        <span className="text-2xl font-bold relative">{newPrice.split(',')[1]} <p className='absolute bottom-4'>49</p></span>
        <span className="text-xl font-bold ml-1">€ HT/mois</span>
      </div>
    </div>
  );
};

export default PriceDisplay;
