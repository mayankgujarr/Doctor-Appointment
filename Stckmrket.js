const fetchStockData = async () => {
  try {
    const response = await fetch('/api/stocks');
    const data = await response.json();
    renderStockList(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

const renderStockList = (stocks) => {
  const stockListElement = document.getElementById('stock-list');

  if (!stocks || stocks.length === 0) {
    stockListElement.innerHTML = '<p>No stock data available.</p>';
    return;
  }

  const stockList = document.createElement('ul');
  stocks.forEach(stock => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="symbol">${stock.symbol}</span>
      <span class="price">Price: ${stock.price}</span>
      <span class="volume">Volume: ${stock.volume}</span>
    `;
    stockList.appendChild(listItem);
  });

  stockListElement.innerHTML = '';
  stockListElement.appendChild(stockList);
};

document.addEventListener('DOMContentLoaded', fetchStockData);
