import { Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";

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

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  isActive: boolean;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<newCiclyFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: "",
    },
  });
  const activeCycle = cycles.find(
    (cycles) => cycles.id === activeCycleId
  ); /* busca dentro do ciclos o id do atual e retorna o primeiro q atender as especificações */
  console.log(activeCycle);

  useEffect(() => {
    /* se tiver um ciclo ativo, eu vou dar um intervalor de 1s e comprar a data atual com os segundos q ja passaram */
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  function handleCreateNewCyvle(data: newCiclyFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  const totalSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0; /* se o ciclo atual existir */
  const currentSeconds = activeCycle
    ? totalSeconds - amountSecondsPassed
    : 0; /* ele verifica o total dos segundos passados e subtrai os que passaram*/

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(
    2,
    "0"
  ); /* garante que a string tenha pelo menos 2 caracteres*/

  const seconds = String(secondsAmount).padStart(
    2,
    "0"
  ); /* garante que a string tenha pelo menos 2 caracteres*/

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
    }
  }, [minutes, seconds]); /*fazer o time aparecer no title da pagina */

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
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
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
