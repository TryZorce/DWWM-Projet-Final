<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CartItemRepository;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartItemRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact'])]
class CartItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $Quantity = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $Price = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $Total = null;

    #[ORM\ManyToOne(inversedBy: 'Cart')]
    private ?Article $Article = null;

    #[ORM\ManyToOne(inversedBy: 'Article')]
    private ?Cart $Cart = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->Quantity;
    }

    public function setQuantity(?int $Quantity): static
    {
        $this->Quantity = $Quantity;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->Price;
    }

    public function setPrice(?string $Price): static
    {
        $this->Price = $Price;

        return $this;
    }

    public function getTotal(): ?string
    {
        return $this->Total;
    }

    public function setTotal(?string $Total): static
    {
        $this->Total = $Total;

        return $this;
    }

    public function getArticle(): ?Article
    {
        return $this->Article;
    }

    public function setArticle(?Article $Article): static
    {
        $this->Article = $Article;

        return $this;
    }

    public function getCart(): ?Cart
    {
        return $this->Cart;
    }

    public function setCart(?Cart $Cart): static
    {
        $this->Cart = $Cart;

        return $this;
    }
}
