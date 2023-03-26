export const addDate = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDate = (paramDate: string | Date) => {
  const date = new Date(paramDate);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "numeric",
  });
  const time = formatter.format(date);

  return time;
};
