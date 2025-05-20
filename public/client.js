// public/client.js
document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('clientServicesList');

  try {
    const res = await fetch('/api/services');
    const services = await res.json();

    services.forEach(service => {
      const li = document.createElement('li');
      li.textContent = `${service.type}: ${service.description}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load services:', err);
  }
});
