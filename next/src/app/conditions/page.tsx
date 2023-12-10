import React from 'react';
import './styles.scss'; // Import the SCSS file
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';
import Link from 'next/link';

const Conditions: React.FC = () => {
  return (
    <>
      <Header />

      <div className='conditions-container'>
        <h1>Conditions Générales d'Achat</h1>

        <section>
          <h2>1. Utilisation du site</h2>
          <p>
            Bienvenue sur notre boutique en ligne dédiée aux bougies artisanales. Avant de passer votre commande,
            veuillez prendre connaissance de nos conditions d'achat :
          </p>
          <ul>
            <li>
              Notre site est destiné à la présentation et à la vente de bougies de qualité artisanale.
            </li>
            <li>
              Les informations sur nos produits peuvent être sujettes à des modifications sans préavis.
            </li>
            <li>
              Nous nous efforçons de fournir des descriptions précises, mais veuillez noter que des variations peuvent
              exister en raison de la nature artisanale de nos bougies.
            </li>
          </ul>
          <p>
            Explorez notre collection de bougies uniques, fabriquées avec soin pour créer une atmosphère chaleureuse et
            apaisante.
          </p>
        </section>

        <section>
          <h2>2. Commandes et Paiement</h2>
          <p>
            En passant une commande sur notre site, vous acceptez de fournir des informations exactes et complètes.
            Assurez-vous de vérifier soigneusement votre commande avant de procéder au paiement.
          </p>
          <p>
            Les paiements sont sécurisés, et nous acceptons différentes méthodes de paiement pour votre commodité.
          </p>
        </section>

        <section>
          <h2>3. Livraison et Retours</h2>
          <p>
            Nous faisons de notre mieux pour expédier vos bougies rapidement. Les délais de livraison peuvent varier en
            fonction de votre emplacement.
          </p>
          <p>
            En cas de problème avec votre commande, veuillez nous contacter dès que possible. Consultez notre politique
            de retours pour plus d'informations.
          </p>
        </section>
      </div>

      <div className="back-to-registration">
        <Link href="/user/register">Retour à l'inscription</Link>
      </div>
      <Footer />

    </>
  );
};

export default Conditions;