<?php

namespace App\DataFixtures;

use App\Entity\Article;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Categorie;
use Faker\Factory;

class CategorieFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        $categories = [];

        for ($i = 1; $i <= 5; $i++) {
            $categorie = new Categorie();
            $categorie->setCategoryname($faker->word);
            $manager->persist($categorie);
            $categories[] = $categorie;
        }

        $manager->flush();

        $this->generateArticleFixtures($manager, $categories);
    }

    private function generateArticleFixtures(ObjectManager $manager, array $categories)
    {
        $faker = Factory::create();

        foreach ($categories as $categorie) {
            for ($i = 1; $i <= 5; $i++) {
                $article = new Article();
                $article->setName($faker->word);
                $article->setDescription($faker->sentence);
                $article->setPrice($faker->randomFloat(2, 10, 100));
                $article->setStock($faker->numberBetween(10, 100));
                $article->addCategoryId($categorie);
                $manager->persist($article);
            }
        }

        $manager->flush();
    }
}
