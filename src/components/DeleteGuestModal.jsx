import { useContext, useState } from "react";
import { toast } from "sonner";
import { deleteGuest } from "../pages/api/data";
import normalizeText from "../lib/normalizeText";
import { RefreshGuests } from "../context/RefreshGuests";

export default function DeleteGuestModal({ open, onClose, guest }) {
  const { refreshGuests, setRefreshGuests } = useContext(RefreshGuests);

  const [confirmation, setConfirmation] = useState(false);
  const [writeName, setWriteName] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [asist, setAsist] = useState("");

  function handleNo() {
    setConfirmation(true);
    handleClose();
  }

  function handleYes() {
    setConfirmation(true);
    setWriteName(normalizeText(guest.fullName));
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (confirmName === writeName) {
      setAsist("si");
      toast.promise(deleteGuest(guest._id), {
        loading: "Eliminanado...",
        success: (data) => {
          console.log(`Invitado: ${guest.fullName} ha sido eliminado`);
          handleClose();
          if (refreshGuests) {
            setRefreshGuests(false);
          } else {
            setRefreshGuests(true);
          }
          return `Invitado eliminado exitosamente.`;
        },
        error: "Error al eliminar invitado.",
      });
    } else {
      alert(`Debes escribir: ${normalizeText(guest.fullName)}`);
      return false;
    }
  }

  function handleClose() {
    onClose();
    setConfirmation(false);
  }
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
          bg-white rounded-xl p-6 transition-all w-96
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:bg-gray-200"
        >
          <img src="/icons/close.svg" alt="close icon" className="size-5" />
        </button>
        <div className="text-center">
          <div className="mx-auto py-4 w-full">
            {!confirmation && (
              <p className="text-xl">¿Deseas eliminar a {guest.fullName}?</p>
            )}
          </div>
          <div className="flex gap-4">
            {!confirmation && (
              <>
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
              </>
            )}
            {confirmation && (
              <div className="flex-col">
                <p className="text-lg">
                  Para confirmar que
                  <strong> {asist} quieres eliminar,</strong> escribe lo
                  siguiente: "<strong>{writeName}</strong>"
                </p>
                <form onSubmit={() => handleConfirm()}>
                  <input
                    type="text"
                    className="border-2 rounded-sm px-2 m-3 focus:outline-none border-mainBG"
                    onChange={(e) => setConfirmName(e.target.value)}
                  />
                  <button
                    className="border border-mainFont text-mainFont hover:bg-mainFont p-2 rounded hover:text-white"
                    onClick={handleConfirm}
                  >
                    Confirmar
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
