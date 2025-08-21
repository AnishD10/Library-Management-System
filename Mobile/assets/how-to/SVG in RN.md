React Native does not support SVG images with the standard Image component. To display SVGs, use the react-native-svg and react-native-svg-transformer packages.

**Steps:**

1. Install dependencies:

  ```bash
  npm install react-native-svg
  npm install --save-dev react-native-svg-transformer
  ```

2. Configure your metro.config.js:

  ```js
  const { getDefaultConfig } = require("expo/metro-config");

  module.exports = (() => {
    const config = getDefaultConfig(__dirname);
    config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
    config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
    config.resolver.sourceExts.push("svg");
    return config;
  })();
  ```

3. Import SVGs like components:

  ```tsx
  import AnalyticsSvg from "@/assets/images/undraw_analytics.svg";

  const UserDashboard = () => (
    <View>
     <Text>Welcome to UserDashboard</Text>
     <AnalyticsSvg width={200} height={200} />
    </View>
  );
  ```

**Note:**  

- Do not use the Image component for SVGs.
- Use the imported SVG as a React component and set width/height as needed.
