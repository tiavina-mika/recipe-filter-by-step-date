export interface IPSEFormValues {
  netWeight: number;
}

export interface IProductionStepExecution extends Partial<IPSEFormValues> {
  endTime?: number;
  status: "TODO" | "DONE";
  name: string;
}
