import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import IdCard from '../pages/IdCard';
import NotFound from '../pages/NotFound';

function RoutingRule() {
  return (
  <BrowserRouter>
    {/* <Header /> */}
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/idcard" element={<IdCard />}></Route>
      {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
      <Route path="/family" element={<NotFound />}></Route>
      <Route path="/resident" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
  );
}


