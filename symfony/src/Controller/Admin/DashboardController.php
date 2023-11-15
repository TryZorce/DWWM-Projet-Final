<?php

namespace App\Controller\Admin;

use App\Entity\Article;
use App\Entity\Cart;
use App\Entity\Categorie;
use App\Entity\Invoice;
use App\Entity\Message;
use App\Entity\Promotion;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Symfony');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');

        yield MenuItem::subMenu("User")
            ->setSubItems([
                MenuItem::linkToCrud('List', 'fas fa-users', User::class),
                MenuItem::linkToCrud('Ajouter', 'fas fa-user-plus', User::class)
                    ->setAction('new')
            ]);
    
        yield MenuItem::subMenu("Article")
            ->setSubItems([
                MenuItem::linkToCrud('List', 'fas fa-newspaper', Article::class),
                MenuItem::linkToCrud('Ajouter', 'fas fa-plus', Article::class)
                    ->setAction('new')
            ]);
    
        yield MenuItem::subMenu("Categorie")
            ->setSubItems([
                MenuItem::linkToCrud('List', 'fas fa-list', Categorie::class),
                MenuItem::linkToCrud('Ajouter', 'fas fa-plus', Categorie::class)
                    ->setAction('new')
            ]);
    
        yield MenuItem::subMenu("Cart")
            ->setSubItems([
                MenuItem::linkToCrud('List', 'fas fa-shopping-cart', Cart::class),
                MenuItem::linkToCrud('Ajouter', 'fas fa-cart-plus', Cart::class)
                    ->setAction('new')
            ]);
    
        yield MenuItem::subMenu("Invoice")
            ->setSubItems([
                MenuItem::linkToCrud('List', 'fas fa-file-invoice', Invoice::class),
                MenuItem::linkToCrud('Ajouter', 'fas fa-plus', Invoice::class)
                    ->setAction('new')
            ]);
    
        yield MenuItem::subMenu("Message")
            ->setSubItems([
                MenuItem::linkToCrud('List', 'fas fa-envelope', Message::class),
                MenuItem::linkToCrud('Ajouter', 'fas fa-plus', Message::class)
                    ->setAction('new')
            ]);
    
        yield MenuItem::subMenu("Promotion")
            ->setSubItems([
                MenuItem::linkToCrud('List', 'fas fa-percent', Promotion::class),
                MenuItem::linkToCrud('Ajouter', 'fas fa-plus', Promotion::class)
                    ->setAction('new')
            ]);

        yield MenuItem::linkToUrl('Symfony', 'fa-solid fa-house', '/');
        yield MenuItem::linkToUrl('Accueil', 'fa-solid fa-house', 'http://localhost:3000/');
        yield MenuItem::linkToUrl('Github', 'fab fa-github', 'https://github.com/TryZorce/Projet-Final/tree/main');
        yield MenuItem::linkToUrl('YouTube', 'fab fa-youtube', 'https://www.youtube.com/watch?v=Y9Zw6xOGly0&ab_channel=NEFOS');
    
    }   
}