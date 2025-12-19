import React from "react";
import { Brain, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-6 text-center">
            <Brain className="size-20 text-zinc-300" />

            <div className="space-y-1">
                <h1 className="text-2xl font-semibold">
                    Vamos respirar um pouco…
                </h1>
                <p className="text-sm text-muted-foreground max-w-xs">
                    Esta página não está disponível no momento.
                    Às vezes, se perder faz parte do processo.
                </p>
            </div>

            <Button size="lg" onClick={() => navigate("/")}>
                <Home className="mr-2 size-4" />
                Voltar para a home
            </Button>
        </div>
    );
};

export default NotFound;
