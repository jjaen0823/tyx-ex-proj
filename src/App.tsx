import React from 'react';
import './App.css';
import ko_KR from 'antd-mobile/es/locales/ko-KR';
import { ConfigProvider, Tabs } from 'antd-mobile';

// const App = () => {
function App() {
  return (
    <ConfigProvider local={ko_KR}>
      <div className="App">
        {/* TODO 
          1. Routing 설정, Proxy 설정
            package.json 
              -> "proxy" : "localhost:3001 -> proxy에 적은 주소 (CORS를 피할 수 있는 방법)"
          2. antd Page Degisn - antd 로 각자 필요한 디자인 해오기
          3. backend 통신 - axios (AxiosIntercepter)
          4. response parsing
          5. React Parent-Child 구조
          
        */}
        <Tabs>
          <Tabs.Tab title="fruits" key="fruits">
            fruits
          </Tabs.Tab>
          <Tabs.Tab title="vegetables" key="vegetables">
            vegetables
          </Tabs.Tab>
          <Tabs.Tab title="animals" key="animals">
            animals
          </Tabs.Tab>
        </Tabs>
      </div>
    </ConfigProvider>
  );
}

export default App;
