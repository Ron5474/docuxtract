"use client"
import JSONView from './JsonView'
import UploadView from './UploadView'

export default function DashboardView() {
  const viewJSON = true
  return (
    viewJSON ? <JSONView /> : <UploadView />
  )
}
