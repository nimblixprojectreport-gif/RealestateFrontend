import axios from "axios";

const USER_ID =
  localStorage.getItem("user_id") ||
  "11111111-1111-1111-1111-111111111111";

interface Property {
  id: string;
  property_name: string;
  property_type: string;
  image: string;
  is_favorite?: boolean;
}

interface Props {
  property: Property;
  onUpdate: () => void;
}

const PropertyCard = ({ property, onUpdate }: Props) => {

  const toggleFavorite = async () => {
    try {
      console.log("Clicked:", property.id);

      if (property.is_favorite) {
        // ❌ REMOVE FAVORITE
        await axios.delete(
          `http://127.0.0.1:8000/api/favorites/remove/?user_id=${USER_ID}&property_id=${property.id}`
        );
        console.log("Removed");
      } else {
        // ✅ ADD FAVORITE
        const res = await axios.post(
          "http://127.0.0.1:8000/api/favorites/",
          {
            user_id: USER_ID,
            property_id: property.id,
          }
        );
        console.log("Added:", res.data);
      }

      // 🔥 refresh UI
      onUpdate();

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={property.image} style={styles.image} />

        {/* ❤️ BUTTON */}
        <button onClick={toggleFavorite} style={styles.heart}>
          {property.is_favorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div style={styles.details}>
        <h3>{property.property_name}</h3>
        <p>{property.property_type}</p>
        <p style={styles.price}>₹25,000</p>
      </div>
    </div>
  );
};

export default PropertyCard;


/// ✅ STYLES (THIS FIXES YOUR ERROR)
const styles: any = {
  card: {
    width: "280px",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#ffffff",
    margin: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  heart: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#fff",
    borderRadius: "50%",
    border: "none",
    fontSize: "18px",
    padding: "6px",
    cursor: "pointer",
  },
  details: {
    padding: "10px",
  },
  price: {
    color: "green",
    fontWeight: "bold",
  },
};