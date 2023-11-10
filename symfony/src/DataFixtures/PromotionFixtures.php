<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Promotion;
use Faker\Factory;

class PromotionFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();

        for ($i = 1; $i <= 5; $i++) {
            $promotion = new Promotion();
            $promotion->setPromotionname($faker->word);
            $promotion->setCode($faker->word);
            $promotion->setReduction($faker->randomFloat(2, 1, 50));
            $promotion->setPercentage($faker->numberBetween(1, 50));
            $promotion->setStartdate($faker->dateTimeThisDecade);
            $promotion->setEnddate($faker->dateTimeThisDecade);
            $manager->persist($promotion);
        }

        $manager->flush();
    }
}
