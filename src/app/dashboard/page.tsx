"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

import ProtectedRoute from "@/components/protected-route"

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleCreateInterview = () => {
    router.push("/interview/new")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  AI Voice Interviewer
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="hidden text-gray-700 sm:block">
                  Welcome, {user?.email}
                </span>
                <button
                  onClick={signOut}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Start New Interview
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Begin a new coding interview session
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleCreateInterview}
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Start Interview
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Past Sessions
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Review your previous interviews
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/sessions"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View Sessions
                    </Link>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Practice Mode
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Practice without evaluation
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/practice"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Practice
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
