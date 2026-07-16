const https = require('https');

const query = `
  [out:json][timeout:25];
  (
    node["amenity"~"cafe|restaurant|bar|pub|fast_food|clinic|hospital"](around:5000,19.1983,72.9641);
    node["shop"](around:5000,19.1983,72.9641);
    node["leisure"~"fitness_centre|sports_centre"](around:5000,19.1983,72.9641);
  );
  out center 150;
`;

const req = https.request('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log(`Found ${parsed.elements ? parsed.elements.length : 0} elements`);
      const filtered = parsed.elements.filter(el => el.tags && el.tags.name);
      console.log(`Filtered (has name): ${filtered.length}`);
      
      const restaurants = filtered.filter(el => el.tags.amenity === 'restaurant');
      console.log(`Restaurants: ${restaurants.length}`);
    } catch(e) {
      console.error(e, data.substring(0, 100));
    }
  });
});
req.write(query);
req.end();
