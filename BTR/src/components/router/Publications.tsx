import { useState } from 'react';

function Publications() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 3;

  const publications = [
    {
      id: 1,
      title: "L'Internet of Things (IoT)",
      description: "Contenu descriptif IoT",
      date: "Blog - Wednesday September 13, 2023",
      image: "https://placehold.co/600x400",
      category: 'Tech',
    },
    {
      id: 2,
      title: "occasion d'échanger des enjeux de transformation digitale",
      description: "Ce fut une occasion d'échanger autour des enjeux de transformation digitale au #BURundi ainsi que des défis du secteur de...",
      date: "Blog - Wednesday September 13, 2023",
      image: "https://placehold.co/600x400",
      category: 'Digital',
    },
    {
      id: 3,
      title: "Suivi-évaluation temps réel de l'exécution du budget de l'état",
      description: "Dans le cadre du projet de mise en place du Suivi-évaluation temps réel de l'exécution du budget de l'état #PTBA en mode budget programme, nos ingénieurs présentaient le module #PIP (Programme d'investissement Public) aux cadres du @FinancesBdi et des ministères sectoriels",
      date: "Blog - Wednesday September 13, 2023",
      image: "https://placehold.co/600x400",
      author: "@BTR",
      likes: 16,
      comments: 9,
      shares: 4,
      category: 'Tech',
    },
    {
      id: 4,
      title: "Nouvelles tendances en développement web",
      description: "Exploration des dernières tendances en matière de développement web et de technologies émergentes.",
      date: "Blog - Thursday September 14, 2023",
      image: "https://placehold.co/600x400",
      author: "@BTR",
      likes: 10,
      comments: 5,
      shares: 2,
      category: 'Tech',
    },
    {
      id: 5,
      title: "L'importance de la cybersécurité",
      description: "Pourquoi la cybersécurité est essentielle pour les entreprises modernes.",
      date: "Blog - Friday September 15, 2023",
      image: "https://placehold.co/600x400",
      author: "@BTR",
      likes: 20,
      comments: 12,
      shares: 8,
      category: 'Tech',
    },
    {
      id: 6,
      title: "Développement d'applications mobiles",
      description: "Les meilleures pratiques pour le développement d'applications mobiles.",
      date: "Blog - Saturday September 16, 2023",
      image: "https://placehold.co/600x400",
      author: "@BTR",
      likes: 15,
      comments: 7,
      shares: 3,
      category: 'Tech',
    },
    {
      id: 7,
      title: "Communiqué de presse sur la digitalisation",
      description: "Détails sur la digitalisation des services publics.",
      date: "Press Release - September 17, 2023",
      image: "https://placehold.co/600x400",
      category: 'Press Release',
    },
    {
      id: 8,
      title: "Newsletter de septembre",
      description: "Les dernières nouvelles de notre organisation.",
      date: "Newsletter - September 18, 2023",
      image: "https://placehold.co/600x400",
      category: 'Newsletter',
    },
    {
      id: 9,
      title: "Vidéo sur les tendances technologiques",
      description: "Une vidéo sur les dernières tendances en technologie.",
      date: "Video - September 19, 2023",
      image: "https://placehold.co/600x400",
      category: 'Video',
    },
  ];

  const categories = ['All', 'Press Release', 'Newsletter', 'Blog', 'Gallerie', 'Video'];

  const filteredPublications = selectedCategory === 'All' || selectedCategory === ''
    ? publications
    : publications.filter(pub => pub.category === selectedCategory);

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = filteredPublications.slice(indexOfFirstPublication, indexOfLastPublication);
  const totalPages = Math.ceil(filteredPublications.length / publicationsPerPage);

  return (
    <div>
      <main className="container mx-auto py-8 px-6">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <img src="https://placehold.co/600x400" alt="People in a meeting" className="w-full md:w-1/2 rounded-lg"/>
            <div className="ml-0 md:ml-6 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-gray-800">Réunion relative à la digitalisation fiscale</h2>
              <p className="text-gray-600 mt-4">Réunion à Kiriirangien relative à la digitalisation fiscale procédures de l'obtention du permis de bâtir ainsi que la visualisation spatiale des parcelles. MelesBurundi est résolument décidé à numériser ses archives et faciliter ainsi la tâche aux usagers des services public.</p>
              <p className="text-gray-600 mt-4">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className="text-gray-500 mt-4">Blog - 24 Septembre 2023</p>
            </div>
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
                <p className="text-gray-600 mt-2">{pub.description}</p>
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
                <div className="flex space-x-4 text-gray-600">
                  <span><i className="fas fa-heart"></i> {pub.likes}</span>
                  <span><i className="fas fa-comment"></i> {pub.comments}</span>
                  <span><i className="fas fa-share"></i> {pub.shares}</span>
                </div>
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