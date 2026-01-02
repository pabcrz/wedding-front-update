import { useContext, useState } from "react";

import normalizeText from "../lib/normalizeText";
import ShowGuests from "./ShowGuests";

import AddGuest from "./AddGuest";

export default function AdminGuests({ guests }) {
  const [search, setSearch] = useState(""); // para buscar por invitado
  const [open, setOpen] = useState(false);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  const newGuests = guests.filter((guest) =>
    normalizeText(guest.fullName).includes(normalizeText(search))
  );

  function handleClick() {
    (e) => e.stopPropagation();
    setOpen(true);
  }
  return (
    <div className="min-h-dvh">
      <div className="flex justify-around">
        <div>
          <label htmlFor="search" className="px-2 text-xl">
            Buscar invitado:
          </label>
          <input
            name="search"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Ingresa un nombre"
            className="border-2 rounded border-mainBG focus:outline-none px-2"
          />
        </div>
        <button
          className="border rounded hover:bg-mainBG hover:text-secondaryFont p-1 px-4"
          onClick={handleClick}
        >
          Agregar Invitado
        </button>
      </div>
      <p className="text-2xl p-4">Selecciona un nombre: </p>
      <div className="flex flex-col gap-3 py-4 p-2 shadow-lg min-h-10 max-h-[85dvh] rounded-lg overflow-y-scroll">
        <ShowGuests
          guests={newGuests}
          onclick={() => {
            setOpen(true);
          }}
        />
      </div>
      <AddGuest open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
