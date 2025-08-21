import NotFoundIllustration from "@/assets/svgs/NotFoundSvgIllustration.js";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import SoraTouchableHighlight from "../elements/soraTouchableHighlights";

export default function NotFoundScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // If there's no history, navigate to home
      router.replace("/");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Page Not Found",
          headerShown: true,
          headerLeft: () => (
            <SoraTouchableHighlight
              onPress={handleGoBack}
              style={styles.headerButton}
            >
              <FontAwesomeIcon icon={faArrowLeft} color="#3b82f6" size={20} />
            </SoraTouchableHighlight>
          ),
        }}
      />

      <View style={styles.container}>
        <NotFoundIllustration
          width={250}
          height={250}
          style={styles.illustration}
        />

        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.description}>
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </Text>

        <View style={styles.buttonContainer}>
          <SoraTouchableHighlight
            onPress={handleGoBack}
            style={[styles.button, styles.backButton]}
          >
            <View style={styles.buttonContent}>
              <FontAwesomeIcon icon={faArrowLeft} color="white" size={16} />
              <Text style={styles.buttonText}>Go Back</Text>
            </View>
          </SoraTouchableHighlight>

          <SoraTouchableHighlight
            onPress={() => router.replace("/")}
            style={[styles.button, styles.homeButton]}
          >
            <View style={styles.buttonContent}>
              <FontAwesomeIcon icon={faHome} color="white" size={16} />
              <Text style={styles.buttonText}>Go To Dashboard</Text>
            </View>
          </SoraTouchableHighlight>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  headerButton: {
    marginLeft: 15,
    padding: 8,
    borderRadius: 20,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f2937",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#4b5563",
    maxWidth: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#6b7280",
  },
  homeButton: {
    backgroundColor: "#3b82f6",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
});
