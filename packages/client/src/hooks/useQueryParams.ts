import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);

      for (const [name, value] of Object.entries(updates)) {
        if (value === null) {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      }

      return params.toString();
    },
    [searchParams]
  );

  // Function to set multiple query params using next/router's push
  const setQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      // Create the new query string
      const queryString = createQueryString(updates);

      // Update the URL with the new query string
      router.push(pathname + "?" + queryString);
    },
    [router, createQueryString]
  );

  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const queryParams = Object.fromEntries(current.entries());

  return {
    queryString: createQueryString(queryParams),
    queryParams,
    setQueryParams,
  };
}
