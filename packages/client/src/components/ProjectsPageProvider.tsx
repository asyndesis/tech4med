import React, { createContext, useContext, useState } from "react";

export const ProjectPageContext = createContext<any>({});

export const useProjectPageContext = () => {
  const context = useContext(ProjectPageContext);
  if (!context) {
    throw new Error("useProjectPageContext must be used within a ProjectPageProvider");
  }
  return context;
};
