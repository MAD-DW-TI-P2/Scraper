<?php

namespace App\Controller;

use App\Entity\Query;
use App\Form\QueryType;
use App\Repository\QueryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/query')]
class QueryController extends AbstractController
{
    #[Route('/', name: 'app_query_index', methods: ['GET'])]
    public function index(QueryRepository $queryRepository): Response
    {
        return $this->render('query/index.html.twig', [
            'queries' => $queryRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_query_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $query = new Query();
        $form = $this->createForm(QueryType::class, $query);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($query);
            $entityManager->flush();

            return $this->redirectToRoute('app_query_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('query/new.html.twig', [
            'query' => $query,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_query_show', methods: ['GET'])]
    public function show(Query $query): Response
    {
        return $this->render('query/show.html.twig', [
            'query' => $query,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_query_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Query $query, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(QueryType::class, $query);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_query_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('query/edit.html.twig', [
            'query' => $query,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_query_delete', methods: ['POST'])]
    public function delete(Request $request, Query $query, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$query->getId(), $request->request->get('_token'))) {
            $entityManager->remove($query);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_query_index', [], Response::HTTP_SEE_OTHER);
    }
}
