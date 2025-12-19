// stepper.tsx
import { useStepperContext } from "@/hooks/context/useStepperContext";
import clsx from "clsx";
import { Button, type ButtonProps } from "../ui/button";
import { useEffect } from "react";

export function Stepper() {
    const {
        steps,
        currentStep,
        canAccessStep,
        goToStep,
    } = useStepperContext();

    useEffect(() => {
        if (!currentStep && steps?.[0])
            goToStep(steps[0].id)
    }, [currentStep, steps])

    return (
        <nav className="w-full">
            <ol className="flex items-start justify-between gap-4">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStep?.id;
                    const isCompleted = step.isComplete;
                    const isClickable = canAccessStep(step.id);

                    return (
                        <li key={step.id} className="flex-1">
                            <button
                                type="button"
                                disabled={!isClickable && !isActive}
                                onClick={() => isClickable && goToStep(step.id)}
                                className={clsx(
                                    "flex w-full items-start gap-2 text-sm transition cursor-pointer",
                                    isActive && "font-semibold text-blue-600",
                                    isCompleted && "text-green-600",
                                    isCompleted && isActive && "text-blue-600!",
                                    !isClickable && !isActive && "cursor-not-allowed! text-zinc-400"
                                )}
                            >
                                {/* Indicator */}
                                <div
                                    className={clsx(
                                        "flex h-9 w-9 items-center justify-center rounded-full border text-sm",
                                        isActive && "border-blue-600",
                                        isCompleted && "border-green-600 bg-green-600 text-white",
                                        isCompleted && isActive && "border-blue-600! bg-blue-600! text-white!",
                                        !isClickable && !isActive && "border-zinc-300"
                                    )}
                                >
                                    {index + 1}
                                </div>

                                <div className="text-start leading-tight">
                                    <div>{step.title}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {step.description}
                                    </div>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}


interface StepButtonProps extends ButtonProps {
    action?: "next" | "previous";
}

export const StepButton = ({
    action = "next",
    onClick,
    ...props
}: StepButtonProps) => {
    const { currentStep, nextStep, previousStep, isLastStep, isFirstStep } =
        useStepperContext();

    const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        onClick?.(e);

        if (action === "next" && !isLastStep && currentStep?.isComplete) {
            nextStep();
        }

        if (action === "previous" && !isFirstStep) {
            previousStep();
        }
    };

    return (
        <Button
            disabled={
                (action === "next" && (isLastStep || !currentStep?.isComplete)) ||
                (action === "previous" && (isFirstStep || !currentStep?.canGoBack))
            }
            variant={props.variant ?? "outline"}
            {...props}
            onClick={handleClick}
        />
    );
};
