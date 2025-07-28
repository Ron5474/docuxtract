'use client'

import { createContext, useContext, useState, ReactNode } from "react"

interface DashboardState {
  currentPage: string
  currentFileJson: string
  setCurrentPage: (page: string) => void
  setCurrentFileJson: (json: string) => void
}


const DashboardContext = createContext<DashboardState | undefined>(undefined)


export function Provider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<string>("UploadView") // Initial page
  const [currentFileJson, setCurrentFileJson] = useState<string>("") // Stores the extracted JSON
  const value = {
    currentPage,
    currentFileJson,
    setCurrentPage,
    setCurrentFileJson,
  }

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}


export function useDashboardState() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboardState must be used within a DashboardProvider")
  }
  return context
}
