export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-gray-900" />
    </div>
  )
}