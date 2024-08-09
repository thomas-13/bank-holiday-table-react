export const EventsTable = ({ events }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Bunting</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.date}</td>
              <td>{event.title}</td>
              <td>{event.bunting ? 'Yes' : 'No'}</td>
              <td>{event.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };