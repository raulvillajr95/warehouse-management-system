import { useEffect, useState } from 'react';
import type { InventoryItem } from './types/InventoryItem';
import {
  getInventory,
  createInventoryItem,
  updateInventoryQuantity,
  deleteInventoryItem as deleteInventoryItemApi,
} from './services/inventoryApi';
import InventoryForm from './components/InventoryForm';

function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingQuantity, setEditingQuantity] = useState(0);

  useEffect(() => {
    getInventory()
      .then((data) => setInventory(data))
      .catch((err) => console.error(err));
  }, []);

  const addInventoryItem = async () => {
    try {
      const newItem = await createInventoryItem({
        name,
        sku,
        quantity,
        location,
        minimumQuantity,
      });

      setInventory((currentInventory) => [...currentInventory, newItem]);

      setName('');
      setSku('');
      setQuantity(0);
      setLocation('');
      setMinimumQuantity(0);
    } catch {
      alert('Failed to add inventory item.');
    }
  };

  const deleteInventoryItem = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this inventory item?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteInventoryItemApi(id);

      setInventory((currentInventory) =>
        currentInventory.filter((item) => item.id !== id),
      );
    } catch {
      alert('Failed to delete inventory item.');
    }
  };

  const saveInventoryItem = async (id: string) => {
    try {
      const updatedItem = await updateInventoryQuantity(id, editingQuantity);

      setInventory((currentInventory) =>
        currentInventory.map((item) => (item.id === id ? updatedItem : item)),
      );

      setEditingId(null);
    } catch {
      alert('Failed to update inventory item.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Warehouse Management System</h1>

      <InventoryForm
        name={name}
        sku={sku}
        quantity={quantity}
        location={location}
        minimumQuantity={minimumQuantity}
        setName={setName}
        setSku={setSku}
        setQuantity={setQuantity}
        setLocation={setLocation}
        setMinimumQuantity={setMinimumQuantity}
        onAddItem={addInventoryItem}
      />

      {inventory.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Name
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>SKU</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Quantity
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Location
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {item.name}
                </td>

                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {item.sku}
                </td>

                <td
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    color:
                      item.quantity <= item.minimumQuantity ? 'red' : 'black',
                    fontWeight:
                      item.quantity <= item.minimumQuantity ? 'bold' : 'normal',
                  }}
                >
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editingQuantity}
                      onChange={(e) =>
                        setEditingQuantity(Number(e.target.value))
                      }
                      style={{ width: '60px' }}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>

                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {item.location}
                </td>

                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {editingId === item.id ? (
                    <button
                      onClick={() => saveInventoryItem(item.id)}
                      style={{
                        marginRight: '8px',
                        backgroundColor: '#198754',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditingQuantity(item.quantity);
                      }}
                      style={{
                        marginRight: '8px',
                        backgroundColor: '#0d6efd',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteInventoryItem(item.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
