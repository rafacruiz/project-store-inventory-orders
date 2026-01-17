import { Routes, Route } from 'react-router';
import { Footer, Navbar } from './components/ui';
import { HomePage, ProductsDetailsPage, ProductsPage } from './pages';

function App() {
  
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/products' element={ <ProductsPage /> } />
        <Route path='/products/:id' element={ <ProductsDetailsPage /> } />
      </Routes>

      <Footer />
    </>
  )
}

export default App;