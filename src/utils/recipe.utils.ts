import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

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
  recipe,
  productionDate
}) => {
  const filtteredSteps = [];
  for (const productionStep of productionSteps) {
    const step = productionStep.step;
    const startDate1 = dayjs(prevStartDate)
      // .utc()
      .add(+step.stepDate, "days")
      .startOf("day")
      .valueOf();
    const endDate1 = dayjs(nextEndDate)
      // .utc()
      .add(-step.stepDate, "days")
      .endOf("day")
      .valueOf();

    const prevDayProductionDate = dayjs(productionDate)
      .add(-1, "days")
      .startOf("day")
      .valueOf();
    const nextDayProductionDate = dayjs(productionDate)
      .add(1, "days")
      .startOf("day")
      .valueOf();

    const isSameAsEndDate = dayjs(prevDayProductionDate).isSame(
      dayjs(endDate).utc(),
      "days"
    );
    const isSameAsStartDate = dayjs(nextDayProductionDate).isSame(
      dayjs(startDate).utc(),
      "days"
    );

    const stepProductionDate = dayjs(productionDate)
      .add(step.stepDate, "days")
      .startOf("day")
      .valueOf();

    const isOk2 = dayjs(stepProductionDate).isBetween(
      dayjs(startDate).utc().startOf("day"),
      dayjs(endDate).utc().endOf("day"),
      "day",
      "[]"
    );
    // const isOk2 = stepProductionDate >= startDate && stepProductionDate <= endDate

    if (
      !step.productionSteps &&
      recipe.name === "Changement statuts PSE - Recette C"
      // recipe.name === "Création PSE - Recette B"

      // (
      //   Math.round(dayjs(endDate1).diff(endDate, "day", true)) !== step.stepDate
      //   // || Math.round(dayjs(startDate1).diff(startDate, "day", true)) !== step.stepDate
      // )
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
        prevDayProductionDate: dayjs(prevDayProductionDate).format(
          "DD/MM/YYYY HH:mm"
        ),
        nextDayProductionDate: dayjs(nextDayProductionDate).format(
          "DD/MM/YYYY HH:mm"
        ),
        // isSamePrev: dayjs(prevDayProductionDate).isSame(dayjs(endDate).utc(), "days"),
        isSameAsEndDate,
        isSameAsStartDate,
        isOk:
          (isSameAsEndDate && !isSameAsStartDate) ||
          (isSameAsStartDate && !isSameAsEndDate),
        isOk2: isOk2,
        // productionDate: dayjs(productionDate).endOf("day").format("DD/MM/YYYY HH:mm"),
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
