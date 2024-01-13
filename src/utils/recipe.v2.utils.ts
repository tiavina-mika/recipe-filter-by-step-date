import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const getStepProductionDateBetweenDates = ({
  startDate,
  endDate,
  productionDate,
  stepDate = 0
}) => {
  const newEndDate = dayjs(endDate).endOf("day").valueOf();
  const newStartDate = dayjs(startDate).startOf("day").valueOf();

  const stepProductionDate = dayjs(productionDate)
    .add(stepDate, "days")
    .startOf("day")
    .valueOf();

  const isAcceptedStepProductionDate =
    stepProductionDate >= newStartDate && stepProductionDate <= newEndDate;

  return isAcceptedStepProductionDate;
};

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

    // ------- just for log ------- //
    const newEndDate = dayjs(endDate).endOf("day").valueOf();
    const neStartDate = dayjs(startDate).startOf("day").valueOf();
    const stepProductionDate = dayjs(productionDate)
      .add(step.stepDate, "days")
      .startOf("day")
      .valueOf();
    // ------- just for log ------- //

    const isAcceptedStepProductionDate = getStepProductionDateBetweenDates({
      startDate,
      endDate,
      productionDate,
      stepDate: step.stepDate
    });

    if (
      // !step.productionSteps &&
      // // recipe.name === "Changement statuts PSE - Recette C"
      // recipe.name === "Création PSE - Recette B"
      isAcceptedStepProductionDate
    ) {
      console.log(
        [dayjs(stepProductionDate).startOf("day").format("DD/MM/YYYY HH:mm")],
        {
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
          isAcceptedStepProductionDate,
          startDate: dayjs(neStartDate).format("DD/MM/YYYY HH:mm"),
          endDate: dayjs(newEndDate).format("DD/MM/YYYY HH:mm")
        }
      );
    }
  }

  return filtteredSteps;
};
export const getProductionStepsByStepDate = ({
  productionItems,
  startDate,
  endDate
}) => {
  for (const productionItem of productionItems) {
    for (const section of productionItem.recipe.sections) {
      const newSteps = removeSteps({
        productionSteps: section.productionSteps,
        startDate,
        endDate,
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
