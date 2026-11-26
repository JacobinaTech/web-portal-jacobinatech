import { Button, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero eyebrow="Erro 404" title="Essa rota não compilou." description="A página que você procura não existe ou mudou de endereço.">
      <div className="mt-10">
        <Button href="/">Voltar ao início</Button>
      </div>
    </PageHero>
  );
}
