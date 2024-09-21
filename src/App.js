import Header from "./components/Header/Header.jsx";
import Loading from "./components/Loading/Loading.js"
import AppRoutes from "./AppRoutes.js";
import { useLoading } from "./hooks/useLoading.js";
import setLoadingInterceptor from './interceptors/loadingInterceptor.js';
import { useEffect } from "react";

function App() {
  const {showLoading, hideLoading} = useLoading();
  useEffect (
    ()=>{
      setLoadingInterceptor({showLoading,hideLoading});
    },
    []
  );
  return (
    <>
      <Loading/>
      <Header/>
      <AppRoutes/>
    </>
  );
}

export default App;
