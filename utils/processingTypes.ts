interface Processing {
  label: string;
  type: "dropdown" | "range";
  properties: Properties[];
}

interface Properties {
  name: string;
  method: (args: any) => Promise<void>;
}

export const Processing: Processing[] = [
  {
    label: "Desaturate",
    type: "dropdown",
    properties: [
      {
        name: "Min",
        method: async () => {
          const { imageProcessing } = await import("../functions/processing");
          imageProcessing.desaturater("min");
        },
      },
      {
        name: "Max",
        method: async () => {
          const { imageProcessing } = await import("../functions/processing");
          imageProcessing.desaturater("max");
        },
      },
      {
        name: "Luma",
        method: async () => {
          const { imageProcessing } = await import("../functions/processing");
          imageProcessing.desaturater("luma");
        },
      },
    ],
  },
];
