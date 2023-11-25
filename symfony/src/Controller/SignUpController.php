<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface      $entityManager,
        UserPasswordHasherInterface $passwordHasher,
    )
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    public function __invoke(Request $request, JWTTokenManagerInterface $JWTManager)
    {
        // Décode la requête.
        $requestContent = json_decode($request->getContent(), true);

        // Si les clés "email", "password" et "name" ne sont pas présentent dans la requête renvoie une erreur.
        if (!array_key_exists('email', $requestContent) ||
            !array_key_exists('password', $requestContent) ||
            !array_key_exists('name', $requestContent)
        ) {
            return new Response('Un problème technique est survenu, veuillez réessayer ultérieurement', 500);
        }

        $userEmail = $requestContent['email'];
        $userPassword = $requestContent['password'];
        $userName = $requestContent['name'];

        // Vérifie que l'adresse email n'est pas déjà utilisé
        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);

        // Si l'utilisateur est déjà enregistré renvoie une erreur.
        if ($registeredUser) {
            return new Response('Adresse email déjà enregistrée', 409);
        }

        // Hash le mot de passe de l'utilisateur et l'enregistre.
        $newUser = new User();
        $newUser->setEmail($userEmail);
        $newUser->setName($userName);
        $newUser->setPassword($this->passwordHasher->hashPassword($newUser, $userPassword));
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();

        $token = $JWTManager->create($newUser);
        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }
}