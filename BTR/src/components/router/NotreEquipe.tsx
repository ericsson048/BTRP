import TeamMember from "../TeamMember"

const teamMembers = [
  {
    name: "NIYOMUKIZA Varia-Coeur",
    title: "Président Directeur Général (PDG)",
    imageUrl: "./african-man.png",
    socialLinks: {
      facebook: "https://facebook.com/varia-coeur",
      github: "https://github.com/varia-coeur",
      instagram: "https://instagram.com/varia-coeur"
    },
    responsibilities: [
      "Définir et communiquer la vision et les objectifs à long terme de l'entreprise.",
      "Prendre les décisions stratégiques pour le développement de l'entreprise.",
      "Superviser la performance globale des équipes et des projets.",
      "Maintenir et développer les relations avec les principaux partenaires et investisseurs."
    ]
  },
  {
    name: "IRAKOZE Jean de Dieu",
    title: "Directeur des Opérations",
    imageUrl: "./ericsson.png",
    socialLinks: {
      facebook: "https://facebook.com/jean-de-dieu",
      github: "https://github.com/jean-de-dieu",
      instagram: "https://instagram.com/jean-de-dieu"
    },
    responsibilities: [
      "Gérer la coordination des équipes techniques et assurer une livraison efficace des projets.",
      "Garantir la qualité des produits livrés et leur adéquation avec les besoins des clients.",
      "Mettre en place des processus pour optimiser l'efficacité opérationnelle.",
      "Suivre l’avancement des projets pour assurer le respect des échéances et des normes de qualité."
    ]
  },
  {
    name: "D'el Shaddai First",
    title: "Directeur des Finances et Marketing",
    imageUrl: "./african-man.png",
    socialLinks: {
      facebook: "https://facebook.com/del-shaddai",
      github: "https://github.com/del-shaddai",
      instagram: "https://instagram.com/del-shaddai"
    },
    responsibilities: [
      "Gérer le budget et contrôler les dépenses pour maintenir la santé financière de l’entreprise.",
      "Développer des stratégies de vente et de marketing pour accroître la visibilité de la marque.",
      "Identifier et saisir de nouvelles opportunités de marché.",
      "Assurer un suivi rigoureux de la rentabilité des projets et optimiser les coûts."
    ]
  },
  {
    name: "NDAYIZEYE Télésphore",
    title: "Secrétaire Administratif",
    imageUrl: "./african-man.png",
    socialLinks: {
      facebook: "https://facebook.com/telesphore",
      github: "https://github.com/telesphore",
      instagram: "https://instagram.com/telesphore"
    },
    responsibilities: [
      "Gérer la documentation et les archives de l’entreprise avec rigueur.",
      "Assurer la communication interne en coordonnant les échanges entre les membres de l’équipe.",
      "Organiser les réunions d’équipe, prendre les notes et distribuer les comptes-rendus.",
      "Gérer la correspondance et veiller à ce que les documents officiels soient bien classés et facilement accessibles."
    ]
  }
];


function NotreEquipe() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-300/25">
      <div className="flex flex-col justify-center gap-3 items-center w-[600px] p-4 max-md:w-full">
      <h1 className="text-4xl font-extrabold  text-primary">Notre équipe</h1>
      <p className="text-xl text-center text-gray-500">
        Notre équipe est composée de personnes passionnées et expérimentées qui travaill
        illent ensemble pour atteindre nos objectifs.
      </p>
      </div>
      {/* <div className="flex flex-wrap gap-3 w-full justify-center items-center p-6 ">
        <div className="w-[300px] h-[400px] relative rounded-lg">
          <img src="https://picsum.photos/400/500" alt="image1" className="absolute w-full h-full rounded-lg"/>
          <div className="bg-black absolute right-0 left-0 bottom-0 top-0 opacity-35 rounded-lg"></div>
          <div className="absolute flex flex-col items-center justify-center gap-2 bg-white p-4 z-20 left-0 right-0 bottom-0 rounded-b-lg">
            <h2 className="text-2xl font-bold text-primary">Ishaka Ericsson</h2>
            <p className="text-xl text-gray-400">Front-end developer</p>
          </div>
        </div>

        <div className="w-[300px] h-[400px] relative rounded-lg">
          <img src="https://picsum.photos/400/500" alt="image1" className="absolute w-full h-full rounded-lg"/>
          <div className="bg-black absolute right-0 left-0 bottom-0 top-0 opacity-35 rounded-lg"></div>
          <div className="absolute flex flex-col items-center justify-center gap-2 bg-white p-4 z-20 left-0 right-0 bottom-0 rounded-b-lg">
            <h2 className="text-2xl font-bold text-primary">Ishaka Ericsson</h2>
            <p className="text-xl text-gray-400">Front-end developer</p>
          </div>
        </div>

        <div className="w-[300px] h-[400px] relative rounded-lg">
          <img src="https://picsum.photos/400/500" alt="image1" className="absolute w-full h-full rounded-lg"/>
          <div className="bg-black absolute right-0 left-0 bottom-0 top-0 opacity-35 rounded-lg"></div>
          <div className="absolute flex flex-col items-center justify-center gap-2 bg-white p-4 z-20 left-0 right-0 bottom-0 rounded-b-lg">
            <h2 className="text-2xl font-bold text-primary">Ishaka Ericsson</h2>
            <p className="text-xl text-gray-400">Front-end developer</p>
          </div>
        </div>

        <div className="w-[300px] h-[400px] relative rounded-lg">
          <img src="https://picsum.photos/400/500" alt="image1" className="absolute w-full h-full rounded-lg"/>
          <div className="bg-black absolute right-0 left-0 bottom-0 top-0 opacity-35 rounded-lg"></div>
          <div className="absolute flex flex-col items-center justify-center gap-2 bg-white p-4 z-20 left-0 right-0 bottom-0 rounded-b-lg">
            <h2 className="text-2xl font-bold text-primary">Ishaka Ericsson</h2>
            <p className="text-xl text-gray-400">Front-end developer</p>
          </div>
        </div>

        <div className="w-[300px] h-[400px] relative rounded-lg">
          <img src="https://picsum.photos/400/500" alt="image1" className="absolute w-full h-full rounded-lg"/>
          <div className="bg-black absolute right-0 left-0 bottom-0 top-0 opacity-35 rounded-lg"></div>
          <div className="absolute flex flex-col items-center justify-center gap-2 bg-white p-4 z-20 left-0 right-0 bottom-0 rounded-b-lg">
            <h2 className="text-2xl font-bold text-primary">Ishaka Ericsson</h2>
            <p className="text-xl text-gray-400">Front-end developer</p>
          </div>
        </div>


      </div> */}
      <div className="flex flex-wrap justify-center items-center gap-8 py-4 px-0 min-[769px]:px-24">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            title={member.title}
            imageUrl={member.imageUrl}
            socialLinks={member.socialLinks}
            responsibilities={member.responsibilities}
          />
        ))}
      </div>
    </div>
  )
}

export default NotreEquipe