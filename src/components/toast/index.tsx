import * as React from 'react';

const ToastContext = React.createContext(undefined);

function useToastContext() {
  return React.useContext(ToastContext);
}

// this would be included with AppProviders in core/context
function ToastProvider({ children }: { children: ChildNode }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(toasts => toasts.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = React.useCallback(
    function addToast(toast) {
      setToasts([...toasts, toast]);
    },
    [toasts],
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="wrapper">
        {toasts.map(toast => (
          <div className="toast">{toast}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { useToastContext, ToastProvider };

// example usage....

function Foo() {
  const [text, setText] = React.useState('');
  const addToast = useToastContext();

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleClick() {
    addToast(text);
  }

  return (
    <div>
      <input value={text} onChange={handleChange} />
      <button onClick={handleClick}>Toast me!</button>
    </div>
  );
}
