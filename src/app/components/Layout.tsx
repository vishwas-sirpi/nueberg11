import { Outlet } from 'react-router';
import { ThemeProvider } from '../context/ThemeContext';

export function Layout() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
