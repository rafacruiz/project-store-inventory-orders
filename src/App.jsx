import { Routes, Route } from 'react-router';
import { Footer, Navbar } from './components/ui';
import { AnimatePresence } from 'motion/react';
import { PrivateRoute, RoleRoute } from './guards';
import { HomePage, ProductsDetailsPage, ProductsPage, ProductsAddPage, NotFoundPage, 
  LoginPage, WarehousePage, StoresPage, OrdersPage } from './pages';
import { WarehouseList, WarehouseSelect } from './components/shop-manager/warehouses';

function App() {
  
  return (
    <>
      <Navbar />

      <div className="d-flex flex-column min-vh-100">
        <AnimatePresence mode="wait">
          <Routes>            
            <Route path='/' element={ <LoginPage /> } />

            <Route 
              path='/dashboard' 
              element={ 
                <PrivateRoute>
                  <RoleRoute>
                    <HomePage />
                  </RoleRoute>
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
                  <RoleRoute>
                    <ProductsPage /> 
                  </RoleRoute>
                </PrivateRoute> } />

            <Route 
              path='/products/:id' 
              element={ 
                <PrivateRoute>
                   <RoleRoute>
                    <ProductsDetailsPage /> 
                   </RoleRoute>
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
                   <RoleRoute>
                    <StoresPage />
                   </RoleRoute>
                </PrivateRoute> } />

              <Route
                path='/orders'
                element={
                  <PrivateRoute>
                    <OrdersPage />
                  </PrivateRoute>
                } />

            <Route path='*' element={ <NotFoundPage /> } />
          </Routes>
        </AnimatePresence>
      </div>
      
      <Footer />
    </>
  )
}

export default App;