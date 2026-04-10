import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";

const USER_ID =
  localStorage.getItem("user_id") ||
  "11111111-1111-1111-1111-111111111111";

function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  // ✅ 20 PROPERTIES WITH UUID IDs
  const loadProperties = () => {
    const data = [
      {
        id: "11111111-1111-1111-1111-111111111111",
        property_name: "Luxury Villa",
        property_type: "Villa",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        property_name: "Modern House",
        property_type: "House",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      },
      {
        id: "33333333-3333-3333-3333-333333333333",
        property_name: "Beach Villa",
        property_type: "Villa",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      },
      {
        id: "44444444-4444-4444-4444-444444444444",
        property_name: "Mountain Villa",
        property_type: "Villa",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      },
      {
        id: "55555555-5555-5555-5555-555555555555",
        property_name: "Glass House",
        property_type: "Villa",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      },
      {
        id: "66666666-6666-6666-6666-666666666666",
        property_name: "City Apartment",
        property_type: "Apartment",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      },
      {
        id: "77777777-7777-7777-7777-777777777777",
        property_name: "Luxury Penthouse",
        property_type: "Penthouse",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      },
      {
        id: "88888888-8888-8888-8888-888888888888",
        property_name: "Farm House",
        property_type: "Farmhouse",
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      },
      {
        id: "99999999-9999-9999-9999-999999999999",
        property_name: "Lake House",
        property_type: "House",
        image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      },
      {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        property_name: "Studio Apartment",
        property_type: "Studio",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
    ];

    setProperties(data);
  };

  // ✅ LOAD FAVORITES FROM BACKEND
  const loadFavorites = () => {
    axios
      .get(`http://127.0.0.1:8000/api/favorites/?user_id=${USER_ID}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProperties();
    loadFavorites();
  }, []);

  // ✅ MERGE FAVORITES
  const mergedData = properties.map((property) => {
    const isFavorite = favorites.some(
      (fav) => fav.property_id === property.id
    );

    return {
      ...property,
      is_favorite: isFavorite,
    };
  });

  return (
    <div>
      <h1>Properties</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {mergedData.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onUpdate={loadFavorites}   // ✅ IMPORTANT FIX
          />
        ))}
      </div>
    </div>
  );
}

export default Home;