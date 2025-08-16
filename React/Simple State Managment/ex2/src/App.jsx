import Layout from "./components/Layout.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Layout/>
    </ThemeProvider>
  );
}