import { Children } from 'core/models';
import * as React from 'react';

type ContextState = (toast: string) => void;
const ToastContext = React.createContext({} as ContextState);

function useToast() {
  return React.useContext(ToastContext);
}

const AUTO_DISMISS = 3000;
// TODO: types
type ToastState = [toasts?: any, setToasts?: any];

// this would be included with AppProviders in core/context
function ToastProvider({ children }: { children: Children }) {
  const [toasts, setToasts] = React.useState<ToastState>([]);

  React.useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts: any) => toasts.slice(0, toasts.length - 1)),
        AUTO_DISMISS,
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = React.useCallback(
    toast => setToasts(toasts => [toast, ...toasts]),
    [],
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {toasts.map(toast => (
        <div key={toast}>{toast}</div>
      ))}
    </ToastContext.Provider>
  );
}

export { ToastProvider, useToast };
