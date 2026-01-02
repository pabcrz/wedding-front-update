import normalizeText from "./normalizeText";

export function categories(guests) {
  const male = guests.filter((guest) => normalizeText(guest.sexo) === "hombre");

  const female = guests.filter(
    (guest) => normalizeText(guest.sexo) === "mujer"
  );

  const man = male.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const boys = male.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const woman = female.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const girls = female.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const filterGuests = {
    male,
    female,
    man,
    woman,
    boys,
    girls,
  };

  return filterGuests;
}

export function filterGuests(guests, asistencia) {
  let guestsAsist = guests;

  if (asistencia) {
    guestsAsist = guests.filter(
      (guest) => normalizeText(guest.asistencia) === asistencia
    );
  }

  const male = guestsAsist.filter(
    (guest) => normalizeText(guest.sexo) === "hombre"
  );

  const female = guestsAsist.filter(
    (guest) => normalizeText(guest.sexo) === "mujer"
  );

  const man = male.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const boys = male.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const woman = female.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const girls = female.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const filterGuests = {
    guestsAsist,
    male,
    female,
    man,
    woman,
    boys,
    girls,
  };

  return filterGuests;
}
