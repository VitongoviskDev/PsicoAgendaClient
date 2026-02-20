import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStepperContext } from '@/hooks/context/useStepperContext';
import { useNavigate } from 'react-router-dom';

const CompleteRegistrationStepTeam = () => {
    const { completeStep } = useStepperContext();
    const navigate = useNavigate();

    const handleCompleteStep = () => {
        localStorage.setItem("complete-registration-step:team", "true")
        completeStep();
        navigate("/", { replace: true });
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Equipe</CardTitle>
                <CardDescription>
                    Convide outros profissionais para fazerem parte da sua clínica
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-10">
                <div className="text-center space-y-2">
                    <p className="text-muted-foreground">
                        Você poderá convidar sua equipe a qualquer momento através das configurações da clínica.
                    </p>
                </div>
                <div className="flex gap-4 w-full">
                    <Button variant="outline" className="flex-1" onClick={handleCompleteStep}>
                        Pular por enquanto
                    </Button>
                    <Button className="flex-1" onClick={handleCompleteStep}>
                        Concluir Cadastro
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default CompleteRegistrationStepTeam;