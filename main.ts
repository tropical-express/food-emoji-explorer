import { emojis } from './emojiData';
import { renderEmojis } from './emojiRenderer';

const grid = document.getElementById("emojiGrid") as HTMLDivElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const recentBar = document.getElementById("recentCopied") as HTMLDivElement;

renderEmojis(emojis, grid, recentBar);

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = emojis.filter(e =>
    e.name.toLowerCase().includes(term) || e.char.includes(term)
  );
  renderEmojis(filtered, grid, recentBar);
});
