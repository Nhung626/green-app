import { useContext } from 'react';
import { ThemeContext } from '../theme';

const useTheme = () => {
  const { defaultColors } = useContext(ThemeContext);
  return defaultColors;
};

export default useTheme;