import { Button } from "./components/ui/button";
import { Github } from 'lucide-react'
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";

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
        <div className="flex flex-col flex-1 gap-4">
          {/* textareas */}
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              // resize-none para não deixar o usuário modificar o tamanho
              className="resize-none p-5 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />

            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável <code className="text-violet-500">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transicrição do video selecionado
          </p>

        </div>

        <aside className="bg-blue-600 w-1/5">

        </aside>
      </main>
    </div>
  )
}