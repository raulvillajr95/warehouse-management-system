export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string | null;
  minimumQuantity: number;
}
