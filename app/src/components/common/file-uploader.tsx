import { Upload, X } from "lucide-react"
import Dropzone from "react-dropzone"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploaderProps {
  file: File | null;
  handleFileChange: (file: File | null) => void;
  accept?: { [key: string]: string[] };
}

export function FileUploader({ file, handleFileChange, accept = {}, ...dropzoneProps }: FileUploaderProps) {

  const isDisabled = !!file

  return (
    <div className="">
      <Dropzone
        onDrop={(acceptedFiles: File[]) => {handleFileChange(acceptedFiles[0])}}
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
      {file && (
        <div className="relative flex items-center gap-2.5 mt-4">
          <div className="flex flex-1 gap-2.5">
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col gap-px">
                <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {file.size} bytes
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
        </div>
      )}
    </div>
  )
}

