import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { LuMoon, LuSun } from "react-icons/lu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const PersonalProfileTab = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        {theme === 'dark' ? <LuMoon className="size-5" /> : <LuSun className="size-5" />}
                        Preferências de Aparência
                    </CardTitle>
                    <CardDescription>
                        Personalize como o PsicoAgenda aparece no seu dispositivo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Modo Escuro</Label>
                        <p className="text-sm text-muted-foreground">
                            Alternar entre tema claro e escuro.
                        </p>
                    </div>
                    <Switch
                        id="dark-mode"
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default PersonalProfileTab
