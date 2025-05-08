import EmailTemplateSelector from "./EmailTemplateSelector"

const EmailTemplates = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Professional Email Templates</h1>
          <p className="mt-2 text-lg text-gray-600">
            Clean, responsive email templates designed for Nkumba University communications
          </p>
        </div>

        <EmailTemplateSelector />
      </div>
    </div>
  )
}

export default EmailTemplates

