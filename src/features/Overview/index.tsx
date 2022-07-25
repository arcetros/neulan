import { Header } from '@/components/Header';
import { MainLayout } from '@/components/Layout';
import { Condition } from './components/Condition';
import { Weekly } from './components';
import useDarkMode from '@/hooks/useDarkMode';

export function Overview() {
  const { toggleDarkMode } = useDarkMode();
  return (
    <MainLayout>
      <Header />
      <div className="h-full px-2 pb-8 lg:px-16 dark:bg-red-500">
        <Condition />
        <div className="my-8" />
        <Weekly />
        <span onClick={() => toggleDarkMode()} aria-hidden>
          Toggle Dark mode
        </span>
      </div>
    </MainLayout>
  );
}
