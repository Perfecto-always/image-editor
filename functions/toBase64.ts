export function toBase64(arr: Uint8ClampedArray): string {
  return window.btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
}
