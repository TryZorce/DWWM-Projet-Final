<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $categoryNames = [
            'Bougie',
            'Soin du corps',
            'Parfum',
            'Maquillage',
            'Accessoires beauté',
        ];

        foreach ($categoryNames as $i => $name) {
            $category = new Categorie();
            $category->setCategoryname($name);

            $manager->persist($category);
            $this->addReference('category_' . $i, $category);
        }

        $manager->flush();
    }
}
