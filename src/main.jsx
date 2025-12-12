import { Suspense, lazy } from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/cart'
import { AuthProvider } from './context/AuthContext';
import { WishListProvider } from './context/WishListContext';
import { LoaderProvider } from "./context/LoaderContext";
import { injectSpeedInsights } from "@vercel/speed-insights";
import FallbackLoader from "./componments/FallbackLoader.jsx";

injectSpeedInsights();

const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <WishListProvider>
      <CartProvider>
        <AuthProvider>
          <LoaderProvider>
            <Suspense fallback={<FallbackLoader />}>
              <App />
            </Suspense>          
          </LoaderProvider>
        </AuthProvider>
      </CartProvider>
    </WishListProvider>
  </BrowserRouter>
)
