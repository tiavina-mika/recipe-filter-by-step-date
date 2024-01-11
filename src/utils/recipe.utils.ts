import dayjs from "dayjs";

export const formatProductionItems = (productionItems) => {
  return productionItems.map((productionItem) => {
    return {
      name: productionItem.recipe.name,
      recipe: {
        sections: productionItem.recipe.sections?.map((section) => ({
          productionSteps: section.productionSteps
        }))
      },
      productionDate: dayjs(productionItem.productionDate).format(
        "DD/MM/YYYY HH:mm"
      )
    };
  });
};

/* @ts-ignore */

const removeSteps = ({
  productionSteps = [],
  startDate,
  endDate,
  prevStartDate,
  nextEndDate,
  recipe
}) => {
  const filtteredSteps = [];
  for (const productionStep of productionSteps) {
    const step = productionStep.step;
    const startDate1 = dayjs(prevStartDate)
      .utc()
      .add(+step.stepDate, "days")
      .startOf("day")
      .valueOf();
    const endDate1 = dayjs(nextEndDate)
      .utc()
      .add(-step.stepDate, "days")
      .endOf("day")
      .valueOf();

    if (
      !step.productionSteps &&
      recipe.name === "Création PSE - Recette B" &&
      Math.round(dayjs(endDate1).diff(endDate, "day", true)) !== step.stepDate
    ) {
      console.log({
        objectId: step.objectId,
        recipe: recipe.name,
        step: step.name,
        dayDiff: step.stepDate,
        stepComponent: step.stepComponents?.[0]?.supplierItem?.name,
        stepComponent2:
          step.stepComponents?.[0]?.priorSteps?.stepComponents?.[0]
            ?.supplierItem?.name,
        startDate: dayjs(startDate).format("DD/MM/YYYY HH:mm"),
        endDate: dayjs(endDate).format("DD/MM/YYYY HH:mm"),
        prevStartDate: dayjs(startDate1).format("DD/MM/YYYY HH:mm"),
        nextEndDate: dayjs(endDate1).format("DD/MM/YYYY HH:mm"),
        calcDiff: Math.round(dayjs(endDate1).diff(endDate, "day", true))
      });
    }
  }

  return filtteredSteps;
};
export const getProductionStepsByStepDate = ({
  productionItems,
  startDate,
  endDate,
  prevStartDate,
  nextEndDate
}) => {
  for (const productionItem of productionItems) {
    for (const section of productionItem.recipe.sections) {
      const newSteps = removeSteps({
        productionSteps: section.productionSteps,
        startDate,
        endDate,
        prevStartDate,
        nextEndDate,
        recipe: productionItem.recipe
      });
    }
  }

  console.log("-------------");
};
