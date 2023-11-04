import { Breadcrumbs, Typography } from "@mui/material";
import Link from "@/components/Link";

type BreadcrumbAccumulator = {
  prevPath: string;
  elements: JSX.Element[];
};

interface TopBreadcrumbsProps {
  parentProject: Project;
}

export default function TopBreadcrumbs({ parentProject }: TopBreadcrumbsProps) {
  const parentChain = parentProject?.parentChain ?? []; // array of project ancestors
  const projectWithAncestors = parentChain.concat(parentProject)?.filter(Boolean);

  // loop through
  const breadcrumbElements = projectWithAncestors.reduce(
    (acc: BreadcrumbAccumulator, item: Project, idx: number, arr: Project[]) => {
      const newPath = `${acc.prevPath}/${item.id}`;
      const isLastItem = idx === arr.length - 1;

      const element = (
        <Link key={item.id + idx} color="inherit" href={newPath} sx={{ textDecoration: "none" }}>
          <Typography fontWeight={isLastItem ? "bold" : "normal"}>{item.title}</Typography>
        </Link>
      );
      return {
        prevPath: newPath,
        elements: [...acc.elements, element],
      };
    },
    {
      // how do i make a type for this in TS?
      prevPath: "/project",
      elements: [],
    }
  ).elements;

  return breadcrumbElements.length > 0 ? (
    // if we have breadcrumbs
    <Breadcrumbs separator="/">{breadcrumbElements}</Breadcrumbs>
  ) : (
    // we are at the root level
    <Typography color="textPrimary">/</Typography>
  );
}
