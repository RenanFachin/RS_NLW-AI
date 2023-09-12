import { Button } from "./components/ui/button";
import { Github } from 'lucide-react'
import { Separator } from "./components/ui/separator";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>


        <div className="flex gap-3 items-center">
          <span className="text-sm text-muted-foreground">
            Desenvolvido no NLW da Rocketseat
          </span>

          {/* Por padrão ele vem na horizontal, mudando para vertical e definindo um tamanho */}
          <Separator orientation="vertical" className="h-6" />

          <Button variant={"outline"}>
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>

      {/* Main */}
      {/* Flex-1 vai fazer ocupar o restante da altura limitado pela div pai */}
      <main className="flex-1 p-6 flex gap-6">
        
      </main>
    </div>
  )
}