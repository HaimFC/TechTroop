// Layout.jsx
import { useTheme } from "../context/themeContext.jsx";
import Header from "./Header.jsx";
import Content from "./Content.jsx";

export default function Layout() {
  const { theme } = useTheme();

  const bgColor = theme === "light" ? "#ffffff" : "#1a1a1a";
  const color = theme === "light" ? "#000000" : "#ffffff";

  return (
    <div style={{ backgroundColor: bgColor, color, minHeight: "100vh", padding: "20px" }}>
      <Header />
      <Content />
    </div>
  );
}
