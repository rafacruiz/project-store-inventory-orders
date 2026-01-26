import { Routes, Route } from 'react-router';
import { Footer, Navbar } from './components/ui';
import { PrivateRoute, RoleRoute } from './guards';
import { HomePage, ProductsDetailsPage, ProductsPage, ProductsAddPage, NotFoundPage, LoginPage, WarehousePage, StoresPage } from './pages';
import { WarehouseList, WarehouseSelect } from './components/shop-manager/warehouses';

function App() {
  
  return (
    <>
      <Navbar />

      <div className="d-flex flex-column min-vh-100">
        <Routes>
          
          <Route path='/' element={ <LoginPage /> } />

          <Route 
            path='/dashboard' 
            element={ 
              <PrivateRoute> 
                <HomePage /> 
              </PrivateRoute> } />

          <Route
            path='/warehouse'
            element={
              <PrivateRoute>
                <RoleRoute>
                  <WarehousePage />
                </RoleRoute>
              </PrivateRoute>
            }>
            <Route index element={ <WarehouseSelect />} />
            <Route path='/warehouse/:warehouseId' element={ <WarehouseList />} />
          </Route> 
          
          <Route 
            path='/products' 
            element={ 
              <PrivateRoute> 
                <ProductsPage /> 
              </PrivateRoute> } />

          <Route 
            path='/products/:id' 
            element={ 
              <PrivateRoute> 
                <ProductsDetailsPage /> 
              </PrivateRoute> } />

          <Route 
            path='/products/add' 
            element={ 
              <PrivateRoute> 
                <RoleRoute> 
                  <ProductsAddPage /> 
                </RoleRoute> 
              </PrivateRoute> } />
          
          <Route
            path='/stores'
            element={
              <PrivateRoute> 
                <StoresPage />
              </PrivateRoute> } />
              
          <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
      </div>
      
      <Footer />
    </>
  )
}

export default App;