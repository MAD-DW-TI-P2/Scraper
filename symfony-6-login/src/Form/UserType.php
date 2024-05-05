<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email')
            // An exception has been thrown during the rendering of a template ("Warning: Array to string conversion").
            //->add('roles')
            ->add('password')

            ->add('roles', ChoiceType::class, [
                'choices' => [
                    'Role admin' => 'ROLE_ADMIN',
                    'Role super admin' => 'ROLE_SUPER_ADMIN',
                    // Agrega más roles si es necesario
                ],
                'multiple' => true, // Esto permite seleccionar múltiples roles
                'expanded' => true, // Esto muestra los roles como opciones de radio o checkboxes
            ]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
