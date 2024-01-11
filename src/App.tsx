import { useState } from "react";
import dayjs from "dayjs";
import { Box, Button, Stack, Typography } from "@mui/material";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import {
  IPSEFormValues,
  IProductionStepExecution
} from "./types/productionStepExecution";
import PSEHeader from "./containers/PSEHeader";
import PSEToDoneDialogForm from "./containers/PSEToDoneDialogForm";
import Footer from "./components/Footer";

// dummy data
const data: IProductionStepExecution = {
  name: "Emincer le poirreaux",
  status: "TODO"
};

const App = () => {
  const [openPSEToDoneModal, setOpenPSEToDoneModal] = useState<boolean>(false);
  const [productionStepExecution, setProductionStepExecution] = useState<
    IProductionStepExecution
  >(data);

  const togglePSEToDoneModal = () => setOpenPSEToDoneModal(!openPSEToDoneModal);

  const handleConfirmPSEToDone = (values: IPSEFormValues) => {
    const newValues = {
      ...productionStepExecution,
      ...values,
      endTime: dayjs.utc().valueOf(),
      status: "DONE"
    };

    setProductionStepExecution(newValues as IProductionStepExecution);
    console.log("values", newValues);
  };

  const resetStep = () => setProductionStepExecution(data);

  const isTodo = productionStepExecution.status === "TODO";

  return (
    <Box
      className="flexColumn spaceBetween"
      sx={{ minHeight: "calc(100vh - 18px)" }}
    >
      <div className="flexCenter stretchSelf">
        {/* header */}
        <PSEHeader />

        {/* content */}
        <Box sx={{ mt: 6 }} className="flexCenter stretchSelf">
          <Button
            onClick={togglePSEToDoneModal}
            variant="contained"
            disabled={!isTodo}
          >
            {isTodo ? "Terminer l'étape" : "Etape terminée"}
          </Button>
        </Box>

        {/* result */}
        {!isTodo && (
          <Stack spacing={2} className="flexCenter stretchSelf" sx={{ mt: 2 }}>
            <Typography>
              Etape terminée à{" "}
              <em>
                {dayjs
                  .utc(productionStepExecution.endTime)
                  .format("HH[h]mm:ss")}
              </em>
            </Typography>
            <Button onClick={resetStep} variant="text">
              Réinitialiser l'étape
            </Button>
          </Stack>
        )}

        {/* form dialog */}
        <PSEToDoneDialogForm
          open={openPSEToDoneModal}
          onClose={togglePSEToDoneModal}
          onConfirm={handleConfirmPSEToDone}
        />
      </div>
      <Footer />
    </Box>
  );
};

export default App;
