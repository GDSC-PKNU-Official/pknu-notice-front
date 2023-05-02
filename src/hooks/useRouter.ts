import { useNavigate } from 'react-router-dom';

const useRoter = () => {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routerTo: (path: string) => router(path),
  };
};

export default useRoter;
