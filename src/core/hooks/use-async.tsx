import * as React from 'react';

/*
 * Example usage:
 * const {data, error, status, run} = useAsync()
 * React.useEffect(() => {
 *  run(fetchPokemon(pokemonName))
 * }, [pokemonName, run])
 */

type Status = 'idle' | 'pending' | 'rejected' | 'resolved';
type Data = any; // TODO: add actual data types once defined

interface State {
  status: Status;
  data: Data | null;
  error: Error | null;
}

function useSafeDispatch(dispatch: React.Dispatch<State>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    args => (mounted.current ? dispatch(args) : void 0),
    [dispatch],
  );
}

const defaultInitialState: State = { status: 'idle', data: null, error: null };

function useAsync(initialState?: State) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{ status, data, error }, setState] = React.useReducer(
    // useReducer accepts 2 args.
    // the first is the reducer function which is called with...
    // s: the current state
    // a: whatever it is that the dispatch function (setState) is called with, often called an "action"
    (currentState: State, action: State) => ({ ...currentState, ...action }),
    // the second is the current state...
    initialStateRef.current,
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data: Data) => safeSetState({ data, status: 'resolved' }),
    [safeSetState],
  );
  const setError = React.useCallback(
    (error: Error) => safeSetState({ error, status: 'rejected' }),
    [safeSetState],
  );
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ]);

  const run = React.useCallback(
    promise => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's been passed isn't returning anything?`,
        );
      }
      safeSetState({ status: 'pending' });
      return promise.then(
        (data: Data) => {
          setData(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          return Promise.reject(error);
        },
      );
    },
    [safeSetState, setData, setError],
  );

  return {
    // same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
