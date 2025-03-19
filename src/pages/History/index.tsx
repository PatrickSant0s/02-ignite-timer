import { HistoryContainer, HistoryList, Status } from "./style";

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
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td> há dois meses</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
