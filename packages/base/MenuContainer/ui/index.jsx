import "./index.css";

/**
 * MenuContainer är en wrapper som t.ex. sätter bakgrund, fixar
 * en viss storlek och ev. padding.
 *
 * Du kan lägga <MenuHeader> inuti children eller själv i denna komponent.
 */
/**
 * MenuContainer kan ta en "bgType" prop (ex. "palm", "gray", etc.)
 */
export function MenuContainer({ bgType = "palm", children }) {
  // Välj klasser beroende på bgType
  const containerClass = `menu-container ${bgType}`;

  return <div className={containerClass}>{children}</div>;
}
