// Sidebar.jsx
import { useTheme } from "../context/themeContext.jsx";

export default function Sidebar() {
  const { theme } = useTheme();
  return (
    <aside style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>Sidebar</h3>
      <p>Current theme: {theme}</p>
    </aside>
  );
}
