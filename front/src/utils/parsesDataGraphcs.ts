import { ITransactionProps } from "../types/interfaces";

const parseDateString = (dateString: string): Date => {
  return new Date(dateString.replace(" ", "T"));
};

const filterLast10Days = (
  data: ITransactionProps[],
  categoryId?: string,
): ITransactionProps[] => {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  if (!categoryId || categoryId === "all") {
    return data.filter(
      (transaction) =>
        parseDateString(transaction.createdAt.toString()) >= tenDaysAgo,
    );
  }

  return data.filter(
    (transaction) =>
      parseDateString(transaction.createdAt.toString()) >= tenDaysAgo &&
      transaction.categoryId === categoryId,
  );
};

const filterLast10DaysExpense = (
  data: ITransactionProps[],
  categoryId?: string,
): ITransactionProps[] => {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  if (!categoryId || categoryId === "all") {
    return data.filter(
      (transaction) =>
        parseDateString(transaction.createdAt.toString()) >= tenDaysAgo &&
        transaction.type === "expense",
    );
  }

  return data.filter(
    (transaction) =>
      parseDateString(transaction.createdAt.toString()) >= tenDaysAgo &&
      transaction.type === "expense" &&
      transaction.categoryId === categoryId,
  );
};

const filterExpense = (
  data: ITransactionProps[],
  categoryId?: string,
): ITransactionProps[] => {
  if (!categoryId || categoryId === "all") {
    return data.filter((transaction) => transaction.type === "expense");
  }

  return data.filter(
    (transaction) =>
      transaction.type === "expense" && transaction.categoryId === categoryId,
  );
};

const filterLast10DaysRevenue = (
  data: ITransactionProps[],
  categoryId?: string,
): ITransactionProps[] => {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  if (!categoryId || categoryId === "all") {
    return data.filter(
      (transaction) =>
        parseDateString(transaction.createdAt.toString()) >= tenDaysAgo &&
        transaction.type === "revenue",
    );
  }

  return data.filter(
    (transaction) =>
      parseDateString(transaction.createdAt.toString()) >= tenDaysAgo &&
      transaction.type === "revenue" &&
      transaction.categoryId === categoryId,
  );
};

const filterRevenue = (
  data: ITransactionProps[],
  categoryId?: string,
): ITransactionProps[] => {
  if (!categoryId || categoryId === "all") {
    return data.filter((transaction) => transaction.type === "revenue");
  }

  return data.filter(
    (transaction) =>
      transaction.type === "revenue" && transaction.categoryId === categoryId,
  );
};

const formatDataForPlotly = (
  data: ITransactionProps[],
): { x: string[]; y: number[] } => {
  // Order data by date
  data.sort(
    (a, b) =>
      parseDateString(a.createdAt.toString()).getTime() -
      parseDateString(b.createdAt.toString()).getTime(),
  );

  return {
    x: data.map((transaction) =>
      parseDateString(transaction.createdAt.toString()).toISOString(),
    ),
    y: data.map((transaction) =>
      transaction.type === "expense" ? -transaction.amount : transaction.amount,
    ),
  };
};

export {
  filterLast10Days,
  formatDataForPlotly,
  filterLast10DaysExpense,
  filterLast10DaysRevenue,
  filterExpense,
  filterRevenue,
};
