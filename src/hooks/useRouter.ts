import { To, useNavigate } from 'react-router-dom';

const useRouter = () => {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routerTo: (path: To) => router(path),
    goBack: () => router(-1 as To),
  };
};

export default useRouter;
