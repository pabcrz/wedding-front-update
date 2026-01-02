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

  useEffect(() => {
    toast.promise(connection(), {
      loading: "Cargando invitados...",
      success: (data) => {
        setGuests(data.data.guests);
        setLoading(false);
        const dataGuests = filterGuests(data.data.guests);
        setGuestsFiltered(dataGuests.guestsAsist);
        setSelectedButton("Todos");
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

  function handleGuests(asistencia) {
    const data = filterGuests(guests, asistencia);
    let filteredData = data.guestsAsist;

    if (categoryFilter) {
      filteredData = applyCategoryFilter(filteredData, categoryFilter);
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

  function handleCategoryClick(category) {
    if (categoryFilter === category) {
      setCategoryFilter(null);
      handleGuests(selectedButton === "Todos" ? undefined : selectedButton);
    } else {
      setCategoryFilter(category);
      const asistencia = selectedButton === "Todos" ? undefined : selectedButton;
      const data = filterGuests(guests, asistencia);
      const filteredData = applyCategoryFilter(data.guestsAsist, category);
      setGuestsFiltered(filteredData);
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
                  handleGuests();
                  setSelectedButton("Todos");
                }}
              >
                Totales
              </button>
              <button
                className={getButtonClasses("si")}
                onClick={() => {
                  setCategoryFilter(null);
                  handleGuests("si");
                  setSelectedButton("si");
                }}
              >
                Que si asistiran
              </button>
              <button
                className={getButtonClasses("no")}
                onClick={() => {
                  setCategoryFilter(null);
                  handleGuests("no");
                  setSelectedButton("no");
                }}
              >
                Que no asistiran
              </button>
              <button
                className={getButtonClasses("sin confirmar")}
                onClick={() => {
                  setCategoryFilter(null);
                  handleGuests("sin confirmar");
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
