import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';

function RoutingRule() {
  return (
    <div className="Route">
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutingRule;
