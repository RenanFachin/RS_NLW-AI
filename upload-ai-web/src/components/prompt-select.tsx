import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

// Definindo quais os dados que vão estar contidos no retorno da chamada para API
interface Prompt {
  id: string
  title: string
  template: string
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  // Carregando os prompts do back-end
  // 1 -> Criar um state para armazenar
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  // 2 -> Utilizar o useEffect para disparar a função para quando algo mudar
  useEffect(() => {
    // Fazendo uma chamada para recuperar os prompts criados na api
    api.get('/prompts').then(response => {

      // console.log(response.data)
      setPrompts(response.data)
    })
  }, [])

  function handlePromptSelected(promptId: string){
    // Pegando o id (que vem do value do select) e transformando em template
    // Percorrendo todos os prompts para verificar qual possuí o mesmo id
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if(!selectedPrompt){
      return
    }

    // Caso o método find tenha retornado algo, chamar a função
    onPromptSelected(selectedPrompt.template)
  }

  return (
    // Toda vez que o valor do select for alterado, chamar a função que percorre os prompts com o valor de value do select e retorna o template deste prompt e já chama a função
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>

      <SelectContent>
        {
          prompts?.map(prompt => {
            return (
              <SelectItem
                key={prompt.id}
                value={prompt.id}
              >
                {prompt.title}
              </SelectItem>
            )
          })
        }
      </SelectContent>
    </Select>
  )
}