import { useColorMode } from "native-base";

export default function useThemeMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleThemeMode = () => {
    toggleColorMode();
  };

  return { colorMode, toggleThemeMode };
}
