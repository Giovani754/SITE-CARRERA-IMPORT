import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: any) {
  if (price === null || price === undefined || price === "" || price === 0 || price === "0") {
    return "Sob Consulta";
  }

  // If it's already a string, check if it contains "consulta"
  if (typeof price === "string" && price.toLowerCase().includes("consulta")) {
    return "Sob Consulta";
  }

  const num = typeof price === "number" ? price : parseInt(price.toString().replace(/\D/g, ""));

  if (isNaN(num)) return price.toString();

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(num);
}

export function parsePrice(price: any): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const num = parseInt(price.toString().replace(/\D/g, ""));
  return isNaN(num) ? 0 : num;
}

export function formatMileage(mileage: any): string {
  if (mileage === null || mileage === undefined || mileage === "") return "0 km";
  
  const num = typeof mileage === "number" 
    ? mileage 
    : parseInt(mileage.toString().replace(/\D/g, ""));
    
  if (isNaN(num)) return mileage.toString();
  
  return `${new Intl.NumberFormat("pt-BR").format(num)} km`;
}


