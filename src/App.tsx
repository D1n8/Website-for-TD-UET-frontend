import './style/css/App.css'
import AppRouter from './components/AppRouter'
import Header from './components/Header'

function App() {

  return (
    <div className="wrapper">
      <Header />
      <AppRouter />
    </div>
  )
}

export default App
