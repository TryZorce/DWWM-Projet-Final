<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use App\DataFixtures\AbstractFixtures;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends AbstractFixtures
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
            $this->setReference('category_' . $i, $category);
        }

        $manager->flush();
    }
}
