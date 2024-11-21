import url from "../../../public/hebergement.png"
import burundi from '../../../public/Burundi.png'
import PriceCard from "../PriceCard";
import PriceDisplay from "../PriceDisplay"
import { Button } from "../ui/button";
function Hebergementweb() {

  const offers = [
    {
      title: 'BTR Perso',
      subtitle: 'Idéal pour démarrer votre site rapidement et pour les débutants',
      oldPrice: '2,99 €',
      newPrice: '1,49',
      discount: '-50%',
      ttcPrice: '1,79 €',
      features: ['1 Site web', '100 Go de stockage SSD NVMe', '1 base de données MySQL','Trafic illimité',"VCPU 6","Memoire RAM 8Go","Processus Max 45","IOPS 256Mp/s"],
      featuresS:[  '1 nom de domaine', '10 adresses email pro', 'Certificat SSL (https)',],
      featuresT:[ 'Sauvegardes gratuites'],
      url:"/hebergement-web/1,49"
    },
    {
      title: 'BTR Starter',
      subtitle: 'Tout ce dont vous avez besoin pour créer votre site web',
      oldPrice: '4,99 €',
      newPrice: '3,49',
      discount: '-30%',
      ttcPrice: '4,19 €',
      features: ['5 Sites web', '250 Go de stockage SSD NVMe', '25 bases de données MySQL', 'Trafic illimité',"VCPU 12","Memoire RAM 32Go","Processus Max 80","IOPS 512Mp/s" ],
      featuresS:[ '1 nom de domaine', '150 adresses email pro', 'Certificat SSL (https)',],
      featuresT:[ 'Sauvegardes gratuites'],
      isBestSeller: true,
      url:"/hebergement-web/3,49"
    },
    {
      title: 'BTR Performance',
      subtitle: 'Ressources doublées, idéal site d\'entreprise, agences web, ecommerce',
      oldPrice: '10,99 €',
      newPrice: '9,99',
      discount: '-9%',
      ttcPrice: '11,99 €',
      features: ['Sites web illimités', 'Espace disque SSD NVMe illimité', 'Bases de données MySQL illimitées', 'Trafic illimité',"VCPU 14","Memoire RAM 40Go","Processus Max 100","IOPS 1024Mp/s"],
      featuresS:[  '2 noms de domaine', 'Adresses email pro illimitées', 'Certificat SSL (https)'],
      featuresT:[ 'Sauvegardes gratuites', 'Assistance prioritaire'],
      url:"/hebergement-web/9.99"
    }
  ];

  const hebergement=[
    {
      img:"./nom_de_domaine.svg",
      title:"Nom de domaine offert",
      description:"Votre nom de domaine est votre identité sur la Toile. Votre nom de domaine est OFFERT. Vous avez le choix parmi les extensions les plus populaires : .fr .com .info .net .org .eu... LWS est un registrar de domaines accrédité : Icann, Afnic, DNS.BE, DNS.LU, Nominet, Eurid, Verisign..."
    },
    {
      img:"./certificat_ssl.svg",
      title:"Certificat SSL gratuit",
      description:"Protégez votre site web et gagnez la confiance de vos clients grâce au certificat SSL gratuit Let's Encrypt (https). Ce certificat rassure vos visiteurs , protège les informations sensibles des utilisateurs sur votre site web et améliore votre référencement SEO."
    },
    {
      img:"./mails_pro.svg",
      title:"Adresses mail professionnelles",
      description:"Boîtes mail pro anti-spam , anti-virus avec SMTP Premium, calendrier, Webmail (compatible smartphones) inclus. Créez sans frais de 10 à un nombre illimité d'adresses e-mail personnalisées et redirections basées sur votre domaine. Exemple: votrenom@votredomaine.fr"
    }
  ]

  const hebergement2=[
    {
      img:"./uptime.svg",
      title:"Disponibilité de 99.999% garantie",
      description:"Votre site est hébergé en parallèle sur plusieurs disques de données et serveurs haute performance. Nous vous garantissons un taux minimal de disponibilité de 99,999% ."
    },
    {
      img:"./satisfait_ou_rembourse.svg",
      title:"Satisfait ou remboursé 30 jours",
      description:"Testez sans risque : si vous n'êtes pas satisfait à 100 %, nous vous remboursons votre paiement. Aucune justification n'est nécessaire. Vous êtes garanti satisfait ou remboursé pendant 30 jours."
    },
    {
      img:"./datacenters_securises.svg",
      title:"Datacenters en France",
      description:"Nos centres de données sont situés en France et sont certifiés ISO/CEI 27001:2005. Ils assurent la sécurité et les performance de nos infrastructures: sécurité anti incendie, climatisation."
    }
  ]


  return (
    <main className="flex flex-col justify-between">
<div
  className="h-[400px] w-full p-11 max-md:p-3 flex max-[929px]:flex-col-reverse max-[929px]:h-[800px]"
>
  <div className="flex flex-col justify-between w-fit gap-3 space-y-3 flex-1">
    <h1 className="w-full font-bold text-2xl text-primary/45">Hébergement web au meilleur prix</h1>
    <p className="text-xl">Meilleur hébergeur web avec pack tout inclus !</p>
    <ul className="w-full flex flex-wrap gap-1 space-y-1">
      <li className="w-[45%] flex gap-1 items-center text-sm max-md:text-base"> <img src="https://www.lws.fr/_ui/images/theme2021/svg/check_clair.svg" className="custom-before" alt="" /> Nom de domaine <span className="text-primary/85">offert</span></li>
      <li className="w-[45%] flex gap-1 items-center text-sm max-md:text-base"><img src="https://www.lws.fr/_ui/images/theme2021/svg/check_clair.svg" className="custom-before" alt="" />Certificat SSL <span className="text-primary/85">gratuit</span></li>
      <li className="w-[45%] flex gap-1 items-center text-sm max-md:text-base"><img src="https://www.lws.fr/_ui/images/theme2021/svg/check_clair.svg" className="custom-before" alt="" /> <span className="text-primary/85">Emails</span>, bases MySQL, PHP</li>
      <li className="w-[45%] flex gap-1 items-center text-sm max-md:text-base"><img src="https://www.lws.fr/_ui/images/theme2021/svg/check_clair.svg" className="custom-before" alt="" />Stockage <span className="text-primary/85">100% SSD</span></li>
      <li className="w-[45%] flex gap-1 items-center text-sm max-md:text-base"><img src="https://www.lws.fr/_ui/images/theme2021/svg/check_clair.svg" className="custom-before" alt="" />Trafic mensuel <span className="text-primary/85">illimité</span></li>
      <li className="w-[45%] flex gap-1 items-center text-sm max-md:text-[0.7rem]"><img src="https://www.lws.fr/_ui/images/theme2021/svg/check_clair.svg" className="custom-before" alt="" />Disponibilité <span className="text-primary/85">99,999%</span>garantie</li>

    </ul>
    <div className="flex gap-4 space-x-4 mt-4">
      <PriceDisplay/>
      <div className="flex flex-col gap-3">
      <button className="py-3 px-4 w-fit text-lg font-bold text-white bg-primary hover:bg-primary/80">Voir nos offres</button>
      <p className="text-[1rem] flex gap-1 items-center bg-card py-3 px-5"><img src="https://www.lws.fr/_ui/images/theme2021/svg/check_bleu_petit.svg" className="w-4 h-5" alt="" />Votre satisfaction est notre priorite</p>
        
      </div>
    </div>
  </div>
  <div className=" flex-1 relative h-full max-[929px]:h-[300px]">
    <img src={url} alt="hebergement" className="absolute top-0 left-[50%] translate-x-[-50%] bottom-0 w-[70%] h-full" />
    <div className="flex absolute bottom-0 left-0 right-0 bg-white/85 px-5 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5">
      <div className="flex w-[50%]">
        <img src={burundi} className="w-16 h-16" alt="" />
        <p className="ml-2 text-xl text-gray-400 font-sans">Serveurs et support
        du Burundi 7J/7</p>
      </div>
      <div className="flex w-[50%] items-center">
        <img src="https://www.lws.fr/_ui/images/theme2021/svg/LWS_auto_installeur.svg" className="w-16 h-16" alt="" />
        <p className="ml-2 text-xl text-gray-400 font-sans">Logiciels de création
        de sites web inclus</p>
      </div>
    </div>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {offers.map((offer, index) => (
        <PriceCard key={index} {...offer} />
      ))}
    </div>
    <div className="p-6">
    <div className="flex w-full rounded-lg p-4 max-md:flex-col shadow-md border mb-4">
      <p className="text-center md:text-left mb-4 md:mb-0 px-4">Si vous voulez que votre site web soit enregistré sur un cPanel XL qui héberge déjà d'autres sites web, vous devrez payer 35 000 fr par an.</p>
      <Button className="w-full md:w-auto">Veuillez commander</Button>
    </div>
    </div>

    <div className="flex flex-col justify-center items-center w-full h-fit gap-3 space-y-3 bg-primary/10 py-3 px-6">
      <h1 className="text-3xl font-extrabold text-center">Inclus avec chaque hébergement web</h1>
      <p className="w-full max-w-4xl text-xl text-gray-500 ">BTR est le partenaire idéal pour les particuliers, passionnés et entreprises. La performance de nos serveurs vous permet de disposer d'une vitesse maximale pour vos projets web ! L'hébergement web BTR présente de nombreux avantages </p>
      <div className="flex flex-wrap justify-center items-center gap-3 w-full p-3">
        {hebergement.map((itm, idx) => {
          return (
            <div className="flex flex-col justify-center items-center gap-2 space-y-2 w-full sm:w-[45%] md:w-[30%] p-1" key={idx}>
              <img src={itm.img} alt="" className="w-16 h-16" />
              <h1 className="text-2xl font-extrabold text-center">{itm.title}</h1>
              <p className="text-gray-500 text-center">
                {itm.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>

    <div className="flex flex-col justify-center items-center w-full h-fit gap-3 space-y-4 my-3 py-3">
      <h1 className="text-4xl font-extrabold text-center text-primary">Hébergement web de qualité</h1>
      <div className="flex flex-wrap justify-center items-center gap-3 w-full p-3">
        {hebergement2.map((itm, idx) => {
          return (
            <div className="flex flex-col justify-center items-center gap-2 space-y-2 w-full sm:w-[45%] md:w-[30%] p-1" key={idx}>
              <img src={itm.img} alt="" className="w-16 h-16" />
              <h1 className="text-xl font-extrabold text-center text-primary">{itm.title}</h1>
              <p className="text-gray-500 text-center">
                {itm.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
</main>
  )
}

export default Hebergementweb
