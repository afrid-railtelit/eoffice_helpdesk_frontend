export function encodeString(value: string) {
  return btoa(value);
}

export function decodeString(value: string) {
  return atob(value);
}
