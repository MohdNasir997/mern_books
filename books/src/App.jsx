import { BrowserRouter as Router,Route,Routes } from "react-router-dom"

import Home from "./routes/home"
import About from "./routes/About/about"
import Header from "./components/header"
import Footer from "./components/footer"
import Book from "./Book/book"
import Singlebook from "./Book/singlebook"
import CreateBook from "./Book/createBook"
import EditBook from "./Book/editbook"

function App() {

  return (
     <>
     <Router>
     <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/books" element={<Book/>}/>
        <Route path="/books/:_id" element={<Singlebook/>}/>
        <Route path="/createbook" element={<CreateBook/>}/>
        <Route path="/editbook/:_id" element={<EditBook />} />
      </Routes>
      <Footer/>
     </Router>
     </>
  )
}

export default App
