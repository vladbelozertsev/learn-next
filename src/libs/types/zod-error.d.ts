export type ServerValidationError = {
  issues: {
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
  }[];
  name: "ZodError";
};
