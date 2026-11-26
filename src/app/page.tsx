import { Contato } from "@/components/home/contato";
import { Chamadas } from "@/components/home/chamadas";
import { Curso } from "@/components/home/curso";
import { Hero } from "@/components/home/hero";
import { Participar } from "@/components/home/participar";
import { Professores } from "@/components/home/professores";
import { Projetos } from "@/components/home/projetos";
import { getProfessores, getProjetos, splitEventos } from "@/lib/content";

/*
 * Landing (formato híbrido): todas as seções institucionais vivem aqui como âncoras.
 * Só projetos e eventos têm páginas próprias (URLs compartilháveis / portfólio).
 */
export default function Home() {
  const projetos = getProjetos();
  return (
    <>
      <Hero projeto={projetos[0]} evento={splitEventos().proximos[0]} />
      <Chamadas />
      <Projetos projetos={projetos.slice(0, 3)} />
      <Curso />
      <Professores professores={getProfessores()} />
      <Participar />
      <Contato />
    </>
  );
}
