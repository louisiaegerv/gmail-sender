import EmailForm from '../components/EmailForm'

export default function ComposePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compose Email</h1>
      <EmailForm />
    </div>
  )
}