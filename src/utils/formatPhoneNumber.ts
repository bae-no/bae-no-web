export function formatPhoneNumber(value = "") {
  if (value.length <= 3) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");
  if (phoneNumber.length < 8)
    return phoneNumber.replace(/(\d{3})(\d{0,3})/, "$1-$2");
  return phoneNumber.replace(/(\d{3})(\d{0,4})(\d{0,4})/, "$1-$2-$3");
}
