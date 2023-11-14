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
            5,
            4,
            3,
            28,
            39,
        ];

        foreach ($cartQuantity as $i => $quantity) {
            $cart = new Cart();
            $cart->setQuantity($quantity);
            $manager->persist($cart);
            $this->setReference('cart_' . $i, $cart);
        }

        $manager->flush();
    }
}
