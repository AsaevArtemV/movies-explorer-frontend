export function converterOfMinutesToHours(min) {
  let hours = Math.floor(min / 60);
  let minutes = min % 60; //остаток минут

  if (hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes > 0 ? `${minutes}м` : ""}`;
  }
}