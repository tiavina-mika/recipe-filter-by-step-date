import * as Yup from "yup";

export const PSEToDoneSchema = Yup.object().shape({
  netWeight: Yup.number().required("Net weight required"),
});
