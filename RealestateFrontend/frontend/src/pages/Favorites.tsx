import { useEffect, useState } from "react";
import axios from "axios";

const USER_ID =
  localStorage.getItem("user_id") ||
  "11111111-1111-1111-1111-111111111111";

/* ✅ SAME PROPERTIES AS HOME */
const properties = [
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
];

function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = () => {
    axios
      .get(`http://127.0.0.1:8000/api/favorites/?user_id=${USER_ID}`)
      .then((res) => {
        console.log("FAV DATA:", res.data); // 🔍 DEBUG
        setFavorites(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (property_id: string) => {
    await axios.delete(
      `http://127.0.0.1:8000/api/favorites/remove/?user_id=${USER_ID}&property_id=${property_id}`
    );
    loadFavorites();
  };

  /* ✅ MATCH FAVORITES WITH PROPERTIES */
  const favoriteProperties = properties.filter((prop) =>
    favorites.some((fav) => fav.property_id === prop.id)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Favorites ❤️</h1>

      {favoriteProperties.length === 0 ? (
        <p>No favorites added</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {favoriteProperties.map((p) => (
            <div key={p.id} style={styles.card}>
              <img src={p.image} style={styles.image} />

              <h3>{p.property_name}</h3>
              <p>{p.property_type}</p>

              <button
                onClick={() => removeFavorite(p.id)}
                style={styles.btn}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

/* STYLES */
const styles: any = {
  card: {
    width: "280px",
    margin: "10px",
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  btn: {
    marginTop: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};