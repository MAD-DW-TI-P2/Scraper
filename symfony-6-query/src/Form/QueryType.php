<?php

namespace App\Form;

use App\Entity\Query;
use App\Entity\Site;
use App\Entity\Tool;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QueryType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('tool', EntityType::class, [
                'class' => Tool::class,
                'choice_label' => 'name',
                'multiple' => true,
                'attr' => [
                    'class' => 'js-example'
                ],
            ])
            ->add('result')
            ->add('comment')
            ->add('site', EntityType::class, [
                'class' => Site::class,
                'choice_label' => 'name',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Query::class,
        ]);
    }
}
