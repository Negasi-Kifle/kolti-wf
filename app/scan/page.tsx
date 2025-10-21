"use client"

import { ArrowLeft, Camera } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
        }
      } catch (err) {
        console.error("Camera access error:", err)
        setHasPermission(false)
        setError("Unable to access camera. Please grant camera permissions.")
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="sticky top-0 z-10 flex items-center gap-4 bg-gray-900 p-4">
        <Link href="/home">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-xl font-semibold text-white">Scan QR Code</h1>
      </div>

      <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
        {hasPermission === null && (
          <div className="text-center text-white">
            <Camera className="mx-auto mb-4 h-12 w-12" />
            <p>Requesting camera access...</p>
          </div>
        )}

        {hasPermission === false && (
          <div className="p-6 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <Camera className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-white">Camera Access Required</h2>
            <p className="mb-6 text-gray-300">{error}</p>
            <Link href="/home" className="inline-block rounded-lg bg-teal-600 px-6 py-3 text-white hover:bg-teal-700">
              Back to Home
            </Link>
          </div>
        )}

        {hasPermission && (
          <>
            <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-2xl border-4 border-teal-500 shadow-lg">
                <div className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-teal-500" />
                <div className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-teal-500" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-teal-500" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-teal-500" />
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white">Position QR code within the frame</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
