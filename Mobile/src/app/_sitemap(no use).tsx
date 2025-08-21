import {
  Link,
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Text, View } from "react-native";

export default function Sitemap() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const auth = "/(auth)" as RelativePathString;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Registered Routes
      </Text>
      <Text style={{ marginTop: 10 }}>
        {/* {JSON.stringify(router(), null, 2)} */}
      </Text>
      <Link href={auth}>
        <Text style={{ marginTop: 20, fontWeight: "bold" }}>
          Current Params
        </Text>
      </Link>
      <Text>{JSON.stringify(params, null, 2)}</Text>
    </View>
  );
}
