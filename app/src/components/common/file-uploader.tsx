import { useState } from "react"
import { Upload, X } from "lucide-react"
import Dropzone from "react-dropzone"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FileUploaderProps {
  handleDataChange: (data: File | null) => void;
  accept?: { [key: string]: string[] };
}

export function FileUploader({handleDataChange, accept = {}, ...dropzoneProps }: FileUploaderProps) {

  const [file, setFile] = useState<File | null>(null)
  const isDisabled = !!file
  
  // Function to handle file change event
  const handleFileChange = (file: File | null) => {
    setFile(file)
    handleDataChange(file)
  }

  return (
    <>
      {file
        ? (
            <Card className="bg-secondary mb-8">
            <CardHeader className="w-full grid grid-cols-3 gap-2 text-left pt-2 pb-3 px-4">
              <CardTitle className="mt-2">{file.name}</CardTitle>
              <CardDescription className="">{file.size} bytes</CardDescription>
                <div className="col-start-3 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-7"
                  onClick={() => handleFileChange(null)}
                >
                  <X className="size-4" aria-hidden="true" />
                  <span className="sr-only">Remove file</span>
                </Button>
                </div>
            </CardHeader>
          </Card>
        // <div className="relative flex items-center gap-2.5 mt-4">
        //     <div className="flex flex-1">
        //         <div className="w-full grid grid-cols-2 gap-2 text-left">
        //           <p className="text-sm font-medium text-foreground/80">
        //             {file.name}
        //           </p>
        //           <p className="text-xs text-muted-foreground">
        //             {file.size} bytes
        //           </p>
        //           </div>
        //     </div>
        //     <div className="flex items-center gap-2">
        //       <Button
        //         type="button"
        //         variant="outline"
        //         size="icon"
        //         className="size-7"
        //         onClick={() => handleFileChange(null)}
        //       >
        //         <X className="size-4" aria-hidden="true" />
        //         <span className="sr-only">Remove file</span>
        //       </Button>
        //     </div>
        //   </div>
          )
        : (
          <Dropzone
            onDrop={(acceptedFiles: File[]) => { handleFileChange(acceptedFiles[0]) }}
            accept={accept}
            maxFiles={1}
            multiple={false}
            disabled={isDisabled}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isDragActive && "border-muted-foreground/50",
                  isDisabled && "pointer-events-none opacity-60",
                )}
                {...dropzoneProps}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <Upload
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-medium text-muted-foreground">
                      Drop the file here
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <Upload
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-px">
                      <p className="font-medium text-muted-foreground">
                        Drag {`'n'`} drop file here, or click to select file
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        )}
    </>
  )
}

