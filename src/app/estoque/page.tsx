import React from "react";
import { getAllVehicles } from "@/lib/vehicles";
import InventoryContent from "@/components/pages/inventory-content";

export default async function InventoryPage() {
  const vehicles = await getAllVehicles();

  return <InventoryContent vehicles={vehicles} />;
}
