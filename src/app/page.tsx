import Provider from '@/components/Provider/index';
import Header from '@/components/Header/index';
import ModalsWrapper from '@/components/ModalsWrapper/ModalsWrapper';

export default function Home() {
  return (
    <Provider>
      <Header />
      <div className="container ">
        {/* <div className="w-full h-full"> */}
          <ModalsWrapper />
        {/* </div> */}
      </div>
    </Provider>
  );
}
