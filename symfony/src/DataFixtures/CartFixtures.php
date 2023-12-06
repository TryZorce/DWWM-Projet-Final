<?php

namespace App\DataFixtures;

use App\DataFixtures\AbstractFixtures;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Cart;

class CartFixtures extends AbstractFixtures
{
    public function load(ObjectManager $manager)
    {
        $cartQuantity = [
        ];

        foreach ($cartQuantity as $i => $quantity) {
            $cart = new Cart();
            $manager->persist($cart);
            $this->setReference('cart_' . $i, $cart);
        }

        $manager->flush();
    }
}
