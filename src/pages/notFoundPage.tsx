import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LuBrain, LuHouse } from "react-icons/lu";

const TITLES = [
    "Vamos respirar um pouco…",
    "Ops, parece que nos perdemos",
    "Nada por aqui… ainda",
    "Essa rota pensou diferente",
    "Nem toda página existe",

    "Aqui não tem nada — e tudo bem",
    "Chegamos longe demais",
    "Isso não era para estar aqui",
    "404 ideias não encontradas",
    "Essa página tirou férias",

    "Silêncio… só o vazio",
    "Esse caminho não levou a lugar nenhum",
    "Página em modo invisível",
    "Nem o sistema encontrou isso",
    "A curiosidade te trouxe até aqui",

    "Erro? Talvez só uma pausa",
    "Às vezes o destino erra a rota",
    "Nem toda jornada tem final feliz",
    "Essa página escapou da realidade",
    "Nada além de pensamentos por aqui"
];


const DESCRIPTIONS = [
    "Esta página não está disponível no momento. Às vezes, se perder faz parte do processo.",
    "O caminho que você tentou acessar não levou a lugar nenhum.",
    "Talvez essa página nunca tenha existido. Ou só precise de um tempo.",
    "Explorar também é errar o caminho de vez em quando.",
    "A gente tentou, mas não encontrou nada aqui.",

    "Mesmo o melhor sistema precisa admitir quando algo não existe.",
    "Nem todas as rotas foram feitas para serem encontradas.",
    "O que você procura não está aqui — mas a home sempre está.",
    "Às vezes, voltar um passo é a melhor decisão.",
    "Essa página não respondeu ao chamado.",

    "Nada quebrou. Só não há nada para mostrar.",
    "O sistema olhou, pensou… e não achou.",
    "Esse endereço não faz mais parte do mapa.",
    "Talvez você tenha chegado cedo demais. Ou tarde demais.",
    "Nem o cérebro artificial encontrou algo útil aqui.",

    "Alguns caminhos levam a respostas. Outros, a reflexões.",
    "Não é um erro grave, só um desvio inesperado.",
    "A navegação continua — só não por aqui.",
    "Tudo funcionando. Só essa página que não.",
    "Considere isso um pequeno intervalo antes de continuar."
];


const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const { title, description } = useMemo(() => {
        const randomTitle =
            TITLES[Math.floor(Math.random() * TITLES.length)];

        const randomDescription =
            DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];

        return { title: randomTitle, description: randomDescription };
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center h-screen gap-6 text-center">
            <h2 className="absolute top-[50%] -translate-y-[50%] text-primary/10 text-[20vw] font-bold -z-1">404</h2>
            <LuBrain className="size-20 text-zinc-300" />

            <div className="flex flex-col items-center space-y-1 text-center">
                <h1 className="text-2xl font-semibold">
                    {title}
                </h1>
                <p className="text-sm text-muted-foreground max-w-xs">
                    {description}
                </p>
            </div>

            <Button size="lg" onClick={() => navigate("/")}>
                <LuHouse className="mr-2 size-4" />
                Voltar para a home
            </Button>
        </div>
    );
};

export default NotFound;
