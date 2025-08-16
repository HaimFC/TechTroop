// Header.jsx
import Navigation from "./Navigation.jsx";
import Controls from "./Controls.jsx";

export default function Header() {
  return (
    <header style={{ marginBottom: "20px" }}>
      <Navigation />
      <Controls />
    </header>
  );
}
