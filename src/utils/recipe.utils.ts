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
