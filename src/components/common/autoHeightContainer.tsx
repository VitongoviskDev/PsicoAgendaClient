import { useLayoutEffect, useRef, useState } from "react";

const AutoHeightContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | "auto">("auto");

    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(ref.current.scrollHeight);
        }
    }, [children]);

    return (
        <div
            style={{ height }}
            className="overflow-hidden transition-[height] duration-300 ease-in-out"
        >
            <div ref={ref}>{children}</div>
        </div>
    );
};


export default AutoHeightContainer; 