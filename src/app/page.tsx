import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Zap, Globe, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Flowly
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            🚀 Launch Special: 50% off for early adopters
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Project Management
            <br />
            Without Barriers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Collaborate globally with AI-powered translation. Manage projects like Trello, 
            communicate without language barriers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 h-14">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14">
              Watch Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-gray-600">Powerful features for modern teams</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-blue-600" />}
            title="Lightning Fast"
            description="Built on Next.js 15 for blazing fast performance and seamless user experience"
          />
          <FeatureCard
            icon={<Globe className="h-10 w-10 text-purple-600" />}
            title="AI Translation"
            description="Collaborate with global teams using AI-powered real-time translation powered by DeepL"
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-green-600" />}
            title="Enterprise Security"
            description="Bank-level encryption and security. Your data is always protected and private"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your workflow?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of teams already using Flowly</p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="text-lg px-8 h-14">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white/50">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2026 Flowly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
