import { useEffect } from 'react';
import useOnsaleStore from '../../stores/useOnsaleStore';
function Onsale() {
  const { onsaleData, getData } = useOnsaleStore();

  useEffect(() => {
    getData();
  }, []);

  console.log('onsaleData', onsaleData);

  return (
    <div>
      {onsaleData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        onsaleData.map((period, index) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h2>
              {period.date} {period.time} ({period.status})
            </h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {period.products.map((product) => (
                <div
                  key={index + product.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    width: '200px',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%' }}
                  />
                  <h3>{product.name}</h3>
                  <p>原價: ${product.price.origin}</p>
                  <p>特價: ${product.price.onsale}</p>
                  <p>折扣: {product.price.discount}折</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Onsale;
