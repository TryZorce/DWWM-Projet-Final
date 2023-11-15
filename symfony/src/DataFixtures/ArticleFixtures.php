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
                'Image' => "/img/Article/Article1.png"
            ],
            [
                'Name' => 'Article 2',
                'Description' => 'Description de l\'article 2',
                'Price' => 29.99,
                'Stock' => 50,
                'Image' => "/img/Article/Article2.png"
            ],
            [
                'Name' => 'Article 3',
                'Description' => 'Description de l\'article 3',
                'Price' => 29.99,
                'Stock' => 50,
                'Image' => "/img/Article/Article3.png"
            ],
            [
                'Name' => 'Article 4',
                'Description' => 'Description de l\'article 4',
                'Price' => 29.99,
                'Stock' => 50,
                'Image' => "/img/Article/Article4.png"
            ],
            [
                'Name' => 'Article 5',
                'Description' => 'Description de l\'article 5',
                'Price' => 29.99,
                'Stock' => 50,
                'Image' => "/img/Article/Article5.png"
            ],
            [
                'Name' => 'Article 6',
                'Description' => 'Description de l\'article 6',
                'Price' => 29.99,
                'Stock' => 50,
                'Image' => "/img/Article/Article6.png"
            ],
            [
                'Name' => 'Article 7',
                'Description' => 'Description de l\'article 7',
                'Price' => 29.99,
                'Stock' => 50,
                'Image' => "/img/Article/Article7.png"
            ],
            [
                'Name' => 'Article 8',
                'Description' => 'Description de l\'article 8',
                'Price' => 29.99,
                'Stock' => 50,
                'Image' => "/img/Article/Article8.png"
            ],
        ];

        foreach ($articleData as $data) {
            $article = new Article();
            $article
                ->setName($data['Name'])
                ->setDescription($data['Description'])
                ->setPrice($data['Price'])
                ->setStock($data['Stock'])
                ->setImage($data['Image']);

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
