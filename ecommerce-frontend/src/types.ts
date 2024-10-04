// src/types.ts
export interface Product {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

