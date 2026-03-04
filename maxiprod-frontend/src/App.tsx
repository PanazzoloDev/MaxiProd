import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import AppRoutes from './Routes'
function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>

  )
}

export default App