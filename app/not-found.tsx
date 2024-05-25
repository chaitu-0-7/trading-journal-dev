import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="not-found flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-4">Not Found</h2>
      <p className="text-xl text-center mb-6">The page you are looking for is not present</p>
      <Link href="/">
        <Button>
        Return Home
        </Button>
      </Link>
    </div>
  )
}