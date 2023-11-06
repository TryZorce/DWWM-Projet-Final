# Projet Final

Projet Final pour le passage du titre DWWM.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Symfony CLI](https://symfony.com/download)

## Installation

1. **Clonez le dépôt Git sur votre machine locale :**

   ```bash
   git clone https://github.com/TryZorce/Projet-Final.git

**1.1. Accédez au répertoire du projet :**


```bash
cd nom-du-projet
```
**1.2 Installez les dépendances avec Composer :**

```bash
composer install
```
**1.3 Copiez le fichier .env :**


```bash
cp .env.dist .env
```
2. **Configurez les variables d'environnement dans le fichier .env pour votre environnement local, y compris la connexion à la base de données.**
&nbsp;

**2.1 Créez la base de données et exécutez les migrations :**

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```
**2.2 Lancez le serveur de développement Symfony :**

```bash
symfony server:start
```
Le projet est maintenant accessible à l'adresse http://127.0.0.1:8000.

&nbsp;

**Utilisation**

Accédez à l'interface d'administration EasyAdmin en vous connectant à http://127.0.0.1:8000/admin et en utilisant les identifiants par défaut (s'ils ont été configurés).
## Livrables

 - [Maquette du project](https://www.figma.com/file/uZbAI26XB7qMRAzQPBHVvt/Projet-Final?type=design&node-id=0-1&mode=design&t=cSqMXKpKm5hVCNGS-0)
 - [Un dépôt Git contenant le projet au complet](https://github.com/TryZorce/Projet-Final)
 - [Trello à jour](https://trello.com/b/8gYVvwqn/projet-final)

