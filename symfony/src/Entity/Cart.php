<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\ApiFilter;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['user' => 'exact'])]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'cart_id')]
    private ?User $user = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Promotion $promotion_id = null;

    #[ORM\ManyToMany(targetEntity: Article::class, mappedBy: 'cart_id')]
    private Collection $articles;

    #[ORM\OneToMany(mappedBy: 'Cart', targetEntity: CartItem::class)]
    private Collection $Article;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->Article = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }



    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getPromotionId(): ?Promotion
    {
        return $this->promotion_id;
    }

    public function setPromotionId(?Promotion $promotion_id): static
    {
        $this->promotion_id = $promotion_id;

        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): static
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->addCartId($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            $article->removeCartId($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, CartItem>
     */
    public function getArticle(): Collection
    {
        return $this->Article;
    }
}
