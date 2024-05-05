# Symfony 6 entities

<img src="https://jorgebenitezlopez.com/github/symfony.jpg">
<img src="https://img.shields.io/static/v1?label=PHP&message=Symfony&color=green">

# Requisitos

- Symfony CLI: https://symfony.com/download
- PHP 8.3.0: https://www.php.net/manual/en/install.php
- Composer: https://getcomposer.org/download/
- Symfony 6.4: https://symfony.com/releases/6.4

# Instalación de Symfony y paquetes desde 0

- symfony new entities --version=6.4
- cd entities
- composer require symfony/maker-bundle --dev  (Comandos para construir)
- composer require symfony/orm-pack (ORM para pegar la base de datos)
- composer require symfony/profiler-pack --dev (Profiler para tener información)
- composer require form (Para los formularios) 
- composer require validator (Validaciones)
- composer require twig-bundle (Para plantillas) 
- composer require security-csrf api "lexik/jwt-authentication-bundle" symfony/security-bundle (Para seguridad. Si falla en Windows en el php.ini permitir la extension sodium. También puede ser necesaria la extensión composer requiere ext-openssl) 

# Pasos para crear entidades relacionadas desde 0

- Por facilidad de trabajo la base de datos será un sqlite en el propio repo. Modifico el .env para trabajar con sqlite https://www.sqlite.org/index.html
<kbd><img src="https://jorgebenitezlopez.com/github/sqlite.png"></kbd>
- Pensar lo que queremos construir como entidades con sus porpuedades y métodos y relaciones entre ellas. Primero construyo las que no tienen campos relacionados y por último las que tienen campos que se relacionan con otras entidades
- Pensar en las relaciones. Es una relacción mucho a muchos Symfony crea una tabla intermedia
<kbd><img src="https://jorgebenitezlopez.com/tiddlywiki/pro/meme-relaciones.png"></kbd>
<kbd><img src="https://jorgebenitezlopez.com/tiddlywiki/pro/relacionestablas.png"></kbd>
- Crear la entidades y relaciones: ``php bin/console make:entity``
- Actualizo la Base de datos: ``php bin/console doctrine:schema:update --force``. Puedo revisar que las relaciones entre tablas son correctas accediendo a la base de datos
- Creo el CRUD de entidades: ``php bin/console make:crud``. Pongo el nombre de la entidad o entidades que corresponda
- Reviso las rutas y añado registros. Las entidades relacionadas de mucho a muchos serán un campo múltiple, las relaciones de uno a muchos será un select en el que solo puedes seleccionar un elmento.
- Puedo crear campos del formtype de cada entidad para que no se añadan por el usuario en CRUD y añadir métodos mágicos como __construct para generar el campo created automáticamente.
- Pongo un poco bonito el CRUD. En el head añado boostrap ``<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`` y en el body añado un div ``<div class="container mt-2 p-3 pt-5 p-md-5">`` y en el config de Twig añado ``form_themes: ['bootstrap_5_layout.html.twig']``
- Pintar las tablas relacionadas. Gracias la ORM podemos acceder a las propiedades de tablas relacinadas como si fueran propiedades de la misma entidad: ``query.site.name``. Cuando las propiedades relacionadas con otras tablas son múltiples hay que iterarlas para pintarlas. Ver el index de query para ver cómo las recorre twig. 
- Para mejorar la selección múltiple utilizo select2. Una librería de JS que nos permite incluso buscar en un select: form_themes: https://select2.org/getting-started/installatio. Para ello añadimos los CDN en el twig y el JS que lo dispara.
- Para la búsqueda en el front he utilizado: https://datatables.net/ 
- Por POST puedes actualizar un query

# Pasos para instalar el proyecto

- gh repo clone MAD-DW-TI-P2/symfony-6-entities
- composer install
- symfony server:start

# TODO

- Añadir una tabla lugares y relacionarlos con las consultas
- Agrupar todos los botones para darles estilo
- Meter los JS y CSS donde correspondan

- Securizar la API
- Poner nombres en vez de números en las relaciones de las tablas


