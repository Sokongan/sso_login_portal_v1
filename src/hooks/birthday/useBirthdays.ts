import { useEffect, useState } from "react"
import type { Employee } from "@/lib/birthday-utils"

export function useBirthdays() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchBirthdays() {
      try {
        setLoading(true)
        setError(null)

        // TODO: Replace with real API call
        // const res = await fetch('/api/birthdays')
        // const data: Employee[] = await res.json()

        const data: Employee[] = [
          { id: "1", name: "Juan Dela Cruz", office: "OCP - Baguio City", birthdate: "1995-02-16", image: "" },
          { id: "2", name: "Maria Santos", office: "OCP - Calamba City", birthdate: "1998-02-18", image: "" },
          { id: "3", name: "Carlos Reyes", office: "OPP - Bulacan", birthdate: "1993-02-20", image: "" },
          { id: "4", name: "Ana Lopez", office: "OCP - Cotabato", birthdate: "1990-02-16", image: "" },
          { id: "5", name: "Pedro Cruz", office: "OCP - Manila", birthdate: "1988-02-16", image: "" },
          { id: "6", name: "Lucia Ramos", office: "OPP - Cavite", birthdate: "1992-02-21", image: "" },
          { id: "7", name: "Juan Dela Cruz (2)", office: "OPP - Cavite", birthdate: "1992-02-18", image: "" },
          { id: "8", name: "Pedro Cruz (2)", office: "OPP - Cavite", birthdate: "1992-02-18", image: "" },
          { id: "9", name: "Juan Cruz (2)", office: "OPP - Cavite", birthdate: "1992-02-17", image: "" },
          { id: "10", name: "Pedro Dela Cruz (2)", office: "OPP - Cavite", birthdate: "1992-02-19", image: "" },
        ]

        if (!mounted) return
        setEmployees(data)
      } catch {
        setError("Failed to load birthdays.")
      } finally {
        setLoading(false)
      }
    }

    fetchBirthdays()

    return () => {
      mounted = false
    }
  }, [])

  return { employees, loading, error }
}