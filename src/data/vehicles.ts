export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: string;
  price: string;
  transmission: string;
  fuel: string;
  color: string;
  description: string;
  highlights: string[];
  images: string[];
  status: "available" | "sold" | "reserved";
  featured: boolean;
  slug: string;
  category: string;
  engine?: string;
  power?: string;
  city?: string;
}
