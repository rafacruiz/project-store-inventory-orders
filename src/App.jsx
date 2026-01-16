import { Routes, Route } from 'react-router';
import { Navbar } from './components/ui';
import HomePage from './pages/home-page';
import ProductsPage from './pages/products-page';

function App() {
  
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/products' element={ <ProductsPage /> } />
      </Routes>
    </>
  )
}

export default App;