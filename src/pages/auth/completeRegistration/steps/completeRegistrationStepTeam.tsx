import { Button } from '@/components/ui/button';
import { useClinicContext } from '@/hooks/context/useClinicContext';
import { useStepperContext } from '@/hooks/context/useStepperContext';
import type { Clinic } from '@/lib/types/clinic';

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