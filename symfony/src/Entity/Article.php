<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]

class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    private ?int $stock = null;

    #[ORM\ManyToMany(targetEntity: Categorie::class, inversedBy: 'articles')]
    private Collection $category_id;

    #[ORM\ManyToMany(targetEntity: Cart::class, inversedBy: 'articles')]
    private Collection $cart_id;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Image = null;

    public function __construct()
    {
        $this->category_id = new ArrayCollection();
        $this->cart_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(?int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * @return Collection<int, Categorie>
     */
    public function getCategoryId(): Collection
    {
        return $this->category_id;
    }

    public function addCategoryId(Categorie $categoryId): static
    {
        if (!$this->category_id->contains($categoryId)) {
            $this->category_id->add($categoryId);
        }

        return $this;
    }

    public function removeCategoryId(Categorie $categoryId): static
    {
        $this->category_id->removeElement($categoryId);

        return $this;
    }

    /**
     * @return Collection<int, Cart>
     */
    public function getCartId(): Collection
    {
        return $this->cart_id;
    }

    public function addCartId(Cart $cartId): static
    {
        if (!$this->cart_id->contains($cartId)) {
            $this->cart_id->add($cartId);
        }

        return $this;
    }

    public function removeCartId(Cart $cartId): static
    {
        $this->cart_id->removeElement($cartId);

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->Image;
    }

    public function setImage(?string $Image): static
    {
        $this->Image = $Image;

        return $this;
    }
}
