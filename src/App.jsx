import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import ScrollTop from "./components/ScrollTop";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import SVGFilterPage from "./pages/SVGFilterPage";
import SchemesGeneratorPage from "./pages/SchemesGeneratorPage";
import FormatConverterPage from "./pages/FormatConverterPage";
import './assets/scss/main.scss';

function App() {
  

  return (
    <BrowserRouter>
      <Routes> 
        <Route index element={<Home /> } />      
        <Route element={<AppLayout />}>   
          <Route path="/svg-filter-converter" element={<SVGFilterPage /> } />
          <Route path="/color-format-converter" element={<FormatConverterPage /> } />  
          <Route path="/schemes-generator" element={<SchemesGeneratorPage /> } />    
          <Route path="*" element={<PageNotFound />} />    
        </Route>    
      </Routes>    
      <ScrollTop />
    </BrowserRouter>
  )
}

export default App
