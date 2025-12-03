import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">Loading offers...</p>
    </div>
  );
}

export default Spinner;
