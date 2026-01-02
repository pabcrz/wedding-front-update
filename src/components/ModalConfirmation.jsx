import ShowLocation from "./ShowLocation";

export default function ModalConfirmation({ open, onClose, guest }) {
  function handleNo() {
    onClose();
    window.location.href = "/";
  }

  function handleYes() {
    onClose();
  }

  return (
    // backdrop
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/30" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl py-4 transition-all max-h-dvh overflow-y-scroll md:overflow-auto
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:bg-gray-200"
        >
          <img src="/icons/close.svg" alt="close icon" className="size-5" />
        </button>
        <div
          className={`text-center flex flex-col items-center w-auto
             ${guest.asistencia === "no" ? "max-w-[500px] px-4" : ""}
          `}
        >
          <div className="mx-auto py-4 text-center flex items-center flex-col">
            <p className="text-2xl font-semibold text-secondaryFont px-3">
              {guest.asistencia === "si"
                ? `¡Nos vemos en la boda, ${guest.fullName}!`
                : `Lamentamos que no puedas acompañarnos, ${guest.fullName}.`}
            </p>
            {guest.asistencia === "si" && (
              <>
                <ShowLocation />
                <p className="text-lg pt-2">
                  <strong>Boleto:</strong> {guest.categoria.toLowerCase()}
                </p>
              </>
            )}
            <p className="text-lg">¿Deseas confirmar a otro invitado?</p>
          </div>
          <div className="flex gap-4 w-1/2">
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
        </div>
      </div>
    </div>
  );
}
