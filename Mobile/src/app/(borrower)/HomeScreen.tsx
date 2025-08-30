import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Dimensions, SafeAreaView, TextInput } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const SERVER = "https://library-management-system-ylrf.onrender.com";
const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.max(120, Math.min(160, width * 0.42));
const COVER_WIDTH = CARD_WIDTH * 0.7;
const COVER_HEIGHT = CARD_WIDTH * 1.05;

type DecodedToken = {
  id?: string;
  role?: string;
  borrowerId?: string;
  borrowerName?: string;
  borrowerEmail?: string;
  borrowedBooks?: string[];
  librarianId?: string;
  librarianName?: string;
  librarianEmail?: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; id?: string; email?: string }>({ name: "User", id: "", email: "" });
  const [books, setBooks] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [famousQuoteIndex, setFamousQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [borrowedStatus, setBorrowedStatus] = useState<Record<string, boolean>>({});
  const [borrowReturnMessage, setBorrowReturnMessage] = useState("");
  const [addToReadList, setAddToReadList] = useState<string[]>([]);
  const [addToReadMessage, setAddToReadMessage] = useState("");
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(3);
  const [search, setSearch] = useState("");

  // Get user from token on mount
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          setUser({
            name: decoded.borrowerName,
            id: decoded.borrowerId,
            email: decoded.borrowerEmail
            
          });
        } catch (e) {
          setUser({ name: "User", id: "" ,email: ""});
        }
      }
    })();
  }, []);

  // Fetch books and quotes
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${SERVER}/api/books`),
      axios.get(`${SERVER}/api/books`).catch(() => [])
    ])
      .then(([booksRes, quotesRes]) => {
        setBooks((booksRes.data as any[]) || []);
        setQuotes((quotesRes as any[]) || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // Quote carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setFamousQuoteIndex((prev) => (prev + 1) % famousQuotes.length);
        setFade(true);
      }, 600);
    }, 10000);
    return () => clearInterval(interval);
  });

  // Borrowed books status
  useEffect(() => {
    if (!user.id) return;
    axios
      .get(`${SERVER}/api/borrowers/${user.id}`)
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
  }, [user.id, books.length]);

  // Famous quotes logic
  const famousQuotes =
    quotes.length > 0
      ? quotes.map((q: any) => ({
          text: q.text || q.quote,
          author: q.author,
          cover: q.coverImage || q.cover,
        }))
      : books
          .filter((b: any) => b.quote && b.quote !== "No quote available.")
          .map((b: any) => ({
            text: b.quote,
            author: `${b.author}, ${b.title}`,
            cover: b.coverImage,
          }))
          .concat([
            {
              text: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
              author: "Antoine de Saint-Exupéry, The Little Prince",
              cover: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
            },
            {
              text: "All we have to decide is what to do with the time that is given us.",
              author: "J.R.R. Tolkien, The Fellowship of the Ring",
              cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
            },
            {
              text: "Not all those who wander are lost.",
              author: "J.R.R. Tolkien, The Fellowship of the Ring",
              cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
            },
            {
              text: "It does not do to dwell on dreams and forget to live.",
              author: "J.K. Rowling, Harry Potter and the Sorcerer's Stone",
              cover: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
            },
            {
              text: "Whatever our souls are made of, his and mine are the same.",
              author: "Emily Brontë, Wuthering Heights",
              cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
            },
          ]);

  // Categories
  const allCategories = [
    { key: "philosophy", label: "Philosophy", books: books.filter((b: any) => b.category?.toLowerCase() === "philosophy").slice(0, 6) },
    { key: "romance", label: "Romance", books: books.filter((b: any) => b.category?.toLowerCase() === "romance").slice(0, 6) },
    { key: "scifi", label: "Sci-Fi", books: books.filter((b: any) => b.category?.toLowerCase() === "scifi" || b.category?.toLowerCase() === "sci-fi").slice(0, 6) },
    { key: "history", label: "History", books: books.filter((b: any) => b.category?.toLowerCase() === "history").slice(0, 6) },
    { key: "fantasy", label: "Fantasy", books: books.filter((b: any) => b.category?.toLowerCase() === "fantasy").slice(0, 6) },
    { key: "mystery", label: "Mystery", books: books.filter((b: any) => b.category?.toLowerCase() === "mystery").slice(0, 6) },
    { key: "biography", label: "Biography", books: books.filter((b: any) => b.category?.toLowerCase() === "biography").slice(0, 6) },
    { key: "adventure", label: "Adventure", books: books.filter((b: any) => b.category?.toLowerCase() === "adventure").slice(0, 6) },
    { key: "selfhelp", label: "Self-Help", books: books.filter((b: any) => b.category?.toLowerCase() === "self-help").slice(0, 6) },
    { key: "science", label: "Science", books: books.filter((b: any) => b.category?.toLowerCase() === "science").slice(0, 6) },
  ];

  // Borrow/Return handler
  const handleBorrowOrReturn = async (book: any) => {
    if (!user.id) {
      Alert.alert("No user ID. Please log in again.");
      return;
    }
    const bookId = book._id || book.id;
    const isBorrowed = borrowedStatus[bookId];
    try {
      const token = await SecureStore.getItemAsync("token");
      await axios.post(
        `${SERVER}/api/records`,
        {
          bookId,
          borrowerId: user.id,
          status: isBorrowed ? "return" : "issue",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBorrowedStatus((prev) => ({
        ...prev,
        [bookId]: !isBorrowed,
      }));
      setBorrowReturnMessage(
        isBorrowed
          ? `"${book.title}" returned successfully!`
          : `"${book.title}" borrowed successfully!`
      );
      setTimeout(() => setBorrowReturnMessage(""), 2000);
    } catch (err: any) {
      console.log("Borrow error:", err.response?.data || err.message);
      Alert.alert("Failed to update borrow status.");
    }
  };

  // Add to Read handler
  const handleAddToRead = (bookTitle: string) => {
    setAddToReadList((prev) =>
      prev.includes(bookTitle) ? prev : [...prev, bookTitle]
    );
    setAddToReadMessage(`"${bookTitle}" added to your Read list!`);
    setTimeout(() => setAddToReadMessage(""), 2000);
  };

  // Borrowed books
  const borrowedBookIds = Object.keys(borrowedStatus).filter((id) => borrowedStatus[id]);
  const borrowedBooks = books.filter((book: any) => borrowedBookIds.includes(book._id || book.id));

  // Filter books by search
  const filteredBooks = search
    ? books.filter(
        (b) =>
          b.title?.toLowerCase().includes(search.toLowerCase()) ||
          b.author?.toLowerCase().includes(search.toLowerCase())
      )
    : books;

  // UI
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181818" }}>
      {/* NAVIGATION BAR */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.replace("/(borrower)/HomeScreen")}>
          <Text style={styles.navLink}>Home</Text>
        </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push("/(borrower)/CategoryScreen")}>
          <Text style={styles.navLink}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(borrower)/ProfileScreen")}>
          <Image
            
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
      {/* SEARCH BAR */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search books or authors..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome, {user.name || "User"}</Text>

          {/* Quote Carousel */}
          <View style={styles.quoteBox}>
            <Text style={[styles.quoteText, { opacity: fade ? 1 : 0 }]}>
              "{famousQuotes[famousQuoteIndex]?.text?.slice(0, 120)}{famousQuotes[famousQuoteIndex]?.text?.length > 120 ? "..." : ""}"
            </Text>
            <Text style={[styles.quoteAuthor, { opacity: fade ? 1 : 0 }]}>
              - {famousQuotes[famousQuoteIndex]?.author}
            </Text>
            <Image
              source={{ uri: famousQuotes[famousQuoteIndex]?.cover }}
              style={styles.quoteCover}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                setFade(false);
                setTimeout(() => {
                  setFamousQuoteIndex((prev) => (prev + 1) % famousQuotes.length);
                  setFade(true);
                }, 600);
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* Add to Read Message */}
          {addToReadMessage ? (
            <Text style={styles.successMsg}>{addToReadMessage}</Text>
          ) : null}
          {/* Borrow/Return Message */}
          {borrowReturnMessage ? (
            <Text style={styles.successMsg}>{borrowReturnMessage}</Text>
          ) : null}

          {/* Categories */}
          <Text style={styles.sectionTitle}>Categories</Text>
          {allCategories.slice(0, visibleCategoryCount).map((category) => (
            <View key={category.key} style={styles.categoryBox}>
              <Text style={styles.categoryTitle}>{category.label}</Text>
              <FlatList
                data={category.books}
                horizontal
                keyExtractor={(item, index) => (item._id || item.id || `book-${index}`)}
                renderItem={({ item }) => {
                  const isBorrowed = borrowedStatus[(item._id || item.id || "") as string];
                  return (
                    <View style={styles.bookCard}>
                      <Image source={{ uri: item.coverImage }} style={styles.bookCover} resizeMode="cover" />
                      <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                      <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
                      <View style={{ flexDirection: "row" }}>
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
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ))}
          {/* Show More/Less Categories */}
          {allCategories.length > 3 && (
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() =>
                setVisibleCategoryCount((count) =>
                  count < allCategories.length ? Math.min(count + 3, allCategories.length) : 3
                )
              }
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {visibleCategoryCount < allCategories.length ? "Show More Categories" : "Show Less"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Borrowed Books */}
          <Text style={styles.sectionTitle}>Borrowed Books</Text>
          {borrowedBooks.length === 0 ? (
            <Text style={{ color: "#aaa", textAlign: "center" }}>No borrowed books.</Text>
          ) : (
            borrowedBooks.map((book: any) => (
              <View key={book._id || book.id} style={styles.borrowedBookCard}>
                <Image source={{ uri: book.coverImage }} style={styles.borrowedBookCover} resizeMode="cover" />
                <View>
                  <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                  <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#232323",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  navLink: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#444",
  },
  searchBarContainer: {
    backgroundColor: "#181818",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    backgroundColor: "#232323",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  container: { flex: 1, backgroundColor: "#181818", padding: width * 0.03 },
  title: { color: "#fff", fontSize: width < 350 ? 18 : 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  sectionTitle: { color: "#DC143C", fontSize: width < 350 ? 15 : 18, fontWeight: "bold", marginVertical: 14 },
  quoteBox: { backgroundColor: "#232323", borderRadius: 12, padding: width * 0.04, marginBottom: 14, alignItems: "center" },
  quoteText: { color: "#fff", fontSize: width < 350 ? 13 : 16, fontStyle: "italic", textAlign: "center", marginBottom: 6 },
  quoteAuthor: { color: "#aaa", fontSize: width < 350 ? 11 : 13, marginBottom: 6 },
  quoteCover: { width: COVER_WIDTH, height: COVER_HEIGHT, borderRadius: 8, marginBottom: 6 },
  nextBtn: { backgroundColor: "#DC143C", padding: 7, borderRadius: 8, marginTop: 2 },
  categoryBox: { marginBottom: 16 },
  categoryTitle: { color: "#fff", fontSize: width < 350 ? 13 : 16, fontWeight: "bold", marginBottom: 6 },
  bookCard: { backgroundColor: "#232323", borderRadius: 10, padding: 10, marginRight: 10, width: CARD_WIDTH, alignItems: "center" },
  bookCover: { width: CARD_WIDTH * 0.7, height: CARD_WIDTH * 1.05, borderRadius: 8, marginBottom: 6 },
  bookTitle: { color: "#fff", fontSize: width < 350 ? 11 : 13, fontWeight: "bold", textAlign: "center" },
  bookAuthor: { color: "#aaa", fontSize: width < 350 ? 9 : 11, textAlign: "center", marginBottom: 2 },
  readBtn: { backgroundColor: "#444", padding: 5, borderRadius: 6, marginRight: 4 },
  borrowBtn: { backgroundColor: "#DC143C", padding: 5, borderRadius: 6 },
  moreBtn: { backgroundColor: "#DC143C", padding: 10, borderRadius: 8, alignItems: "center", marginVertical: 8 },
  borrowedBookCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#232323", borderRadius: 10, padding: 8, marginBottom: 8 },
  borrowedBookCover: { width: 32, height: 48, borderRadius: 6, marginRight: 10 },
  successMsg: { color: "#0f0", textAlign: "center", marginVertical: 6, fontWeight: "bold", fontSize: width < 350 ? 11 : 13 },
});