"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RefreshIcon from "@mui/icons-material/Refresh"
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease"

interface JsonEditorProps {
  initialJson?: string
}

export default function JSONView({
  initialJson = '{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "isActive": true,\n  "tags": ["developer", "designer"],\n  "address": {\n    "city": "New York",\n    "country": "USA"\n  }\n}',
}: JsonEditorProps) {
  const [jsonText, setJsonText] = useState<string>(initialJson)
  const [isValid, setIsValid] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")

  useEffect(() => {
    validateJson(jsonText)
  }, [jsonText])

  const validateJson = (text: string): void => {
    try {
      if (text.trim() === "") {
        setIsValid(false)
        setErrorMessage("JSON cannot be empty")
        return
      }
      JSON.parse(text)
      setIsValid(true)
      setErrorMessage("")
    } catch (error) {
      setIsValid(false)
      setErrorMessage((error as Error).message)
    }
  }

  const handleJsonChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setJsonText(event.target.value)
  }

  const handleCopyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(jsonText)
      setCopied(true)
      showSnackbar("JSON copied to clipboard!", "success")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showSnackbar("Failed to copy to clipboard", "error")
    }
  }

  const formatJson = (): void => {
    try {
      const parsed = JSON.parse(jsonText)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonText(formatted)
      showSnackbar("JSON formatted successfully", "success")
    } catch {
      showSnackbar("Cannot format invalid JSON", "error")
    }
  }

  const resetJson = (): void => {
    setJsonText(initialJson)
    showSnackbar("JSON reset to initial value", "info")
  }

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning"): void => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = (): void => {
    setSnackbarOpen(false)
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" component="h1">
            JSON Editor
          </Typography>
          <Box>
            <Tooltip title="Format JSON">
              <IconButton onClick={formatJson} disabled={!isValid} color="primary" aria-label="format JSON">
                <FormatIndentIncreaseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reset to initial JSON">
              <IconButton onClick={resetJson} color="secondary" aria-label="reset JSON">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
              <span>
                <IconButton
                  onClick={handleCopyToClipboard}
                  disabled={!isValid}
                  color={copied ? "success" : "default"}
                  aria-label="copy to clipboard"
                >
                  {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={15}
          variant="outlined"
          value={jsonText}
          onChange={handleJsonChange}
          error={!isValid}
          helperText={errorMessage}
          sx={{
            fontFamily: "monospace",
            "& .MuiInputBase-root": {
              fontFamily: "monospace",
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2" color={isValid ? "success.main" : "error"}>
            {isValid ? "Valid JSON" : "Invalid JSON"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyToClipboard}
            disabled={!isValid}
            color={copied ? "success" : "primary"}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </Box>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}
