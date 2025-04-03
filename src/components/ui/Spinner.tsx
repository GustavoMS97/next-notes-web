import { Loader2 } from 'lucide-react'
import { JSX } from 'react'

export function Spinner(): JSX.Element {
  return <Loader2 className="animate-spin w-5 h-5 text-gray-400" />
}
