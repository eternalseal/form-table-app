import { ToastProvider } from '../../Context/ToastContext/ToastContext';

type WithWrapper = {
  Wrapper: ({}: any) => JSX.Element;
};

export function setupWrapper() {
  let refObj: any = {};

  beforeEach(() => {
    refObj.Wrapper = function Wrapper({ children }: any) {
      return <ToastProvider>{children}</ToastProvider>;
    };
  });

  return refObj as WithWrapper;
}
