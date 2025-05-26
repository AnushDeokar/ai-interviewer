'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '@/components/protected-route'

export default function NewInterviewPage() {
  const [micPermission, setMicPermission] = useState<boolean | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Check microphone permission on component mount
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setMicPermission(true)
        stream.getTracks().forEach(track => track.stop())
      })
      .catch(error => {
        setMicPermission(false)
        setTestResult('Microphone access denied. Please allow microphone access to continue.')
        console.error('Microphone permission error:', error)
      })
  }, [])

  const testMicrophone = async () => {
    if (!micPermission) {
      setTestResult('Please grant microphone permission first')
      return
    }

    setIsTesting(true)
    setTestResult('Testing microphone...')

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      source.connect(analyser)

      // Check if we can actually get audio data
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)
      
      // If we get here, the microphone is working
      setTestResult('Microphone test successful! You can start the interview.')
      
      // Cleanup
      stream.getTracks().forEach(track => track.stop())
      audioContext.close()
    } catch (error) {
      setTestResult('Error testing microphone. Please try again.')
      console.error('Microphone test error:', error)
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Prepare for Interview</h1>
            
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Microphone Setup</h2>
              
              {micPermission && (
                <button
                  onClick={testMicrophone}
                  disabled={isTesting}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isTesting ? 'Testing...' : 'Test Microphone'}
                </button>
              )}

              {testResult && (
                <div className={`mt-4 p-4 rounded-md ${
                  testResult.includes('successful') 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {testResult}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Link
                href="/dashboard"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
              >
                Back to Dashboard
              </Link>

              {testResult.includes('successful') && (
                <button
                  onClick={() => router.push('/interview/start')}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Start Interview
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
