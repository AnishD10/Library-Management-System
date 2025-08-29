import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

type User = {
  _id?: string;
  name?: string;
  email?: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User>({});
  const [borrowedBooks, setBorrowedBooks] = useState<string[]>([]);
  const [fine, setFine] = useState(0);
  const [readList, setReadList] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [borrowedStatus, setBorrowedStatus] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");

  // Get user from token
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        try {
          const decoded = jwtDecode<{ id?: string; name?: string; email?: string }>(token);
          setUser({ _id: decoded.id, name: decoded.name, email: decoded.email });
        } catch (e) {
          setUser({});
        }
      }
      // Load read list from storage
      const storedReadList = await SecureStore.getItemAsync("readList");
      if (storedReadList) {
        setReadList(JSON.parse(storedReadList));
      }
    })();
  }, []);

  // Fetch all books for mapping IDs to titles/authors/covers
  useEffect(() => {
    axios.get("http://192.168.18.199:3000/api/books").then(res => {
      setAllBooks(res.data as any[]);
    });
  }, []);

  useEffect(() => {
    if (user._id) {
      axios.get(`http://192.168.18.199:3000/api/borrowers/${user._id}`).then(res => {
        const data = res.data as { booksBorrowed?: string[]; fine?: number };
        setBorrowedBooks(data.booksBorrowed || []);
        setFine(data.fine || 0);
        // Set borrowed status for read list
        const statusMap: Record<string, boolean> = {};
        (data.booksBorrowed || []).forEach((bookId: string) => {
          statusMap[bookId] = true;
        });
        setBorrowedStatus(statusMap);
      });
    }
  }, [user._id]);

  // Remove from read list
  const handleRemoveFromReadList = async (bookId: string) => {
    const updated = readList.filter((b: any) => b._id !== bookId && b.id !== bookId);
    setReadList(updated);
    await SecureStore.setItemAsync("readList", JSON.stringify(updated));
    setMessage("Removed from Read list.");
    setTimeout(() => setMessage(""), 1500);
  };

  // Borrow from read list
  const handleBorrowFromReadList = async (book: any) => {
    if (!user._id) {
      Alert.alert("No user ID. Please log in again.");
      return;
    }
    const bookId = book._id || book.id;
    const isBorrowed = borrowedStatus[bookId];
    try {
      await axios.post(`http://192.168.18.199:3000/api/records`, {
        bookId,
        borrowerId: user._id,
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
      setTimeout(() => setMessage(""), 1500);
    } catch (err) {
      Alert.alert("Failed to update borrow status.");
    }
  };

  // Helper to get book details by id
  const getBookDetails = (bookId: string) => {
    return allBooks.find((b: any) => b._id === bookId || b.id === bookId);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#181818" }}>
      <View style={styles.container}>
        <Text style={styles.name}>{user.name || "User Name"}</Text>
        <Text style={styles.email}>{user.email || "user@email.com"}</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={async () => {
          await SecureStore.deleteItemAsync("token");
          Alert.alert("Logged out", "You have been logged out.");
          router.replace("/(auth)/LoginScreen");
        }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Borrowed Books</Text>
        {borrowedBooks.length === 0 ? (
          <Text style={styles.noBooks}>No borrowed books.</Text>
        ) : (
          borrowedBooks.map((bookId, idx) => {
            const book = getBookDetails(bookId);
            return (
              <Text key={idx} style={styles.bookItem}>
                {book ? `${book.title} by ${book.author}` : bookId}
              </Text>
            );
          })
        )}

        <Text style={styles.sectionTitle}>Read List</Text>
        {readList.length === 0 ? (
          <Text style={styles.noBooks}>No books in Read list.</Text>
        ) : (
          readList.map((book: any, idx) => (
            <View key={book._id || book.id || idx} style={styles.readListItem}>
              <Text style={styles.bookItem}>{book.title} by {book.author}</Text>
              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveFromReadList(book._id || book.id)}
                >
                  <Text style={{ color: "#fff", fontSize: 13 }}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.borrowBtn}
                  onPress={() => handleBorrowFromReadList(book)}
                >
                  <Text style={{ color: "#fff", fontSize: 13 }}>
                    {borrowedStatus[book._id || book.id] ? "Return" : "Borrow"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {message ? <Text style={styles.successMsg}>{message}</Text> : null}

        <Text style={styles.sectionTitle}>Fine</Text>
        <Text style={fine > 0 ? styles.fine : styles.noFine}>
          {fine > 0 ? `Outstanding Fine: ₹${fine}` : "No outstanding fines."}
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 24 },
  name: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  email: { color: "#aaa", fontSize: 16, marginBottom: 20 },
  logoutBtn: { backgroundColor: "#DC143C", padding: 10, borderRadius: 8, marginBottom: 20, marginTop: 10 },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  sectionTitle: { color: "#DC143C", fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 8 },
  noBooks: { color: "#aaa", fontSize: 16 },
  bookItem: { color: "#fff", fontSize: 16, marginVertical: 2 },
  readListItem: { backgroundColor: "#232323", borderRadius: 8, padding: 10, marginVertical: 6, width: "100%" },
  removeBtn: { backgroundColor: "#444", padding: 6, borderRadius: 6, marginRight: 8 },
  borrowBtn: { backgroundColor: "#DC143C", padding: 6, borderRadius: 6 },
  fine: { color: "#DC143C", fontSize: 16, marginTop: 8 },
  noFine: { color: "#0f0", fontSize: 16, marginTop: 8 },
  successMsg: { color: "#0f0", textAlign: "center", marginVertical: 8, fontWeight: "bold" },
});