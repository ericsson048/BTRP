const Tag = ({ label }: { label: string }) => {
  const tagStyles = {
    HOT: 'bg-red-500',
    NEW: 'bg-green-500',
    SALE: 'bg-yellow-500',
  };

  return (
    <span
      className={`ml-2 px-2 py-1 rounded text-white ${
        tagStyles[label as keyof typeof tagStyles] || 'bg-gray-500'
      }`}
    >
      {label}
    </span>
  );
};
// Reusable TableRow component
const TableRow = ({ domain, newPrice, transfer, renewal, tag, index }: { domain: string; newPrice: string; transfer: string; renewal: string; tag?: string; index: number }) => (
  <tr className={index % 2 === 0 ? 'bg-gray-50' : ''}>
    <td className="border p-2">
      {domain} {tag && <Tag label={tag} />}
    </td>
    <td className="border p-2">
      {newPrice}
      <div>1 Year</div>
    </td>
    <td className="border p-2">
      {transfer}
      <div>1 Year</div>
    </td>
    <td className="border p-2">
      {renewal}
      <div>1 Year</div>
    </td>
  </tr>
);

const DomainPricingTable = () => {
  const categories = [
    { name: 'Popular', count: 5 },
    { name: 'Business', count: 1 },
    { name: 'Geographic', count: 1 },
    { name: 'Technology', count: 2 },
    { name: 'Services', count: 1 },
    { name: 'Food and Drink', count: 1 },
    { name: 'Other', count: 6 },
  ];

  const data = [
    { domain: '.com', newPrice: '70,500.00FBU', transfer: '70,500.00FBU', renewal: '70,500.00FBU', tag: 'HOT' },
    { domain: '.net', newPrice: '70,500.00FBU', transfer: '70,500.00FBU', renewal: '70,500.00FBU' },
    { domain: '.org', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU' },
    { domain: '.biz', newPrice: '170,000.00FBU', transfer: '170,000.00FBU', renewal: '70,000.00FBU' },
    { domain: '.info', newPrice: '94,000.00FBU', transfer: '94,000.00FBU', renewal: '94,000.00FBU' },
    { domain: '.app', newPrice: '75,000.00FBU', transfer: '75,000.00FBU', renewal: '75,000.00FBU' },
    { domain: '.bi', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU', tag: 'NEW' },
    { domain: '.ong', newPrice: '100,000.00FBU', transfer: '87,000.00FBU', renewal: '87,000.00FBU' },
    { domain: '.edu.bi', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU' },
    { domain: '.dev', newPrice: '93,000.00FBU', transfer: '93,000.00FBU', renewal: '93,000.00FBU' },
    { domain: '.gov.bi', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU', tag: 'SALE' },
    { domain: '.africa', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU' },
    { domain: '.coffee', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU' },
    { domain: '.co.bi', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU' },
    { domain: '.online', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU' },
    { domain: '.org.bi', newPrice: '60,000.00FBU', transfer: '60,000.00FBU', renewal: '60,000.00FBU', tag: 'NEW' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Parcourir les extensions par catégorie</h1>

      {/* Category Tags */}
      <div className="flex space-x-2 mb-4 flex-wrap">
        {categories.map((category) => (
          <span key={category.name} className="bg-green-200 text-green-800 px-2 py-1 rounded">
            {category.name} ({category.count})
          </span>
        ))}
      </div>

      {/* Domain Pricing Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="border p-2 text-left">Domain</th>
              <th className="border p-2 text-left">New Price</th>
              <th className="border p-2 text-left">Transfer</th>
              <th className="border p-2 text-left">Renewal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={item.domain}
                domain={item.domain}
                newPrice={item.newPrice}
                transfer={item.transfer}
                renewal={item.renewal}
                tag={item.tag}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomainPricingTable;
