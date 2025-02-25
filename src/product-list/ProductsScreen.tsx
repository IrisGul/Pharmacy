import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import api from "../api";
import { Product } from "../types"; // Importiere die Schnittstelle

const ProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Produkte:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Produkte</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={({ item }) => (
            <Text>{item.name} - ${item.price}</Text>
          )}
        />
      )}
    </View>
  );
};

export default ProductsScreen;
