import Provider from '@/components/Provider/index';
import Header from '@/components/Header/index';
import ModalsWrapper from '@/components/ModalsWrapper/index';
import Content from '@/components/Content/index';

export default function Home() {
  return (
    <Provider>
      <Header />
      <div className="container ">
          <ModalsWrapper />

        <div className="mt-[100px]">
        <Content/>

        </div>
      </div>
    </Provider>
  );
}
