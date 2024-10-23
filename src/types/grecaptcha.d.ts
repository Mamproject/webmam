declare global {
  interface Window {
    onLoadGrecaptcha: () => void;
  }
}

export {};
