export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  price: string;
  transmission: string;
  fuel: string;
  image: string;
  featured?: boolean;
  slug: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2023,
    mileage: "2.500 km",
    price: "R$ 1.150.000",
    transmission: "PDK",
    fuel: "Gasolina",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    slug: "porsche-911-carrera-s-2023"
  },
  {
    id: "2",
    brand: "Audi",
    model: "RS6 Avant Performance",
    year: 2024,
    mileage: "0 km",
    price: "Sob Consulta",
    transmission: "Tiptronic",
    fuel: "Gasolina",
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    slug: "audi-rs6-avant-performance-2024"
  },
  {
    id: "3",
    brand: "BMW",
    model: "M4 Competition",
    year: 2022,
    mileage: "8.200 km",
    price: "R$ 780.000",
    transmission: "M Steptronic",
    fuel: "Gasolina",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    slug: "bmw-m4-competition-2022"
  },
  {
    id: "4",
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    year: 2021,
    mileage: "15.000 km",
    price: "Sob Consulta",
    transmission: "AMG Speedshift",
    fuel: "Gasolina",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop",
    featured: false,
    slug: "mercedes-benz-g63-amg-2021"
  }
];
