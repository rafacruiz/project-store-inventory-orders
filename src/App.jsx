
import { Routes, Route } from 'react-router';
import { Footer, Navbar } from './components/ui';
import { AnimatePresence } from 'motion/react';
import { PrivateRoute, RoleRoute } from './guards';
import { 
  HomePage, 
  ProductsDetailsPage, 
  ProductsPage, 
  ProductsAddPage, 
  NotFoundPage, 
  LoginPage, 
  WarehousePage, 
  StoresPage, 
  StoresOrdersPage, 
  StoresOrderFormPage, 
  StoresOrdersDetailsPage, 
  OrdersSummaryPage} from './pages';
import { WarehouseList, WarehouseSelect } from './components/shop-manager/warehouses';

function App() {
  
  return (
    <>
      <Navbar />

      <div className="d-flex flex-column min-vh-100">
        <AnimatePresence mode="wait">
          <Routes>            
          
            <Route 
              path='/' 
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
              path='/orders/summary' 
              element={ 
                <PrivateRoute> 
                  <RoleRoute> 
                    <OrdersSummaryPage /> 
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
              path='/stores/orders'
              element={
                <PrivateRoute>
                  <StoresOrdersPage />
                </PrivateRoute>
              } />

            <Route
              path='/stores/orders/new/:orderId'
              element={
                <PrivateRoute>
                  <StoresOrderFormPage />
                </PrivateRoute>
              } />

            <Route
              path='/stores/order/:detailOrderId/warehouse/:detailWarehouseId'
              element={
                <PrivateRoute>
                  <StoresOrderFormPage />
                </PrivateRoute>
              } />

            <Route
              path='/stores/order/:orderId/details'
              element={
                <PrivateRoute>
                  <StoresOrdersDetailsPage />
                </PrivateRoute>
              } />

            <Route path='*' element={ <NotFoundPage /> } />
            
            <Route path='/login' element={ <LoginPage /> } />
          </Routes>
        </AnimatePresence>
      </div>
      
      <Footer />
    </>
  )
}

export default App;