/* eslint-disable @typescript-eslint/no-explicit-any */
export function encodeString(value: string) {
  return btoa(value);
}

export function decodeString(value: string) {
  return atob(value);
}

export function formatDateTime(isoString: string): {
  date: string;
  time: string;
} {
  const dateObj = new Date(isoString);

  const date = dateObj.toISOString().split("T")[0];

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const time = `${hours}:${minutes}${ampm}`;

  return { date, time };
}



