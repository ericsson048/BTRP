// Reusable PriceCard component
const PriceCard = ({ domain, originalPrice, discountedPrice }: { domain: string; originalPrice: string; discountedPrice: string }) => (
  <div className="bg-gray-400 text-white p-4 rounded-lg text-center">
    <div className="text-2xl font-bold">{domain}</div>
    <div className="text-xl line-through">{originalPrice}Fbu</div>
    <div className="text-3xl font-bold">{discountedPrice}Fbu</div>
    <div className="text-sm">HT/an</div>
  </div>
);

// Reusable FeatureList component
const FeatureList = () => (
  <div className="bg-primary text-white p-4 rounded-lg flex justify-center items-center flex-col mt-4">
    <h2 className="text-xl font-bold text-start w-full">Inclus :</h2>
    <ul className="py-3">
      <li>2 adresses e-mails</li>
      <li>Hébergement 2Go</li>
      <li>Redirection web</li>
      <li>Création de site</li>
      <li>Whois protection</li>
      <li>Gest DNS avancée</li>
    </ul>
  </div>
);

const PricingGrid = () => {
  // Data for domains and prices
  const domainPricing = [
    { domain: '.com', originalPrice: '9,999', discountedPrice: '7,999' },
    { domain: '.xyz', originalPrice: '10,999', discountedPrice: '1,999' },
    { domain: '.eu', originalPrice: '6,999', discountedPrice: '4,999' },
    { domain: '.net', originalPrice: '9,999', discountedPrice: '8,999' },
    { domain: '.fr', originalPrice: '6,999', discountedPrice: '4,999' },
    { domain: '.be', originalPrice: '6,999', discountedPrice: '4,999' },
  ];

  return (
    <div className="container mx-auto mt-4 flex justify-between gap-2 px-4 max-sm:flex-col">
      {/* Pricing Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 flex-1">
        {domainPricing.map((item) => (
          <PriceCard
            key={item.domain}
            domain={item.domain}
            originalPrice={item.originalPrice}
            discountedPrice={item.discountedPrice}
          />
        ))}
      </div>

      {/* Feature List */}
      <FeatureList />
    </div>
  );
};

export default PricingGrid;
