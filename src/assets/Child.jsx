export default function Child({ name }) {
  return (
    <div style={{ backgroundColor: 'lightblue', color: 'darkblue', padding: '10px' }}>
      <h3>hi</h3>
      <p>Name: {name}</p>
    </div>
  );
}