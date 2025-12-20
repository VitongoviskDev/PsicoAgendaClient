import { Button } from '@/components/ui/button';
import { useStepperContext } from '@/hooks/context/useStepperContext';

const CompleteRegistrationStepTeam = () => {
    const { completeStep } = useStepperContext();
    const hadleCompleteStep = () => {
        localStorage.setItem("complete-registration-step:team", "true")
        completeStep();
        alert("all done")
    }
    return (
        <div>
            <Button onClick={hadleCompleteStep}>COMPLETE TEAM</Button>
        </div>
    )
}

export default CompleteRegistrationStepTeam