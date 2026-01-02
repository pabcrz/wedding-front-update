export default function ShowLocation() {
  return (
    <>
      <section className="flex flex-col text-center items-center pb-4 gap-2">
        <p className="">Te esperamos en:</p>
        <h2 className="text-mainFont text-3xl">Ex Hacienda La Resurrección</h2>
        <div>
          <h3 className="text-secondaryFont text-xl">
            José María Morelos y Pavón 1, La Resurrección.
          </h3>
          <h3 className="text-secondaryFont text-xl">
            C.P. 56200, Texcoco, México.
          </h3>
        </div>
        <iframe
          className="max-w-[90%] rounded-lg shadow-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.238259831083!2d-98.86129352396358!3d19.531381937517185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e7dd67ee1801%3A0x18a2f24b0ba94be4!2sEx%20Hacienda%20La%20Resurrecci%C3%B3n!5e0!3m2!1ses-419!2smx!4v1720715072423!5m2!1ses-419!2smx"
          width="500"
          height="300"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <section className="bg-secondaryBG w-full p-4">
        <h2 className="text-mainFont text-center font-medium text-3xl">
          Mesa de regalos
        </h2>
        <div className="flex md:justify-center flex-col md:flex-row items-center">
          <div className="w-1/2 grid justify-center">
            <a
              href="https://www.amazon.com.mx/wedding/share/Carlosyarely"
              target="_blank"
              className="hover:opacity-60"
            >
              <img
                src="/icons/amazon.svg"
                alt="amazon logo"
                width="100"
                height="100"
              />
            </a>
          </div>
          <div className="w-1/2 grid justify-center pb-4 md:pb-0">
            <a
              href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51484230"
              target="_blank"
              className="hover:opacity-60"
            >
              <img
                src="/icons/liverpool-logo.svg"
                alt="Liverpool logo"
                width="150"
                height="100"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
