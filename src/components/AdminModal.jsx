import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { updateGuest } from "../pages/api/data";

import { RefreshGuests } from "../context/RefreshGuests";

export default function AdminModal({ open, onClose, guest }) {
  const { refreshGuests, setRefreshGuests } = useContext(RefreshGuests);

  const [confirmation, setConfirmation] = useState(false);
  const [newInfo, setNewInfo] = useState({
    _id: "",
    nombre: "",
    apellido: "",
    categoria: "",
    sexo: "",
    familia: "",
    asistencia: "",
    fullName: "",
  });

  useEffect(() => {
    if (guest) {
      setNewInfo({
        _id: guest._id,
        nombre: guest.nombre || "",
        apellido: guest.apellido || "",
        categoria: guest.categoria || "",
        sexo: guest.sexo || "",
        familia: guest.familia || "",
        asistencia: guest.asistencia || "",
        fullName: guest.fullName || "",
      });
    }
  }, [guest]);
  function handleNo(e) {
    e.preventDefault();
    setConfirmation(true);
    handleClose();
  }

  function handleYes(e) {
    e.preventDefault();
    setConfirmation(true);
    const newGuest = newInfo;
    console.log(newGuest);
    toast.promise(updateGuest(newGuest), {
      loading: "Confirmando...",
      success: (data) => {
        console.log(`${newInfo.fullName} actuliazado`);
        if (refreshGuests) {
          setRefreshGuests(false);
        } else {
          setRefreshGuests(true);
        }
        return `Invitado actualizado.`;
      },
      error: "Error al actualizar invitado.",
    });
    handleClose();
  }

  function handleClose() {
    onClose();
    setConfirmation(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") {
      setNewInfo((prevGuest) => ({
        ...prevGuest,
        [name]: value,
        fullName: value + " " + prevGuest.apellido,
      }));
    } else if (name === "apellido") {
      setNewInfo((prevGuest) => ({
        ...prevGuest,
        [name]: value,
        fullName: prevGuest.nombre + " " + value,
      }));
    } else {
      setNewInfo((prevGuest) => ({
        ...prevGuest,
        [name]: value,
      }));
    }
  };

  const inputClasses =
    "border-2 rounded-sm focus:outline-none border-mainBG px-2";
  return (
    // backdrop
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/30" : "invisible"}
      `}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`
          bg-white rounded-xl p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:bg-gray-200"
        >
          <img src="/icons/close.svg" alt="close icon" className="size-5" />
        </button>
        <div className="px-4">
          <div className="mx-auto py-4 w-full">
            <p className="text-lg text-center">
              Editando Informacion de <br />
              <strong>{" " + guest.fullName}</strong>
            </p>
            <form onSubmit={handleYes} className="text-black w-80">
              {!confirmation && <></>}
              <div className="flex gap-4 flex-col">
                <div className="flex flex-col justify-center gap-3">
                  <label htmlFor="nombre" className="flex flex-col text-lg">
                    Nombre:
                    <input
                      className={inputClasses}
                      type="text"
                      name="nombre"
                      value={newInfo.nombre}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="apellido" className="flex flex-col text-lg">
                    Apellido:
                    <input
                      className={inputClasses}
                      type="text"
                      name="apellido"
                      value={newInfo.apellido}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="familia" className="flex flex-col text-lg">
                    Familia:
                    <input
                      className={inputClasses}
                      type="text"
                      name="familia"
                      value={newInfo.familia}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex flex-col text-lg">
                    Categoria
                    <select
                      name="categoria"
                      value={newInfo.categoria}
                      onChange={handleChange}
                      className="border-2 bg-transparent rounded-sm focus:outline-none border-mainBG px-1"
                    >
                      <option value="Adulot">Adulto</option>
                      <option value="Niño">Niño</option>
                    </select>
                  </label>

                  <label className="flex flex-col text-lg">
                    Sexo
                    <select
                      name="sexo"
                      value={newInfo.sexo}
                      onChange={handleChange}
                      className="border-2 bg-transparent rounded-sm focus:outline-none border-mainBG px-1"
                    >
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                    </select>
                  </label>

                  <label className="flex flex-col text-lg">
                    Asistencia
                    <select
                      name="asistencia"
                      value={newInfo.asistencia}
                      onChange={handleChange}
                      className="border-2 bg-transparent rounded-sm focus:outline-none border-mainBG px-1"
                    >
                      <option value="sin confirmar">sin confirmar</option>
                      <option value="si">si</option>
                      <option value="no">no</option>
                    </select>
                  </label>
                </div>
                <p className="text-lg">¿Actualizar información?</p>
              </div>
              <div className="flex gap-4 px-14">
                <button
                  className="w-full hover:bg-red-400 rounded hover:text-white"
                  onClick={handleNo}
                >
                  No
                </button>
                <button
                  className="w-full hover:bg-mainBG p-2 rounded hover:text-secondaryFont"
                  onClick={handleYes}
                >
                  Si
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
