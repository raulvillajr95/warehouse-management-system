import type { InventoryItem } from '../types/InventoryItem';

const API_URL = 'http://localhost:3001';

export async function getInventory(): Promise<InventoryItem[]> {
  const response = await fetch(`${API_URL}/inventory`);

  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }

  return response.json();
}

export async function createInventoryItem(
  item: Omit<InventoryItem, 'id'>,
): Promise<InventoryItem> {
  const response = await fetch(`${API_URL}/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('Failed to create inventory item');
  }

  return response.json();
}

export async function updateInventoryQuantity(
  id: string,
  quantity: number,
): Promise<InventoryItem> {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to update inventory item');
  }

  return response.json();
}

export async function deleteInventoryItem(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete inventory item');
  }
}
