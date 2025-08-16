// Article.jsx
import { useTheme } from "../context/themeContext.jsx";

export default function Article() {
  const { theme } = useTheme();
  return (
    <article>
      <h1>Article Title</h1>
      <p>
        This content uses the {theme} theme. Notice how theme values come from context with no prop drilling!
      </p>
    </article>
  );
}
