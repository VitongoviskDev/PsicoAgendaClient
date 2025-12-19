import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

export interface StepProps {
    id: string;
    title: string;
    description: string;
    url: string;
    isComplete: boolean;
    canGoBack: boolean
}

interface StepperContextType {
    currentStep: StepProps | null;
    steps: StepProps[];

    setSteps: (steps: StepProps[]) => void;
    addStep: (step: StepProps) => void;
    removeStep: (stepId: string) => void;

    completeStep: () => void;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (stepId: string) => void;


    isPreviousStep: (stepId: string) => boolean;
    canAccessStep: (stepId: string) => boolean;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentIndex: number;
}

export const StepperContext =
    createContext<StepperContextType | undefined>(undefined);

const STORAGE_KEYS = {
    CURRENT: "stepper:current",
    STEPS: "stepper:steps",
};

export function StepperProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();

    const [steps, setStepsState] = useState<StepProps[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEYS.STEPS);
        return stored ? JSON.parse(stored) : [];
    });

    const [currentStepId, setCurrentStepId] = useState<string | null>(() => {
        return localStorage.getItem(STORAGE_KEYS.CURRENT);
    });

    /* -------------------- derived state -------------------- */

    const currentIndex = useMemo(
        () => steps.findIndex((s) => s.id === currentStepId),
        [steps, currentStepId]
    );

    const currentStep = useMemo(
        () => steps[currentIndex] ?? null,
        [steps, currentIndex]
    );

    const isFirstStep = currentIndex <= 0;
    const isLastStep = currentIndex === steps.length - 1;

    const isPreviousStep = useCallback(
        (stepId: string) => {
            if (!currentStep) return false;

            const targetIndex = steps.findIndex((s) => s.id === stepId);
            if (targetIndex === -1) return false;

            return targetIndex < currentIndex;
        },
        [steps, currentIndex, currentStep]
    );

    const canAccessStep = (stepId: string) => {
        const stepIndex = steps.findIndex(s => s.id === stepId);
        const currentIndex = steps.findIndex(s => s.id === currentStep?.id);

        if (stepIndex === -1 || currentIndex === -1) return false;

        // current
        if (stepIndex === currentIndex) return true;

        // previous
        if (stepIndex < currentIndex) return true;

        // next step unlocked by completing current
        if (stepIndex === currentIndex + 1)
            return currentStep?.isComplete === true;


        // future but already complete
        return steps[stepIndex].isComplete === true;
    };

    /* -------------------- persistence -------------------- */

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.STEPS, JSON.stringify(steps));
    }, [steps]);

    useEffect(() => {
        if (currentStepId) {
            localStorage.setItem(STORAGE_KEYS.CURRENT, currentStepId);
        }
    }, [currentStepId]);

    /* -------------------- step mutations -------------------- */

    const setSteps = useCallback((next: StepProps[]) => {
        setStepsState(next);
    }, []);

    const addStep = useCallback((step: StepProps) => {
        setStepsState((prev) => [...prev, step]);
    }, []);

    const removeStep = useCallback((stepId: string) => {
        setStepsState((prev) => prev.filter((s) => s.id !== stepId));

        if (currentStepId === stepId) {
            setCurrentStepId(null);
        }
    }, [currentStepId]);

    /* -------------------- navigation logic -------------------- */

    const goToStep = useCallback(
        (stepId: string) => {
            const step = steps.find((s) => s.id === stepId);
            if (!step) return;

            setCurrentStepId(stepId);
            navigate(step.url);
        },
        [steps, navigate]
    );

    const nextStep = useCallback(() => {
        if (isLastStep) return;

        const next = steps[currentIndex + 1];
        if (!next) return;

        setCurrentStepId(next.id);
        navigate(next.url);
    }, [steps, currentIndex, isLastStep, navigate]);

    const previousStep = useCallback(() => {
        if (isFirstStep) return;

        const prev = steps[currentIndex - 1];
        if (!prev) return;

        setCurrentStepId(prev.id);
        navigate(prev.url);
    }, [steps, currentIndex, isFirstStep, navigate]);

    const completeStep = useCallback(() => {
        if (!currentStep) return;

        setStepsState((prev) =>
            prev.map((s) =>
                s.id === currentStep.id ? { ...s, isComplete: true } : s
            )
        );
    }, [currentStep]);

    /* -------------------- provider -------------------- */

    return (
        <StepperContext.Provider
            value={{
                currentStep,
                steps,

                setSteps,
                addStep,
                removeStep,

                completeStep,
                nextStep,
                previousStep,
                goToStep,

                isPreviousStep,
                canAccessStep,
                isFirstStep,
                isLastStep,
                currentIndex,
            }}
        >
            {children}
        </StepperContext.Provider>
    );
}
