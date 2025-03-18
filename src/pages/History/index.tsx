import { HistoryContainer, HistoryList } from "./style";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th> Duraçao</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td> concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td> concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td> concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td> concluído</td>
            </tr>    <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td> concluído</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
