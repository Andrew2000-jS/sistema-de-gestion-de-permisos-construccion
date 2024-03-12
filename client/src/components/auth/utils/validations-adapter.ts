type Values = {
  value: (v: string) => boolean;
  message: string;
};

export const valuesAdapter = (
  data: Record<string, Values>
): Record<string, any> =>
  Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {});

export const messageAdapter = (
  data: Record<string, Values>
): Record<string, string> =>
  Object.entries(data).reduce((acc, [key, message]) => {
    acc[key] = message.message;
    return acc;
  }, {});
