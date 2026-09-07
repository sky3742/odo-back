export const today = () => new Date().toISOString().slice(0, 10);

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00`));
}
