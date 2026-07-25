export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'pizza' | 'chicken' | 'wings' | 'drinks' | 'combos' | 'desserts';
  spicy?: boolean;
  prices?: {
    regular: number;
    medium: number;
    large: number;
  };
  prepTime?: string;
  ingredients?: string[];
  badge?: 'Mais Vendido' | 'Promoção' | 'Novo' | 'Especial do Chef';
  highlightCategory?: 'Especialidades' | 'Promoções' | 'Mais Pedidos' | 'Recomendados' | 'Novidades';
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  selectedSize?: 'regular' | 'medium' | 'large';
  selectedExtras?: ExtraOption[];
  removedIngredients?: string[];
  selectedSide?: string;
  notes?: string;
  finalPrice: number;
}

export interface TableOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedExtras?: ExtraOption[];
  removedIngredients?: string[];
  selectedSide?: string;
  notes?: string;
  totalItemPrice: number;
  image?: string;
}

export interface TableOrder {
  id: string;
  tableNumber: string;
  guestCount: number;
  items: TableOrderItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
  status: 'recebido' | 'preparacao' | 'quase_pronto' | 'a_caminho' | 'entregue';
  createdAt: string;
  paymentStatus: 'pendente' | 'pago';
  paymentMethod?: string;
  receiptId?: string;
}

export interface TableServiceRequest {
  id: string;
  tableNumber: string;
  type: 'garcom' | 'bebidas' | 'sobremesa' | 'talheres' | 'conta';
  label: string;
  timestamp: string;
  status: 'pendente' | 'atendido';
}

export interface TableRating {
  food: number;
  service: number;
  ambiance: number;
  waitTime: number;
  comment: string;
}

