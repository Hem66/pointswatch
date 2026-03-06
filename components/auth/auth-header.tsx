export default function AuthHeader() {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="relative w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
        <div className="text-2xl font-bold text-primary-foreground">P</div>
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        PlugCircle
      </h1>
    </div>
  )
}
