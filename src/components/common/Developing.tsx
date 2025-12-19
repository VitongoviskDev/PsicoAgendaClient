import { Construction, Clock } from "lucide-react";
import React from "react";

const Developing: React.FC = () => {
    return (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-md border border-dashed border-zinc-200 bg-zinc-50 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Construction className="size-7" />
            </div>

            <div className="space-y-1">
                <h3 className="text-lg font-semibold">Under development</h3>
                <p className="text-sm text-muted-foreground">
                    This section is not available yet.
                </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="size-4" />
                <span>Coming soon</span>
            </div>
        </div>
    );
};

export default Developing;
