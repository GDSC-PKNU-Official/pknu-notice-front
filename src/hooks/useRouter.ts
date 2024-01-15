import { To, useNavigate } from 'react-router-dom';

const useRouter = () => {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routerTo: (path: To) => router(path),
    replaceTo: (path: To) => router(path, { replace: true }),
    goBack: () => router(-1 as To),
  };
};

export default useRouter;
