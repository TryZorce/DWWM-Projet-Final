<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $invoicedate = null;

    #[ORM\Column]
    private ?float $totalamount = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Cart $cart_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInvoicedate(): ?\DateTimeInterface
    {
        return $this->invoicedate;
    }

    public function setInvoicedate(\DateTimeInterface $invoicedate): static
    {
        $this->invoicedate = $invoicedate;

        return $this;
    }

    public function getTotalamount(): ?float
    {
        return $this->totalamount;
    }

    public function setTotalamount(float $totalamount): static
    {
        $this->totalamount = $totalamount;

        return $this;
    }

    public function getCartId(): ?Cart
    {
        return $this->cart_id;
    }

    public function setCartId(?Cart $cart_id): static
    {
        $this->cart_id = $cart_id;

        return $this;
    }
}
