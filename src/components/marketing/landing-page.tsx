import { ArchitectureSection } from "@/components/marketing/architecture-section"
import { BuiltInPublic } from "@/components/marketing/built-in-public"
import { DirectionSection } from "@/components/marketing/direction-section"
import { EngineeringPhilosophy } from "@/components/marketing/engineering-philosophy"
import { FinalCta } from "@/components/marketing/final-cta"
import { HeroSection } from "@/components/marketing/hero-section"
import { ProductOverview } from "@/components/marketing/product-overview"
import { PublicFooter } from "@/components/marketing/public-footer"
import { PublicNavbar } from "@/components/marketing/public-navbar"
import { RoadmapSection } from "@/components/marketing/roadmap-section"

type LandingPageProps = {
  isAuthenticated?: boolean
}

export function LandingPage({ isAuthenticated = false }: LandingPageProps) {
  return (
    <div className="min-h-svh bg-background">
      <PublicNavbar isAuthenticated={isAuthenticated} />
      <main>
        <HeroSection />
        <ProductOverview />
        <DirectionSection />
        <EngineeringPhilosophy />
        <ArchitectureSection />
        <BuiltInPublic />
        <RoadmapSection />
        <FinalCta />
      </main>
      <PublicFooter />
    </div>
  )
}
