import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";

// Tipando as variantes de state status
type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

// Definindo o contéudo do botão a partir do estágio que o state status se encontra
const statusMessages = {
  converting: 'Convertendo...',
  generating: 'Transcrevendo...',
  uploading: 'Carregando...',
  success: 'Sucesso!'
}

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  // Criando uma interface de visualização para o processo de envio do form
  const [status, setStatus] = useState<Status>('waiting')


  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  async function convertVideoToAudio(video: File) {
    console.log('Convert started')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', log => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', progress => {
      console.log('Convert progress: ' + Math.round(progress.progress * 100))
    })


    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    // convertendo FileData para File
    const audioFileBlob = new Blob([data], { type: 'audio/mp3' })
    const audioFile = new File([audioFileBlob], 'output.mp3', {
      type: 'audio/mpeg'
    })


    console.log('Convert finished.')

    return audioFile
  }

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    // Função a ser chamada no submit do form
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    // Caso o submit do form tenha sido feito e o user não tenha feito o upload do vídeo
    if (!videoFile) {
      return
    }

    // Alterando o state que faz a troca do botão
    setStatus('converting')

    // Converter o vídeo em áudio
    const audioFile = await convertVideoToAudio(videoFile)


    // formData pq é a maneira como back-end vai receber a requisição [POST] /videos
    const data = new FormData()

    data.append('file', audioFile)

    setStatus('uploading')

    // Enviando o vídeo para o back end
    const response = await api.post('/videos', data)

    // console.log(response.data) -> validando o retorno do banco de dados
    // Capturando o valor do id criado no banco de dados
    const videoId = response.data.video.id

    setStatus('generating')

    // gerando a transcrição a partir do ID do vídeo e do prompt que o usuário digitou
    await api.post(`/videos/${videoId}/transcription`, {
      prompt
    })


    setStatus('success')
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
    <form className="space-y-6" onSubmit={handleUploadVideo}>
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
          ref={promptInputRef}
          disabled={status !== 'waiting'}
          id="transcription_prompt"
          className="h-16 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
        />
      </div>

      {/* Desabilitando o botão para quando o status for diferente de waiting */}
      <Button
        // utilizando data attributes para atribuir estilos diferentes ao botão de acordo com o staus
        data-success={status === 'success'} // data-success vai ser true qnd o status for igual a success
        disabled={status !== 'waiting'}
        type="submit"
        className="w-full data-[success=true]:bg-emerald-400 data-[success=true]:text-white"
      >
        {status === 'waiting' ? (
          <>
            Carregar vídeo
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}

      </Button>
    </form>
  )
} 