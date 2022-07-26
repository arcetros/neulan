import { VscGear } from 'react-icons/vsc';
import { Header } from '@/components/Header';
import { MainLayout } from '@/components/Layout';
import { Condition } from './components/Condition';
import { Weekly } from './components';

export function Overview() {
  return (
    <MainLayout>
      <Header />
      <div className="h-full px-2 pb-8 lg:px-16">
        <Condition />
        <div className="my-8" />
        <Weekly />
      </div>
    </MainLayout>
  );
}
