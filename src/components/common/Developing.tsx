import { Construction, Clock } from "lucide-react";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

const TITLES = [
    "Em construção",
    "Compilando ideias…",
    "Essa feature está nascendo",
    "Código em andamento",
    "Trabalhando nisso agora",

    "Ainda escrevendo esse trecho",
    "Refatorando o futuro",
    "Deploy pendente",
    "Essa parte ainda está em desenvolvimento",
    "Funcionalidade em progresso",

    "Aqui só tem código fresco",
    "Pensando na melhor solução",
    "Feature não finalizada",
    "Ainda não passou no build",
    "Work in progress",

    "Programando essa rota",
    "Essa ideia ainda está no editor",
    "Aguardando próxima versão",
    "Essa tela ainda está ganhando forma",
    "Desenvolvimento em curso"
];

const DESCRIPTIONS = [
    "Essa funcionalidade ainda está sendo desenvolvida.",
    "Estamos trabalhando para entregar isso em breve.",
    "O código ainda está sendo escrito e testado.",
    "Essa parte do sistema ainda não está pronta.",
    "Em breve, essa funcionalidade estará disponível.",

    "Essa tela ainda não passou pelo deploy.",
    "A ideia existe, o código está a caminho.",
    "Ainda estamos ajustando os detalhes técnicos.",
    "Essa funcionalidade está em fase de implementação.",
    "O desenvolvimento dessa parte está em andamento.",

    "Essa feature ainda não chegou à versão final.",
    "Estamos construindo isso com cuidado.",
    "O sistema ainda está aprendendo esse caminho.",
    "Essa rota ainda não foi conectada.",
    "O backend e o frontend ainda estão conversando.",

    "Essa parte ainda está fora do ar por enquanto.",
    "O código está quase lá.",
    "Essa funcionalidade está na fila de desenvolvimento.",
    "Ainda não passou pelo code review.",
    "Logo mais isso ganha vida."
];



const Developing: React.FC = () => {

    const location = useLocation();
    const { title, description } = useMemo(() => {
        const randomTitle =
            TITLES[Math.floor(Math.random() * TITLES.length)];

        const randomDescription =
            DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];

        return { title: randomTitle, description: randomDescription };
    }, [location]);


    return (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-md border border-dashed border-zinc-200 bg-zinc-50 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Construction className="size-7" />
            </div>

            <div className="space-y-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="size-4" />
                <span>Em breve</span>
            </div>
        </div>
    );
};

export default Developing;
