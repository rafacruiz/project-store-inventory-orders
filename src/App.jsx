import { Routes, Route } from 'react-router';
import { Footer, Navbar } from './components/ui';
import { HomePage, ProductsDetailsPage, ProductsPage, ProductsAddPage, NotFoundPage } from './pages';

function App() {
  
  return (
    <>
      <Navbar />

      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/products' element={ <ProductsPage /> } />
          <Route path='/products/:id' element={ <ProductsDetailsPage /> } />
          <Route path='/products/add' element={ <ProductsAddPage /> } />
          <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
      </div>
      
      <Footer />
    </>
  )
}

export default App;