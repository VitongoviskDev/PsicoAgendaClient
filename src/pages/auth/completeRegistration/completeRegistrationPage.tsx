import { StepButton, Stepper } from "@/components/common/stepper";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useClinicContext } from "@/hooks/context/useClinicContext";
import { useStepperContext } from "@/hooks/context/useStepperContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CompleteRegistrationPage = () => {
  const { currentStep, setSteps, canAccessStep, steps, goToStep } = useStepperContext();
  const { user, handleLogout } = useAuthContext();
  const { currentClinic } = useClinicContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setSteps([
        {
          id: "profile",
          title: "Perfil",
          description: "Atualze seu perfil",
          url: "/pre-registration/profile",
          isComplete: user?.status !== "PENDING_REGISTRATION",
          canGoBack: true,
        },
        {
          id: "clinic",
          title: "Clinica",
          description: "Optional address",
          url: "/pre-registration/clinic",
          isComplete: currentClinic?.status !== "PENDING_SETUP",
          canGoBack: true,
        },
        {
          id: "address",
          title: "Endereço",
          description: "Informe seu endereço",
          url: "/pre-registration/address",
          isComplete: currentClinic?.status !== "PENDING_SETUP",
          canGoBack: true,
        },
        {
          id: "employee",
          title: "Equipe",
          description: "Optional address",
          url: "/pre-registration/team",
          isComplete: false,
          canGoBack: true,
        },
      ]);
    }
  }, [user]);


  useEffect(() => {
    if (!currentStep) return;

    const stepFromUrl = steps.find(step =>
      location.pathname.startsWith(step.url)
    );

    if (!stepFromUrl) return;

    if (!canAccessStep(stepFromUrl.id)) {
      navigate(currentStep.url, { replace: true });
    } else {
      goToStep(stepFromUrl.id);
    }
  }, [location.pathname, steps, currentStep]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-8 w-4/5 max-w-5xl">
        <Stepper />
        <Outlet />
        <div className="flex items-center justify-between w-full">

          <StepButton action='previous'>
            Anterior
          </StepButton>
          <Button variant={"link"} onClick={handleLogout}>Continuar mais tarde</Button>
          <StepButton action='next'>
            Próximo
          </StepButton>
        </div>
      </div>
    </div >
  )
}

export default CompleteRegistrationPage