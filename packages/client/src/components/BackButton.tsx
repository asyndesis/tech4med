import useQueryParams from "@/hooks/useQueryParams";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { queryString } = useQueryParams();

  // Remove the last segment from the url
  // I.E: project/1/2/3 -> project/1/2
  // but preserve the querystring. (We use it for filters and pagination)
  const navigateBack = () => {
    const segments = pathname.split("/");
    segments.pop();
    const baseUrl = segments.join("/") || "/";
    const query = queryString?.length > 0 ? `?${queryString}` : "";
    router.push(baseUrl + query);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isHome}
      startIcon={<ArrowBack />}
      onClick={() => {
        navigateBack();
      }}
    >
      Back
    </Button>
  );
}
