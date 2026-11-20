import Child from './Child';

export default function Parent() {
  return (
    <div style={{ backgroundColor: 'lightgray', color: 'black', padding: '20px' }}>
      <h2>hello</h2>
      <Child name="Piyush" />
    </div>
  );
}