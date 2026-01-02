export default function normalizeText(name) {
  // Convertir a minúsculas
  let lowerCaseName = name.toLowerCase();

  // Eliminar acentos
  let normalized = lowerCaseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return normalized;
}
