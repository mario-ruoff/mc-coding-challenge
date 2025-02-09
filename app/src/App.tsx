import { useState } from "react"
import { ThemeProvider } from "@/components/common/theme-provider"
import { ModeToggle } from './components/common/mode-toggle'
import { DataTable } from "@/components/common/data-table"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUploader } from "@/components/common/file-uploader"
import "./App.css"

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState<string | null>(null)

  const handleDataChange = (file: File | null) => {
    // If file is removed
    if (!file) {
      setData([])
      setError(null);
    }
    // If file is uploaded
    else {
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
          }
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="flex flex-col h-screen">

        {/* Header section */}
        <div className="relative h-1/4 px-4 py-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4">
            Interactive JSON Viewer
          </h1>
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
        </div>

        {/* Main content section */}
        <div className="h-3/4 flex items-start justify-center">
          <div className="w-full max-w-2xl">

            {/* File dropzone component */}
            <FileUploader handleDataChange={handleDataChange} accept={{ "application/json": [] }} />

            {/* Error section */}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle />
                <AlertTitle className="ml-4">Error</AlertTitle>
                <AlertDescription className="ml-4">{error}</AlertDescription>
              </Alert>
            )}

            {/* JSON data table */}
            {data.length > 0 && <DataTable data={data} />}

          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App