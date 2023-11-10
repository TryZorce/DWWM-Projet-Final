<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use Faker\Factory;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();

        for ($i = 1; $i <= 5; $i++) {
            $user = new User();
            $user->setRoles(['ROLE_USER']);
            $user->setPassword($faker->password);
            $user->setName($faker->name);
            $user->setEmail($faker->email);
            $user->setPhone($faker->numberBetween(1000000000, 9999999999));
            $user->setGdpr($faker->dateTimeThisCentury);
            $manager->persist($user);
        }

        $manager->flush();
    }
}
