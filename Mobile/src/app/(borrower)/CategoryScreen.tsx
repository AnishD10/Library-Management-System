import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.max(120, Math.min(160, width * 0.42));

type DecodedToken = {
  id?: string;
  name?: string;
  email?: string;
};

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<string[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [borrowedStatus, setBorrowedStatus] = useState<Record<string, boolean>>({});
  const [addToReadList, setAddToReadList] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  // Get user id from token
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          setUserId(decoded.id || "");
        } catch {
          setUserId("");
        }
      }
    })();
  }, []);

  // Fetch all books and categories
  useEffect(() => {
    axios.get("https://library-management-system-ylrf.onrender.com/api/books")
      .then(res => {
        const data = res.data as { category?: string }[];
        const cats = Array.from(
          new Set(
            data
              .map((b) => b.category)
              .filter((cat): cat is string => typeof cat === "string" && !!cat)
          )
        );
        setCategories(cats);
        setBooks(res.data as any[]);
      });
  }, []);

  // Fetch borrowed status for user
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`https://library-management-system-ylrf.onrender.com/api/borrowers/${userId}`)
      .then((res) => {
        const data = res.data as { borrowedBooks?: string[] };
        const borrowedBooks = data.borrowedBooks || [];
        const statusMap: Record<string, boolean> = {};
        borrowedBooks.forEach((bookId: string) => {
          statusMap[bookId] = true;
        });
        setBorrowedStatus(statusMap);
      })
      .catch(() => setBorrowedStatus({}));
  }, [userId, books.length]);

  // Borrow/Return handler
  const handleBorrowOrReturn = async (book: any) => {
    if (!userId) {
      Alert.alert("No user ID. Please log in again.");
      return;
    }
    const bookId = book._id || book.id;
    const isBorrowed = borrowedStatus[bookId];
    try {
      await axios.post(`https://library-management-system-ylrf.onrender.com/api/records`, {
        bookId,
        borrowerId: userId,
        status: isBorrowed ? "return" : "issue",
      });
      setBorrowedStatus((prev) => ({
        ...prev,
        [bookId]: !isBorrowed,
      }));
      setMessage(
        isBorrowed
          ? `"${book.title}" returned successfully!`
          : `"${book.title}" borrowed successfully!`
      );
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      Alert.alert("Failed to update borrow status.");
    }
  };

  // Add to Read handler
  const handleAddToRead = (bookTitle: string) => {
    setAddToReadList((prev) =>
      prev.includes(bookTitle) ? prev : [...prev, bookTitle]
    );
    setMessage(`"${bookTitle}" added to your Read list!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const booksInCategory = selectedCategory
    ? books.filter((b) => b.category === selectedCategory)
    : [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#181818" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        {!selectedCategory ? (
          <FlatList
            data={categories}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => setSelectedCategory(item)}>
                <Text style={styles.category}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={styles.backBtn}>← Back to Categories</Text>
            </TouchableOpacity>
            <Text style={styles.selectedTitle}>{selectedCategory}</Text>
            {message ? <Text style={styles.successMsg}>{message}</Text> : null}
            <FlatList
              data={booksInCategory}
              keyExtractor={item => item._id || item.id}
              renderItem={({ item }) => {
                const isBorrowed = borrowedStatus[item._id || item.id];
                return (
                  <View style={styles.bookCard}>
                    <Image source={{ uri: item.coverImage }} style={styles.bookCover} resizeMode="cover" />
                    <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
                    <View style={{ flexDirection: "row", marginTop: 6 }}>
                      <TouchableOpacity
                        style={styles.readBtn}
                        onPress={() => handleAddToRead(item.title)}
                      >
                        <Text style={{ color: "#fff", fontSize: 12 }}>Add to Read</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.borrowBtn}
                        onPress={() => handleBorrowOrReturn(item)}
                      >
                        <Text style={{ color: "#fff", fontSize: 12 }}>{isBorrowed ? "Return" : "Borrow"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818", padding: 16 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: { backgroundColor: "#232323", borderRadius: 10, padding: 16, marginBottom: 12 },
  category: { color: "#DC143C", fontSize: 18, fontWeight: "bold" },
  backBtn: { color: "#DC143C", fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  selectedTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  bookCard: { backgroundColor: "#232323", borderRadius: 10, padding: 12, marginBottom: 14, alignItems: "center" },
  bookCover: { width: CARD_WIDTH * 0.7, height: CARD_WIDTH * 1.05, borderRadius: 8, marginBottom: 8 },
  bookTitle: { color: "#fff", fontSize: 14, fontWeight: "bold", textAlign: "center" },
  bookAuthor: { color: "#aaa", fontSize: 12, textAlign: "center", marginBottom: 4 },
  readBtn: { backgroundColor: "#444", padding: 6, borderRadius: 6, marginRight: 8 },
  borrowBtn: { backgroundColor: "#DC143C", padding: 6, borderRadius: 6 },
  successMsg: { color: "#0f0", textAlign: "center", marginVertical: 8 },
});