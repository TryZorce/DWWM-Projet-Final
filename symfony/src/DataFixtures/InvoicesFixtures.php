<?php
namespace App\DataFixtures;

use App\DataFixtures\AbstractFixtures;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Invoice;

class InvoicesFixtures extends AbstractFixtures
{
    public function load(ObjectManager $manager)
    {
        $invoiceData = [
            [
                'InvoiceDate' => new \DateTime('2023-01-15'),
                'TotalAmount' => 50.0,
                'PromotionID' => '1', // Assurez-vous de spécifier l'ID de la promotion existante
                'Carts_ID' => '1', // Assurez-vous de spécifier l'ID du panier existant
                'Carts_Promotions_ID' => '1', // Assurez-vous de spécifier l'ID du panier promotion existant
            ],
            [
                'InvoiceDate' => new \DateTime('2023-02-20'),
                'TotalAmount' => 75.0,
                'PromotionID' => '2',
                'Carts_ID' => '2',
                'Carts_Promotions_ID' => '2',
            ],
            // Ajoutez d'autres factures ici
        ];

        foreach ($invoiceData as $data) {
            $invoice = new Invoice();
            $invoice->setInvoiceDate($data['InvoiceDate']);
            $invoice->setTotalAmount($data['TotalAmount']);
            
            // Assurez-vous d'associer la facture à une promotion, un panier et une promotion de panier existants en utilisant les champs correspondants

            $manager->persist($invoice);
        }

        $manager->flush();
    }
}
