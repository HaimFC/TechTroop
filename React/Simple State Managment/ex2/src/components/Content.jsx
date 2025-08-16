// Content.jsx
import { useTheme } from "../context/themeContext.jsx";
import Article from "./Article.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Content() {
  const { fontSize } = useTheme();
  const size = fontSize === "small" ? "14px" : fontSize === "large" ? "20px" : "16px";

  return (
    <main style={{ fontSize: size }}>
      <Article />
      <Sidebar />
    </main>
  );
}
