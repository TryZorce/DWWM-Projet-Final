<?php

// src/DataFixtures/CartFixtures.php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Cart;
use App\Entity\User;
use App\Entity\Article;

class CartFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $user1 = new User();
        $user1->setName('User 1');
        $manager->persist($user1);

        $user2 = new User();
        $user2->setName('User 2');
        $manager->persist($user2);

        for ($i = 1; $i <= 5; $i++) {
            $cart = new Cart();
            $cart->setQuantity($i);
            $cart->setUser($i % 2 === 0 ? $user1 : $user2);
            $manager->persist($cart);

            $article = new Article();
            $article->setName("Article $i in Cart");
            $article->setDescription("Description of Article $i in Cart");
            $article->setPrice(10.0 + $i * 5);
            $article->setStock(100 - $i * 10);
            $manager->persist($article);

            $cart->addArticle($article);
        }

        $manager->flush();
    }
}
