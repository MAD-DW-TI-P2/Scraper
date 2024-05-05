<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\QueryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QueryRepository::class)]
#[ORM\Table(name: '`query`')]
#[ApiResource]
class Query
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created = null;

    #[ORM\Column]
    private ?int $result = null;

    #[ORM\Column(length: 1000)]
    private ?string $comment = null;

    #[ORM\ManyToOne(inversedBy: 'site')]
    private ?Site $site = null;

    #[ORM\ManyToMany(targetEntity: Tool::class, inversedBy: 'tool')]
    private Collection $tool;

    public function __construct()
    {
        $this->tool = new ArrayCollection();
        $this->created= new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function getResult(): ?int
    {
        return $this->result;
    }

    public function setResult(int $result): static
    {
        $this->result = $result;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getSite(): ?Site
    {
        return $this->site;
    }

    public function setSite(?Site $site): static
    {
        $this->site = $site;

        return $this;
    }

    /**
     * @return Collection<int, Tool>
     */
    public function getTool(): Collection
    {
        return $this->tool;
    }

    public function addTool(Tool $tool): static
    {
        if (!$this->tool->contains($tool)) {
            $this->tool->add($tool);
        }

        return $this;
    }

    public function removeTool(Tool $tool): static
    {
        $this->tool->removeElement($tool);

        return $this;
    }
}
