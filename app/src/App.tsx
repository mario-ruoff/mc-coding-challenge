import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/common/theme-provider"
import { ModeToggle } from './components/common/mode-toggle'
import { DataTable } from "@/components/common/data-table"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUploader } from "@/components/common/file-uploader"
import "./App.css"

function App() {
  const [data, setData] = useState([])
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (file: File | null) => {
    setFile(file)
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        if (fileEvent.target) {
          try {
            const json = JSON.parse(fileEvent.target.result as string);
            setData(json);
            setError(null);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            setError("JSON could not be parsed. Please check the file format.");
            setFile(null);
          }
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <h1>Interactive JSON Viewer</h1>
      {data.length > 20
        ? <DataTable data={data} />
        : <>
          <FileUploader file={file} handleFileChange={handleFileChange} accept={{ "application/json": [] }} />
          {error && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </>
      }
      <ModeToggle />
    </ThemeProvider>
  )
}

export default App