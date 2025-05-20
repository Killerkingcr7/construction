// Post a new service
document.getElementById('serviceForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const description = document.getElementById('description').value;

  try {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, description })
    });

    const data = await res.json();
    if (res.ok) {
      addServiceToList(data);
      document.getElementById('serviceForm').reset();
    } else {
      alert(data.message || 'Failed to post service');
    }
  } catch (err) {
    console.error(err);
    alert('Error posting service');
  }
});

// Fetch and display all services
async function loadServices() {
  try {
    const res = await fetch('/api/services');
    const services = await res.json();
    services.forEach(addServiceToList);
  } catch (err) {
    console.error('Failed to fetch services:', err);
  }
}

// Helper to display service in list
function addServiceToList(service) {
  const li = document.createElement('li');
  li.textContent = `${service.type}: ${service.description}`;
  document.getElementById('servicesList').appendChild(li);
}

// Initial load
loadServices();
