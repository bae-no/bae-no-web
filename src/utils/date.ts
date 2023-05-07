export const addDate = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDate = (
  paramDate: string | Date,
  forms: "am/pm h:mm" | "yyyy.MM.dd. Day of the week" | "yyyyMMdd",
) => {
  if (forms === "am/pm h:mm") {
    const date = new Date(paramDate);
    const formatter = new Intl.DateTimeFormat("ko-KR", {
      hour: "numeric",
      minute: "numeric",
    });
    const time = formatter.format(date);

    return time;
  }

  if (forms === "yyyy.MM.dd. Day of the week") {
    const date = new Date(paramDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return `${year}.${month < 10 ? `0${month}` : month}.${
      day < 10 ? `0${day}` : day
    }. ${week}요일`;
  }

  if (forms === "yyyyMMdd") {
    const date = new Date(paramDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}${month < 10 ? `0${month}` : month}${
      day < 10 ? `0${day}` : day
    }`;
  }
};
