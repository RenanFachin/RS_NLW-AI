import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

// Definindo quais os dados que vão estar contidos no retorno da chamada para API
interface Prompt {
  id: string
  title: string
  template: string
}

export function PromptSelect() {
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

  return (
    <Select>
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