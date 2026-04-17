import HomeContent from "@/components/pages/home-content";
import { getFeaturedVehicles } from "@/lib/vehicles";

export default async function Home() {
  const featuredVehicles = await getFeaturedVehicles(9);

  return <HomeContent featuredVehicles={featuredVehicles} />;
}
