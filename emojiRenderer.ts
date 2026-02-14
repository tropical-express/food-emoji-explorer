import { Emoji } from './emojiData';

export function getCode(emoji: string): string {
  return "U+" + emoji.codePointAt(0)!.toString(16).toUpperCase();
}

const recentlyCopied: Emoji[] = [];

export function renderEmojis(emojis: Emoji[], grid: HTMLDivElement, recentBar?: HTMLDivElement) {
  grid.innerHTML = "";

  emojis.forEach(e => {
    const div = document.createElement("div");
    div.className = "emoji";
    div.innerHTML = `${e.char}<span class="tooltip">${e.name} (${getCode(e.char)})</span>`;

    div.addEventListener("click", () => {
      navigator.clipboard.writeText(e.char);
      div.classList.add("copied");
      setTimeout(() => div.classList.remove("copied"), 1000);

      if (recentBar) addToRecent(e, recentBar);
    });

    grid.appendChild(div);
  });
}

function addToRecent(emoji: Emoji, bar: HTMLDivElement) {
  const index = recentlyCopied.findIndex(e => e.char === emoji.char);
  if (index !== -1) recentlyCopied.splice(index, 1);

  recentlyCopied.unshift(emoji);
  if (recentlyCopied.length > 10) recentlyCopied.pop();

  bar.innerHTML = "";
  recentlyCopied.forEach(e => {
    const div = document.createElement("div");
    div.className = "emoji";
    div.textContent = e.char;
    div.title = e.name;
    div.addEventListener("click", () => navigator.clipboard.writeText(e.char));
    bar.appendChild(div);
  });
}
