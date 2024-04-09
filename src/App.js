import CaseConvertor from './container/case_convertor/CaseConvertor';
import { Navbar } from './container/navbar/Navbar';
import { Pricing } from './container/pricing/Pricing';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NewsRoom from './container/news_room/NewsRoom';

function App() {

  return (
    <>
       
        <Router>
          <Navbar /> 
          
          <Routes>        
              <Route path="/" element={<CaseConvertor/>} />
              <Route path="/CaseConvertor" element={<CaseConvertor/>} />
              <Route path="/NewsRoom" element={<NewsRoom/>} />
              <Route path="/Pricing" element={<Pricing/>} />
          </Routes>
        
        </Router>


    </>
  );
}

export default App;
