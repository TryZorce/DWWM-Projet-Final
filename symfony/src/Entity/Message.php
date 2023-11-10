<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $messagecontent = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $datetimesent = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $attachment = null;

    #[ORM\Column(length: 45)]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'message_id')]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessagecontent(): ?string
    {
        return $this->messagecontent;
    }

    public function setMessagecontent(string $messagecontent): static
    {
        $this->messagecontent = $messagecontent;

        return $this;
    }

    public function getDatetimesent(): ?\DateTimeInterface
    {
        return $this->datetimesent;
    }

    public function setDatetimesent(\DateTimeInterface $datetimesent): static
    {
        $this->datetimesent = $datetimesent;

        return $this;
    }

    public function getAttachment(): ?string
    {
        return $this->attachment;
    }

    public function setAttachment(?string $attachment): static
    {
        $this->attachment = $attachment;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }
}
