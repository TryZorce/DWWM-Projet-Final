# Projet Final

Projet Final pour le passage du titre DWWM

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Symfony CLI](https://symfony.com/download)

## Installation

1. Clonez le dépôt Git sur votre machine locale :

   ```bash
   git clone https://github.com/TryZorce/Projet-Final.git```

Accédez au répertoire du projet :
cd nom-du-projet
Installez les dépendances avec Composer :

```bash
composer install```

Copiez le fichier .env :

```bash
cp .env.dist .env```

Configurez les variables d'environnement dans le fichier .env pour votre environnement local, y compris la connexion à la base de données.

Créez la base de données et exécutez les migrations :

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate```
Lancez le serveur de développement Symfony :

```bash
symfony server:start```
Le projet est maintenant accessible à l'adresse http://127.0.0.1:8000.

Utilisation :

Accédez à l'interface d'administration EasyAdmin en vous connectant à http://127.0.0.1:8000/admin et en utilisant les identifiants par défaut (s'ils ont été configurés).
Contribution
Si vous souhaitez contribuer au projet, suivez ces étapes :

Créez une branche pour votre contribution :

bash
Copy code
git checkout -b feature/nom-de-votre-feature
Effectuez vos modifications et testez-les localement.

Soumettez une demande d'extraction (Pull Request) vers la branche main du projet.

L'équipe de développement examinera votre Pull Request et le fusionnera si tout est en ordre.


Assurez-vous de personnaliser ce modèle avec des informations spécifiques à 