<?php
namespace App\DataFixtures;

use App\DataFixtures\AbstractFixtures;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Message;

class MessageFixtures extends AbstractFixtures
{
    public function load(ObjectManager $manager)
    {
        $messageData = [
            [
                'MessageContent' => 'Contenu du message 1',
                'DateTimeSent' => new \DateTime('2023-01-15 10:00:00'),
                'Attachment' => 'attachment1.txt',
                'Title' => 'Message 1',
            ],
            [
                'MessageContent' => 'Contenu du message 2',
                'DateTimeSent' => new \DateTime('2023-02-20 15:30:00'),
                'Attachment' => 'attachment2.jpg',
                'Title' => 'Message 2',
            ],
            // Ajoutez d'autres messages ici
        ];

        foreach ($messageData as $data) {
            $message = new Message();
            $message->setMessageContent($data['MessageContent']);
            $message->setDateTimeSent($data['DateTimeSent']);
            $message->setAttachment($data['Attachment']);
            $message->setTitle($data['Title']);

            $manager->persist($message);
        }

        $manager->flush();
    }
}
