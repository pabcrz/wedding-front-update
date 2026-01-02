import AdminModal from "./AdminModal";
import DeleteGuestModal from "./DeleteGuestModal";
import { useContext, useState } from "react";

import { RefreshGuests } from "../context/RefreshGuests";

export default function ShowGuests({ guests }) {
  const { refreshGuests, setRefreshGuests } = useContext(RefreshGuests);

  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState({});
  const [openDelete, setOpenDelete] = useState(false);

  function handleClick(elementGuest) {
    (e) => e.stopPropagation();
    setOpen(true);
    setGuest(elementGuest);
  }

  function handleDelete(elementGuest) {
    setGuest(elementGuest);
    setOpenDelete(true);
  }

  return (
    <>
      <div className="flex flex-wrap gap-1 ">
        {guests.map((elementGuest, i) => {
          return (
            <a
              href="#"
              key={i}
              onClick={() => handleClick(elementGuest)}
              className={`borderrounded-md px-3 p-1 w-[49%] border rounded-md hover:shadow-md relative
                       ${elementGuest.asistencia === "si" && "border-green-400"}
                      ${elementGuest.asistencia === "no" && "border-red-400"}`}
            >
              <button
                className="p-1 hover:opacity-60 absolute right-0 top-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(elementGuest);
                }}
              >
                <img
                  src="/icons/DeleteForever.svg"
                  alt="icono para borrar"
                  className="size-7"
                />
              </button>
              <p className="font-bold text-xl max-w-36 md:max-w-full">
                {i + 1}.{elementGuest.fullName}
              </p>
              <p className="text-lg">Familia: {elementGuest.familia}</p>
              <p className="text-lg">Categoria: {elementGuest.sexo} - {elementGuest.categoria}</p>
              <p
                className={`text-lg
                ${elementGuest.asistencia === "si" && "text-green-600"} 
                ${elementGuest.asistencia === "no" && "text-red-500"}
                `}
              >
                Asistencia: {elementGuest.asistencia}
              </p>
            </a>
          );
        })}
      </div>
      <AdminModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        guest={guest}
      ></AdminModal>
      <DeleteGuestModal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
        }}
        guest={guest}
      ></DeleteGuestModal>
    </>
  );
}
