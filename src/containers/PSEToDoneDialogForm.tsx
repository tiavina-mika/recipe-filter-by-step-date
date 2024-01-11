import React, { useRef } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  styled
} from "@mui/material";

import { PSEToDoneSchema } from "../utils/validations/productionStepExecutionSchema";
import { IPSEFormValues } from "../types/productionStepExecution";

const sx = {
  title: {
    color: "#7C7C7C",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 1.37
  }
};

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    width: 357,
    padding: 10
  }
});

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (values: IPSEFormValues) => void;
};
const PSEToDoneDialogForm = ({ open, onClose, onConfirm }: Props) => {
  const formikRef = useRef();

  const handleConfirm = () => {
    (formikRef.current as any)?.submitForm();
  };

  const handleCancel = () => onClose();

  const handleSubmit = (values: IPSEFormValues) => {
    onConfirm(values);
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" sx={sx.title}>
        Saisissez le poids réel en sortie pour terminer l'étape de production.
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        <Formik
          initialValues={{ netWeight: null }}
          onSubmit={handleSubmit}
          innerRef={formikRef}
          validationSchema={PSEToDoneSchema}
        >
          {({ values, handleChange, handleBlur, errors }) => {
            return (
              <Form>
                <Stack>
                  <TextField
                    label="Poids réel en sortie"
                    variant="standard"
                    name="netWeight"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.netWeight}
                    error={!!errors.netWeight}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      )
                    }}
                  />
                  {errors.netWeight && (
                    <FormHelperText>{(errors as any).netWeight}</FormHelperText>
                  )}
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleCancel} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Terminer l'étape
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default PSEToDoneDialogForm;
