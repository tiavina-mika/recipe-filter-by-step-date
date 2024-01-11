import { IProductSchemas } from "../types/productionSchemas.type";
import { productionSchemas } from "./data/productionSchema";

export const PRODUCTION_SCHEMA_BORDER_COLOR = "#E6E6E6";



export const productionSchemaBatchInitialValues = {
  productionDay: "2",
  packagingDay: "3",
  sellDays: [
    {
      brand: "FOODCHERI",
      days: ["2", "3"]
    },
    {
      brand: "SEAZON",
      days: []
    },
    {
      brand: "SEAZON_BE",
      days: []
    }
  ]
};

export const renderWeekDaysLabels = (dayNumbers: string[]): string => {
  const days = weekDaysOptions.filter((option) =>
    dayNumbers.includes(option.value)
  );
  const label = days.map((day) => day.label).join(", ");
  return label;
};

export const productionSchemaInitialValues = {
  name: "Nom du schéma de production",
  batches: [productionSchemaBatchInitialValues],
  isNew: true // if it's a creation
};

export const productionSchemasEmptyInitialValues = {
  productionSchemas: [productionSchemaInitialValues]
};

export const productionSchemasExistingInitialValues = {
  productionSchemas
};

export const getProductionSchemasInitialValues = (
  productionSchemas?: IProductSchemas
) => {
  if (productionSchemas?.length) {
    return {
      productionSchemas
    };
  }

  return productionSchemasEmptyInitialValues;
};
