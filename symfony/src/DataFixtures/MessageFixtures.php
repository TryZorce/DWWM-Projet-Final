<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Message;
use App\Entity\User;
use Faker\Factory;

class MessageFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        $users = $manager->getRepository(User::class)->findAll();

        for ($i = 1; $i <= 5; $i++) {
            $message = new Message();
            $message->setMessagecontent($faker->paragraph);
            $message->setDatetimesent($faker->dateTimeThisDecade);
            $message->setTitle($faker->text(45)); // Génère un titre avec une longueur maximale de 50 caractères
            $message->setUserId($faker->randomElement($users));
            $manager->persist($message);
        }

        $manager->flush();
    }
}
