import { useCallback, useEffect, useState } from "react";

function useAsyncInternal(
  func: (...args: any) => Promise<any>,
  deps: any,
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<any>(undefined);
  const [data, setData] = useState<any>(undefined);

  const execute = useCallback(
    async (...params: any) => {
      setLoading(true);
      setError(undefined);

      try {
        const result = await func(...params);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        setData(undefined);
        return undefined;
      } finally {
        setLoading(false);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );

  return { loading, error, data, execute };
}

export function useAsync(func: (...args: any) => Promise<any>, deps: any) {
  const { execute, ...state } = useAsyncInternal(func, deps, true);

  useEffect(() => {
    execute().catch(() => {});
  }, [execute]);

  return state;
}

export function useAsyncFn(func: (...args: any) => Promise<any>, deps: any) {
  return useAsyncInternal(func, deps, false);
}
