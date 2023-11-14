<?php
namespace App\DataFixtures;

use App\DataFixtures\AbstractFixtures;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;

class UserFixtures extends AbstractFixtures
{
    public function load(ObjectManager $manager)
    {
        $userData = [
            [
                'Name' => 'John Doe',
                'Email' => 'john@example.com',
                'Phone' => '12345678',
                'Password' => 'hashed_password_here', 
                'Gdpr' => new \DateTime('2023-01-15'),
                'Messages_ID' => 'your_messages_id_here',
                'Carts_ID' => 'your_cart_id_here',
                'Carts_Promotions_ID' => 'your_cart_promotion_id_here',
            ],
            [
                'Name' => 'Jane Smith',
                'Email' => 'jane@example.com',
                'Phone' => '98765432',
                'Password' => 'another_hashed_password',
                'Gdpr' => new \DateTime('2023-02-20'),
                'Messages_ID' => 'another_messages_id_here',
                'Carts_ID' => 'another_cart_id_here',
                'Carts_Promotions_ID' => 'another_cart_promotion_id_here',
            ],
        ];

        foreach ($userData as $i => $data) {
            $user = new User();
            $user->setName($data['Name']);
            $user->setEmail($data['Email']);
            $user->setPhone($data['Phone']);
            $user->setPassword($data['Password']);
            $user->setGdpr($data['Gdpr']);
            $this->setReference('user_' . $i, $user);
            $manager->persist($user);
            
        }

        $manager->flush();
        
        
        
    }
    
}
