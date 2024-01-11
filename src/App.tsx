import { useState } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import PSEHeader from "./containers/PSEHeader";
import { formatProductionItems } from "./utils/recipe.utils";
import { productionItems } from "./utils/data/recipes";

const formattedRecipes = formatProductionItems(productionItems);
console.log("formattedRecipes", formattedRecipes);
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
