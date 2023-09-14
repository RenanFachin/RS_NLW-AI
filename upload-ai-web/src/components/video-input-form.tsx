import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, useMemo, useState } from "react";

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  // useMemo faz o previewURl mudar somente se o videoFile for alterado
  const previewURL = useMemo(() => {
    // Caso o state tenha sido alterado para o valor null
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile) // cria uma URL de pré visualização de um arquivo

  }, [videoFile])

  return (
    <form className="space-y-6 ">
      <label htmlFor="video" className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">

        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            // pointer-events-none para o usuário não conseguir clicar na tag video
            className="pointer-events-none absolute inset-0"
          />
        ) :
          (
            <>
              <FileVideo className="w-5 h-5" />
              Selecione um vídeo
            </>
          )
        }
      </label>

      {/* accept="video/mp4" -> Somente aceita arquivos do tipo .mp4 */}
      <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

      <Separator />

      <div className="space-y-1">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          id="transcription_prompt"
          className="h-16 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}