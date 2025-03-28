import { differenceInSeconds } from "date-fns";
import { CountdownContainer, Separator } from "./style";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../..";

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCyclesAsFinished } =
    useContext(CyclesContext);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const totalSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0; /* se o ciclo atual existir */

  useEffect(() => {
    /* se tiver um ciclo ativo, eu vou dar um intervalor de 1s e comprar a data atual com os segundos q ja passaram */
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondsDifference >= totalSeconds) {
          setAmountSecondsPassed(totalSeconds);
          markCurrentCyclesAsFinished();
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCyclesAsFinished]);

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
  }, [
    minutes,
    seconds,
    activeCycle,
  ]); /*fazer o time aparecer no title da pagina */
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
