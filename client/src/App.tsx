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

  useEffect(() => {
    fetch('http://localhost:3001/inventory')
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Warehouse Management System</h1>

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
