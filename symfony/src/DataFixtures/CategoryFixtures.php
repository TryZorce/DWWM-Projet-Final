<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends AbstractFixtures
{
    public function load(ObjectManager $manager)
    {
        $categoryData = [
            [
                'Name' => 'Bougie Gourmande',
                'Image' => "/img/Category/Category1.png"
            ],
            [
                'Name' => 'Soin Corps',
                'Image' => "/img/Category/Category2.png"
            ],
            [
                'Name' => 'Ambiance Maison',
                'Image' => "/img/Category/Category3.png"
            ],
            [
                'Name' => 'Beurre de Karité',
                'Image' => "/img/Category/Category4.png"
            ],
            [
                'Name' => 'Coffret Cadeau',
                'Image' => "/img/Category/Category5.png"
            ],
            [
                'Name' => 'Brûle Parfum et fondant',
                'Image' => "/img/Category/Category6.png"
            ],
            [
                'Name' => 'Aloé Vera Bio',
                'Image' => "/img/Category/Category7.png"
            ],
            [
                'Name' => 'Voir plus',
                'Image' => "/img/Category/VoirPlus.png"
            ],
        ];

        foreach ($categoryData as $i => $data) {
            $category = new Categorie();
            $category->setCategoryname($data['Name']);
            $category->setImage($data['Image']);

            $manager->persist($category);
            $this->setReference('category_' . $i, $category);
        }

        $manager->flush();
    }
}
