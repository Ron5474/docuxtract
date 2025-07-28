'use client'

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'
import PreviewIcon from '@mui/icons-material/Preview'
import { useTheme } from '@mui/material/styles'

import { useDashboardState } from "./DashboardContext"


export default function Header() {
  const theme = useTheme() 
  const { currentPage, setCurrentPage, setCurrentFileJson } = useDashboardState()

  const handleBackClick = () => {
    setCurrentPage('UploadView')
  }

  const handlePreview = () => {
    setCurrentFileJson('{\n "name": "John Doe",\n "age": 30,\n "email": "john@example.com",\n "isActive": true,\n "tags": ["developer", "designer"],\n "address": {\n "city": "New York",\n "country": "USA"\n }\n}')
    setCurrentPage('JsonView')
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        boxShadow: theme.shadows[6],
        py: 1,
      }}
    >
      <Toolbar>
        {currentPage === "JsonView" &&
          <IconButton
            aria-label="Go Back to Upload Page"
            onClick={handleBackClick}
            sx={{
              mr: 2,
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        }

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <PictureAsPdfIcon sx={{ mr: 1, fontSize: 32, color: theme.palette.common.white }} /> {/* White icon */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: theme.palette.common.white }}>
            Docuxtract
          </Typography>
        </Box>

        {currentPage === 'UploadView' &&
          <Button
          onClick={handlePreview}
          variant="outlined"
          startIcon={<PreviewIcon />}
          sx={{
            color: theme.palette.common.white,
            borderColor: theme.palette.common.white,
            '&:hover': {
              borderColor: theme.palette.common.white,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            px: 2,
          }}
        >
          Example
        </Button>}
      </Toolbar>
    </AppBar>
  )
}
