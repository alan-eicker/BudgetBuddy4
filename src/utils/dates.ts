export const formatDate = (date: Date) => {
  return new Date(date).toDateString();
};

export const isOverDue = (date: Date) => {
  return new Date(date) < new Date();
};
