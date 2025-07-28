'use client'
import { useDashboardState } from "./DashboardContext"
import JSONView from "./JsonView"
import UploadView from "./UploadView"

export default function DashboardView() {
  const {currentPage} = useDashboardState()
  return (
    currentPage === 'JsonView' ? <JSONView /> : <UploadView />
  )
}
