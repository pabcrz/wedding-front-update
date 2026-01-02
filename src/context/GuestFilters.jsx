import React, { createContext, useState } from "react";

// Crear el contexto para filtros de invitados
export const GuestFiltersContext = createContext();

// Provider del contexto
export function GuestFiltersProvider({ children }) {
  const [categoryFilter, setCategoryFilter] = useState(null);

  return (
    <GuestFiltersContext.Provider value={{ categoryFilter, setCategoryFilter }}>
      {children}
    </GuestFiltersContext.Provider>
  );
}
