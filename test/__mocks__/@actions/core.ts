export const info = jest.fn();
export const error = jest.fn((message) => console.error(message));
export const warning = jest.fn((message) => console.warn(message));
export const setFailed = jest.fn();
export const getInput = (key: string) => {
  if (key === "token") {
    return "SECRET";
  } else if (key === "key") {
    return "key-a";
  } else {
    return "1";
  }
};
