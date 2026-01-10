export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function shortenText(text, limit = 80) {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

export function formatPrice(price) {
  if (!price) return "Free";
  return "$" + Number(price).toFixed(2);
}

export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
