import { Config } from "../../model";

export const importConfig = async (): Promise<Config> => {
  // TODO import from Github Workflow folder instead of using faked data
  return {
    metrics: {
      ["percentages"]: {
        description:
          "Allow only a smaller spectrum of percentages. For safety reasons.",
        max: 95,
        min: 70,
      },
      ["small-numbers"]: {
        hidden: true,
      },
      ["large-numbers"]: {
        description: "This is very important data, because of its pure value.",
      },
    },
  };
};
