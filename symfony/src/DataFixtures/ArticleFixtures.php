<?php

namespace App\DataFixtures;

use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Article;

class ArticleFixtures extends AbstractFixtures implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        // Obtenez les références aux catégories depuis les fixtures de catégories
        $category1 = $this->getReference('category_0');
        $category2 = $this->getReference('category_1');

        // Obtenez la référence au panier depuis les fixtures de paniers
        $cart1 = $this->getReference('cart_0');
        $cart2 = $this->getReference('cart_1');

        $articleData = [
            [
                'Name' => 'Article 1',
                'Description' => 'Description de l\'article 1',
                'Price' => 19.99,
                'Stock' => 100,
            ],
            [
                'Name' => 'Article 2',
                'Description' => 'Description de l\'article 2',
                'Price' => 29.99,
                'Stock' => 50,
            ],
        ];

        foreach ($articleData as $data) {
            $article = new Article();
            $article
                ->setName($data['Name'])
                ->setDescription($data['Description'])
                ->setPrice($data['Price'])
                ->setStock($data['Stock']);

            // Ajouter les articles aux catégories
            $category1->addArticle($article);
            $category2->addArticle($article);

            // Ajouter les articles aux paniers
            $cart1->addArticle($article);
            $cart2->addArticle($article);

            $manager->persist($article);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [CategoryFixtures::class, CartFixtures::class];
    }
}
