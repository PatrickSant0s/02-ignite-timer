import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from "./style";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo tem que ser no minimo 5 minutos")
    .max(60, "O ciclo tem que ser no máximo 60 minutos"),
});

// interface newCiclyFormData {
//   task: string;
//   minutesAmount: number;
// }

type newCiclyFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch } = useForm<newCiclyFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: "",
    },
  });

  function handleCreateNewCyvle(data: newCiclyFormData) {
    console.log(data);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <>
      <HomeContainer>
        <form action="" onSubmit={handleSubmit(handleCreateNewCyvle)}>
          <FormContainer>
            <label htmlFor="task"> Vou trabalhar em </label>
            <TaskInput
              id="task"
              placeholder="Dê um nome para o seu projeto"
              list="task-suggestions"
              {...register("task")}
            />

            <datalist id="task-suggestions">
              <option value="Projeto 1"></option>
              <option value="Projeto 2"></option>
              <option value="Projeto 3"></option>
            </datalist>
            <label htmlFor="">durante</label>
            <MinutesAmountInput
              type="number"
              id="minutesAmount"
              placeholder="00"
              step={5}
              min={5}
              max={60}
              {...register("minutesAmount", { valueAsNumber: true })}
            />
            <span>minutos.</span>
          </FormContainer>

          <CountdownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountdownContainer>

          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        </form>
      </HomeContainer>
    </>
  );
}
