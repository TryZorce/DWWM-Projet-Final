<?php
namespace App\DataFixtures;

use App\DataFixtures\AbstractFixtures;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Promotion;

class PromotionFixtures extends AbstractFixtures
{
    public function load(ObjectManager $manager)
    {
        $promotionData = [
            [
                'PromotionName' => 'Promo 1',
                'code' => 'PROMO123',
                'Reduction' => 10.0,
                'percentage' => true,
                'EndDate' => new \DateTime('2023-12-31'),
                'StartDate' => new \DateTime('2023-01-01'),
            ],
            [
                'PromotionName' => 'Promo 2',
                'code' => 'DISCOUNT456',
                'Reduction' => 5.0,
                'percentage' => false,
                'EndDate' => new \DateTime('2023-06-30'),
                'StartDate' => new \DateTime('2023-03-01'),
            ],
            // Ajoutez d'autres promotions ici
        ];

        foreach ($promotionData as $data) {
            $promotion = new Promotion();
            $promotion->setPromotionName($data['PromotionName']);
            $promotion->setCode($data['code']);
            $promotion->setReduction($data['Reduction']);
            $promotion->setPercentage($data['percentage']);
            $promotion->setEndDate($data['EndDate']);
            $promotion->setStartDate($data['StartDate']);

            $manager->persist($promotion);
        }

        $manager->flush();
    }
}
