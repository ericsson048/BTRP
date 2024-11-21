import { Button } from "../ui/button";

function Contacts() {
  return (
    <div className="flex max-md:flex-col flex-row items-center justify-between p-8 bg-white">
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-2">Besoin de nous pour un projet?</h3>
        <p className="mb-6 text-gray-500">
          Pour toute question, demande de partenariat ou pour explorer comment BTR peut vous accompagner dans votre transformation numérique, n'hésitez pas à nous contacter.
        </p>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Votre Nom"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Votre Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <textarea
              placeholder="Votre Message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              rows={4}
            ></textarea>
          </div>
          <Button
            type="submit"
            className="flex items-center px-6 py-4  text-white font-bold rounded-md hover:bg-primary/55 transition duration-200"
          >
            Contactez Nous <span className="ml-2">➔</span>
          </Button>
        </form>
      </div>

      <div className="w-full h-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
        <iframe
          title="Google Maps - MediaBoX"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5077.317395913779!2d29.367177!3d-3.383765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5b9b7af0b1c6a5d4!2sMediaBoX!5e0!3m2!1sfr!2sbi!4v1635277004706!5m2!1sfr!2sbi"
          width="100%"
          height="300"
          allowFullScreen={true}
          loading="lazy"
          className="rounded-md border border-gray-300"
        ></iframe>
      </div>
    </div>
  );
}

export default Contacts