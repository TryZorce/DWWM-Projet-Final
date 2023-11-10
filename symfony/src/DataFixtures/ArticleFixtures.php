<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Article;
use App\Entity\Categorie;
use Faker\Factory;

class ArticleFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        $categories = $manager->getRepository(Categorie::class)->findAll();

        for ($i = 1; $i <= 5; $i++) {
            $article = new Article();
            $article->setName($faker->word);
            $article->setDescription($faker->sentence);
            $article->setPrice($faker->randomFloat(2, 10, 100));
            $article->setStock($faker->numberBetween(10, 100));

            // Ajoutez une vérification pour s'assurer que la catégorie est valide
            $category = $faker->randomElement($categories);
            if ($category instanceof Categorie) {
                $article->addCategoryId($category);
            }

            $manager->persist($article);
        }

        $manager->flush();
    }
}
