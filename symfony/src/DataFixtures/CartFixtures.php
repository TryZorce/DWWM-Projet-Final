<?php

namespace App\DataFixtures;

use App\DataFixtures\AbstractFixtures;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Cart;

class CartFixtures extends AbstractFixtures
{
    public function load(ObjectManager $manager)
    {
        $cartData = [
            [
                'Quantity' => 5,
                'Promotions_ID' => 'your_promotion_id_here', // Assurez-vous de spécifier l'ID de la promotion existante
            ],
            [
                'Quantity' => 3,
                'Promotions_ID' => 'another_promotion_id_here',
            ],
        ];

        foreach ($cartData as $data) {
            $cart = new Cart();
            $cart->setQuantity($data['Quantity']);
            $manager->persist($cart);
        }

        $manager->flush();
    }
}
