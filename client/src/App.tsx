import { useEffect, useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string | null;
  minimumQuantity: number;
}

function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/inventory')
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error(err));
  }, []);

  const addInventoryItem = async () => {
    const response = await fetch('http://localhost:3001/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        sku,
        quantity,
        location,
        minimumQuantity,
      }),
    });

    if (!response.ok) {
      alert('Failed to add inventory item.');
      return;
    }

    const newItem = await response.json();

    setInventory([...inventory, newItem]);

    setName('');
    setSku('');
    setQuantity(0);
    setLocation('');
    setMinimumQuantity(0);
  };

  const deleteInventoryItem = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this inventory item?',
    );

    if (!confirmed) {
      return;
    }

    const response = await fetch(`http://localhost:3001/inventory/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      alert('Failed to delete inventory item.');
      return;
    }

    setInventory((currentInventory) =>
      currentInventory.filter((item) => item.id !== id),
    );
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Warehouse Management System</h1>

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

        <button
          onClick={addInventoryItem}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Add Item
        </button>
      </div>

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
                  {item.quantity}
                </td>

                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {item.location}
                </td>

                <td style={{ border: '1px solid black', padding: '8px' }}>
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
