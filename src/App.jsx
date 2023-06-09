import './App.scss'
import Header from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { Routers } from './config/Routers'

function App() {

  return (
    <>
      <Header/>
      <Routers/>
      <Footer/>
    </>
  )
}

export default App
