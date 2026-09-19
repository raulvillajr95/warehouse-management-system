interface InventoryFormProps {
  name: string;
  sku: string;
  quantity: number;
  location: string;
  minimumQuantity: number;

  setName: (value: string) => void;
  setSku: (value: string) => void;
  setQuantity: (value: number) => void;
  setLocation: (value: string) => void;
  setMinimumQuantity: (value: number) => void;

  onAddItem: () => void;
}

function InventoryForm({
  name,
  sku,
  quantity,
  location,
  minimumQuantity,
  setName,
  setSku,
  setQuantity,
  setLocation,
  setMinimumQuantity,
  onAddItem,
}: InventoryFormProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add Inventory Item</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Minimum Quantity"
        value={minimumQuantity}
        onChange={(e) => setMinimumQuantity(Number(e.target.value))}
      />

      <button onClick={onAddItem}>Add Item</button>
    </div>
  );
}

export default InventoryForm;
