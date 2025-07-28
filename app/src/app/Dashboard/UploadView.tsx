'use client'

import type React from "react"
import { useState } from "react"
import { Box, Button, Container, Paper, Typography, IconButton, Stack, LinearProgress } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import SendIcon from "@mui/icons-material/Send"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"

import { useDashboardState } from "./DashboardContext"
import { getJsonData } from "./actions"


export default function UploadView() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const {setCurrentPage, setCurrentFileJson} = useDashboardState()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSendFile = async () => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('document', file)
      const res = await getJsonData(formData)
      console.log('res: ', res)
      let jsonStringForEditor = res.answer
      const parsedJson = JSON.parse(jsonStringForEditor)
      console.log('JSON: ', parsedJson)
      jsonStringForEditor = JSON.stringify(parsedJson, null, 2)
      setCurrentFileJson(jsonStringForEditor)
      setFile(null)
      setCurrentPage('JsonView')
    } catch {
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          PDF Upload
        </Typography>

        {!file ? (
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              p: 4,
              width: "100%",
              textAlign: "center",
              mb: 2,
              cursor: "pointer",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
            <Typography>Click to upload a PDF file or drag and drop</Typography>
          </Box>
        ) : (
          <Box sx={{ width: "100%", mb: 2 }}>
            {uploading && <LinearProgress sx={{ mb: 2 }} />}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PictureAsPdfIcon color="error" sx={{ mr: 1 }} />
                <Typography noWrap sx={{ maxWidth: "200px" }}>
                  {file.name}
                </Typography>
              </Box>
              <IconButton onClick={handleRemoveFile} disabled={uploading} aria-label="remove file">
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Box>
        )}

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            disabled={!file || uploading}
            onClick={handleSendFile}
          >
            Send
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
} 