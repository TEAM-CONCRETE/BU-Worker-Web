export const useRouter = () => {
  return {
    back: () => {},
    forward: () => {},
    refresh: () => {},
    push: () => {},
    replace: () => {},
    prefetch: () => {},
  };
};

export const usePathname = () => {
  return "/";
};

export const useSearchParams = () => {
  return new URLSearchParams();
};
