import { connection } from "../pages/api/data";
import { useState, useEffect, useContext } from "react";
import { Toaster, toast } from "sonner";

import MyChart from "./Chart";
import AdminGuests from "./AdminGuests";
import GuestInfo from "./GuestInfo";
import { RefreshGuests } from "../context/RefreshGuests";
import { GuestFiltersProvider, GuestFiltersContext } from "../context/GuestFilters";

import { filterGuests } from "../lib/filterGuest";

function AdminPanelContent() {
  const [refreshGuests, setRefreshGuests] = useState(false);
  const { categoryFilter, setCategoryFilter } = useContext(GuestFiltersContext);

  const [guests, setGuests] = useState([]);
  const [guestsFiltered, setGuestsFiltered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState("Todos");

  const [guestChart, setGuestChart] = useState({
    man: 0,
    woman: 0,
    boys: 0,
    girls: 0,
  });

  // Función para aplicar filtro de categoría
  function applyCategoryFilter(guestsList, category) {
    const data = filterGuests(guestsList);
    switch (category) {
      case "Hombres":
        return data.man;
      case "Mujeres":
        return data.woman;
      case "Niños":
        return data.boys;
      case "Niñas":
        return data.girls;
      default:
        return guestsList;
    }
  }

  useEffect(() => {
    toast.promise(connection(), {
      loading: "Cargando invitados...",
      success: (data) => {
        setGuests(data.data.guests);
        setLoading(false);
        
        // Reaplicar los filtros activos después de recargar los datos
        const asistencia = selectedButton === "Todos" ? undefined : selectedButton;
        const filteredData = filterGuests(data.data.guests, asistencia);
        
        let finalData = filteredData.guestsAsist;
        
        // Si hay filtro de categoría activo, aplicarlo también
        if (categoryFilter) {
          finalData = applyCategoryFilter(finalData, categoryFilter);
        }
        
        // Actualizar estadísticas del gráfico
        const chartData = {
          man: filteredData.man.length,
          woman: filteredData.woman.length,
          boys: filteredData.boys.length,
          girls: filteredData.girls.length,
        };
        
        setGuestsFiltered(finalData);
        setGuestChart(chartData);
        
        return `Invitados disponibles...`;
      },
      error: "Error",
    });
  }, [refreshGuests]);

  useEffect(() => {
    if (!loading) {
      handleGuests();
    }
  }, [loading]);

  function handleGuests(asistencia, categoryFilterOverride = undefined) {
    const data = filterGuests(guests, asistencia);
    let filteredData = data.guestsAsist;

    // Usar categoryFilterOverride si se proporciona, sino usar categoryFilter del estado
    const activeFilter = categoryFilterOverride !== undefined ? categoryFilterOverride : categoryFilter;
    
    if (activeFilter) {
      filteredData = applyCategoryFilter(filteredData, activeFilter);
    }

    const chartData = {
      man: data.man.length,
      woman: data.woman.length,
      boys: data.boys.length,
      girls: data.girls.length,
    };
    setGuestsFiltered(filteredData);
    console.log(filteredData);
    setGuestChart(chartData);
  }



  function handleCategoryClick(category) {
    if (categoryFilter === category) {
      setCategoryFilter(null);
      handleGuests(selectedButton === "Todos" ? undefined : selectedButton);
    } else {
      setCategoryFilter(category);
      const asistencia = selectedButton === "Todos" ? undefined : selectedButton;
      const data = filterGuests(guests, asistencia);
      const filteredData = applyCategoryFilter(data.guestsAsist, category);
      
      // Actualizar estadísticas del gráfico basadas en los datos filtrados
      const chartData = {
        man: data.man.length,
        woman: data.woman.length,
        boys: data.boys.length,
        girls: data.girls.length,
      };
      
      setGuestsFiltered(filteredData);
      setGuestChart(chartData);
    }
  }

  const getButtonClasses = (buttonType) =>
    `w-[80%] border rounded hover:bg-red-400 hover:text-white p-1 ${
      selectedButton === buttonType ? "bg-red-400 text-white" : ""
    }`;

  return (
    <>
      <Toaster richColors position="bottom-right" />

      <RefreshGuests.Provider value={{ refreshGuests, setRefreshGuests }}>
        <div className="flex flex-col justify-center p-4 min-w-full">
          <p>Aqui puedes ver los invitados: </p>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center gap-3 py-4 w-80">
              <button
                className={getButtonClasses("Todos")}
                onClick={() => {
                  setCategoryFilter(null);
                  handleGuests(undefined, null); // Pasar null explícitamente
                  setSelectedButton("Todos");
                }}
              >
                Totales
              </button>
              <button
                className={getButtonClasses("si")}
                onClick={() => {
                  setCategoryFilter(null);
                  handleGuests("si", null); // Pasar null explícitamente
                  setSelectedButton("si");
                }}
              >
                Que si asistiran
              </button>
              <button
                className={getButtonClasses("no")}
                onClick={() => {
                  setCategoryFilter(null);
                  handleGuests("no", null); // Pasar null explícitamente
                  setSelectedButton("no");
                }}
              >
                Que no asistiran
              </button>
              <button
                className={getButtonClasses("sin confirmar")}
                onClick={() => {
                  setCategoryFilter(null);
                  handleGuests("sin confirmar", null); // Pasar null explícitamente
                  setSelectedButton("sin confirmar");
                }}
              >
                Sin confirmar
              </button>
            </div>
            {guestChart && (
              <MyChart 
                {...guestChart} 
                onCategoryClick={handleCategoryClick}
                selectedCategory={categoryFilter}
              />
            )}
          </div>

          <div className="py-2 flex gap-3 flex-col">
            <GuestInfo 
              guestChart={guestChart} 
              categoryFilter={categoryFilter}
              onCategoryChange={(value) => {
                if (value) {
                  handleCategoryClick(value);
                } else {
                  setCategoryFilter(null);
                  handleGuests(selectedButton === "Todos" ? undefined : selectedButton);
                }
              }}
            />
          </div>
        </div>
        <AdminGuests guests={guestsFiltered} />
      </RefreshGuests.Provider>
    </>
  );
}

export default function AdminPanel() {
  return (
    <GuestFiltersProvider>
      <AdminPanelContent />
    </GuestFiltersProvider>
  );
}
