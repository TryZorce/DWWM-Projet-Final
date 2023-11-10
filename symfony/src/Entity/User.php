<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert; // Import de l'annotation Assert

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotNull] // Contrainte pour éviter la valeur null dans la colonne 'uuid'
    private ?string $uuid = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    private ?string $email = null;

    #[ORM\Column(length: 10)]
    private ?string $phone = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $gdpr = null;

    #[ORM\OneToMany(mappedBy: 'user_id', targetEntity: Message::class)]
    private Collection $message_id;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Cart::class)]
    private Collection $cart_id;

    public function __construct()
    {
        $this->message_id = new ArrayCollection();
        $this->cart_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): static
    {
        $this->uuid = $uuid;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->uuid;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function eraseCredentials(): void
    {
        // Si vous stockez des données temporaires sensibles, effacez-les ici
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getGdpr(): ?\DateTimeInterface
    {
        return $this->gdpr;
    }

    public function setGdpr(?\DateTimeInterface $gdpr): static
    {
        $this->gdpr = $gdpr;

        return $this;
    }

    public function getMessageId(): Collection
    {
        return $this->message_id;
    }

    public function addMessageId(Message $messageId): static
    {
        if (!$this->message_id->contains($messageId)) {
            $this->message_id->add($messageId);
            $messageId->setUserId($this);
        }

        return $this;
    }

    public function removeMessageId(Message $messageId): static
    {
        if ($this->message_id->removeElement($messageId)) {
            if ($messageId->getUserId() === $this) {
                $messageId->setUserId(null);
            }
        }

        return $this;
    }

    public function getCartId(): Collection
    {
        return $this->cart_id;
    }

    public function addCartId(Cart $cartId): static
    {
        if (!$this->cart_id->contains($cartId)) {
            $this->cart_id->add($cartId);
            $cartId->setUser($this);
        }

        return $this;
    }

    public function removeCartId(Cart $cartId): static
    {
        if ($this->cart_id->removeElement($cartId)) {
            if ($cartId->getUser() === $this) {
                $cartId->setUser(null);
            }
        }

        return $this;
    }
}
