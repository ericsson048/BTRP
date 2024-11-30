import { useState, useEffect } from 'react';

interface Publication {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  author?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

function Publications() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const publicationsPerPage = 3;

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3500/publications');
        if (!response.ok) {
          throw new Error('Failed to fetch publications');
        }
        const data = await response.json();
        setPublications(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const categories = ['All', 'Press Release', 'Newsletter', 'Blog', 'Gallerie', 'Video'];

  const filteredPublications = selectedCategory === 'All' || selectedCategory === ''
    ? publications
    : publications.filter(pub => pub.category === selectedCategory);

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = filteredPublications.slice(indexOfFirstPublication, indexOfLastPublication);
  const totalPages = Math.ceil(filteredPublications.length / publicationsPerPage);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-6">
        <div className="text-center">
          <p className="text-xl">Loading publications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-6">
        <div className="text-center text-red-500">
          <p className="text-xl">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="container mx-auto py-8 px-6">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            {publications.length > 0 && (
              <>
                <img src={publications[publications.length-1].image} alt={publications[publications.length-1].title} className="w-full md:w-1/2 rounded-lg"/>
                <div className="ml-0 md:ml-6 mt-4 md:mt-0">
                  <h2 className="text-2xl font-bold text-gray-800">{publications[publications.length-1].title}</h2>
                  <p className="text-gray-600 mt-4">{publications[publications.length-1].description}</p>
                  <p className="text-gray-500 mt-4">{publications[publications.length-1].category} - {publications[publications.length-1].date}</p>
                </div>
              </>
            )}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="flex flex-wrap space-x-4 w-full bg-primary justify-between items-center py-3 rounded-lg">
            {categories.map(category => (
              <button
                key={category}
                className="text-white px-4 py-2 rounded"
                onClick={() => {
                  setSelectedCategory(category === 'All' ? '' : category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blogs Recents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPublications.map((pub) => (
              <div key={pub.id} className="bg-white shadow-md rounded-lg p-4">
                <img src={pub.image} alt={pub.title} className="w-full rounded-lg mb-4"/>
                <h3 className="text-xl font-bold text-gray-800">{pub.title}</h3>
                <p className="text-gray-600 mt-2 w-full">{pub.description}</p>
                <p className="text-gray-500 mt-2">{pub.date}</p>
                {pub.author && (
                  <div className="flex items-center mb-4">
                    <img src="https://placehold.co/50x50" alt="Profile picture" className="w-12 h-12 rounded-full"/>
                    <div className="ml-4">
                      <p className="text-gray-800 font-bold">{pub.author}</p>
                      <p className="text-gray-600">Follow</p>
                    </div>
                  </div>
                )}
                {(pub.likes !== undefined || pub.comments !== undefined || pub.shares !== undefined) && (
                  <div className="flex space-x-4 text-gray-600">
                    {pub.likes !== undefined && <span><i className="fas fa-heart"></i> {pub.likes}</span>}
                    {pub.comments !== undefined && <span><i className="fas fa-comment"></i> {pub.comments}</span>}
                    {pub.shares !== undefined && <span><i className="fas fa-share"></i> {pub.shares}</span>}
                  </div>
                )}
                <a href="#" className="text-primary mt-4 block">Read more</a>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Publications;