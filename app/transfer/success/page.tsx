import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function TransferSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="pt-12 pb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">Transfer Successful!</h1>
            <p className="mb-8 text-sm text-gray-600">Your money has been sent successfully</p>

            <div className="space-y-3">
              <Button asChild className="w-full bg-teal-500 hover:bg-teal-600">
                <Link href="/home">Back to Home</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/history">View Transaction History</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
