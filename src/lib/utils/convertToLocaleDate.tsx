export default function convertToLocaleDate(formattedDate: string): string {
  if (formattedDate === "today") {
    return formattedDate;
  }
  const [year, month, day] = formattedDate.split("-");
  return `${day}-${month}-${year}`;
}
