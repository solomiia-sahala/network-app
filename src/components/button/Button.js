import './Button.css';

function Button({ label, callback, callbackParam }) {
  return (
    <button onClick={ callback.bind(this, callbackParam) }>{ label }
    </button>
  );
}

export default Button;