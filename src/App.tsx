import { useState } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import PSEHeader from "./containers/PSEHeader";
import {
  formatProductionItems,
  getProductionStepsByStepDate
} from "./utils/recipe.utils";
import { productionItems } from "./utils/data/recipes";

const endDate = 1703980800000;
const startDate = 1703894400000;
const prevStartDate = dayjs(startDate).add(-1, "days").startOf("day").valueOf();
const nextEndDate = dayjs(endDate).add(1, "days").endOf("day").valueOf();

const formattedRecipes = formatProductionItems(productionItems);
// console.log("formattedRecipes", formattedRecipes);

getProductionStepsByStepDate({
  productionItems,
  startDate,
  endDate,
  prevStartDate,
  nextEndDate
});

// console.log("formattedRecipes", {
//   startDate: dayjs(startDate).format("DD/MM/YYYY HH:mm"),
//   endDate: dayjs(endDate).format("DD/MM/YYYY HH:mm"),
//   prevStartDate: dayjs(prevStartDate).format("DD/MM/YYYY HH:mm"),
//   nextEndDate: dayjs(nextEndDate).format("DD/MM/YYYY HH:mm"),
// });

const App = () => {
  return (
    <Box
      className="flexColumn spaceBetween"
      sx={{ minHeight: "calc(100vh - 18px)" }}
    >
      <div className="flexCenter stretchSelf">
        {/* header */}
        <PSEHeader />
      </div>
    </Box>
  );
};

export default App;
