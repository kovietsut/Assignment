export const isDev = process.env.NODE_ENV === "development";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const envLog = (...data: any) => {
  if (isDev) {
    console.log(...data);
  }
};
