import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
  recipe,
  productionDate
}) => {
  const filtteredSteps = [];
  for (const productionStep of productionSteps) {
    const step = productionStep.step;

    const newEndDate = dayjs(endDate).endOf("day").valueOf();
    const neStartDate = dayjs(startDate).startOf("day").valueOf();

    // const prevDayProductionDate = dayjs(productionDate)
    //   .add(-1, "days")
    //   .startOf("day")
    //   .valueOf();
    // const nextDayProductionDate = dayjs(productionDate)
    //   .add(1, "days")
    //   .startOf("day")
    //   .valueOf();

    const stepProductionDate = dayjs(productionDate)
      .add(step.stepDate, "days")
      .startOf("day")
      .valueOf();

    const isAcceptedStepProductionDate =
      stepProductionDate >= neStartDate && stepProductionDate <= newEndDate;

    if (
      !step.productionSteps &&
      recipe.name === "Changement statuts PSE - Recette C"
      // recipe.name === "Création PSE - Recette B"
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
        productionDate: dayjs(productionDate)
          .startOf("day")
          .format("DD/MM/YYYY HH:mm"),
        stepProductionDate: dayjs(stepProductionDate)
          .startOf("day")
          .format("DD/MM/YYYY HH:mm"),
        // prevDayProductionDate: dayjs(prevDayProductionDate).format(
        //   "DD/MM/YYYY HH:mm"
        // ),
        // nextDayProductionDate: dayjs(nextDayProductionDate).format(
        //   "DD/MM/YYYY HH:mm"
        // ),
        isAcceptedStepProductionDate,
        startDate: dayjs(neStartDate).format("DD/MM/YYYY HH:mm"),
        endDate: dayjs(newEndDate).format("DD/MM/YYYY HH:mm")
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
        recipe: productionItem.recipe,
        productionDate: productionItem.productionDate
      });
    }
  }

  // const a = false; const b = true;
  // const a = false; const b = true;
  // console.log("-------------", (a && !b) || (b && !a))
  console.log("-------------");
  // dayjs(1704067200000).utc().isSame(dayjs(1704067200000).utc(), "day"));
};
