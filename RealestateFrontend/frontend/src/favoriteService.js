import API from "../api";

// ✅ GET favorites
export const getFavorites = () => API.get("/");

// ✅ ADD favorite
export const addFavorite = (property_id) => {
  return API.post("/", {
    property_id: property_id,
  });
};

// ✅ REMOVE favorite
export const removeFavorite = (property_id) => {
  return API.delete(`/api/remove/${property_id}/`);
};