"use client";

import { ProjectPageContext } from "@/components/ProjectsPageProvider";
import { useState } from "react";

export default function ProjectLayout({ children }: any) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  return (
    <ProjectPageContext.Provider value={{ paginationModel, setPaginationModel }}>
      {children}
    </ProjectPageContext.Provider>
  );
}
