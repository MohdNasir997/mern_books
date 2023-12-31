import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

function Book() {
    const baseUrl = "http://localhost:8000/api/books";    
    const [data,setData] = useState([]);
    const [isLoading,setisLoading] = useState(true);
    const [error,setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");


    useEffect(() => {
    
    const fetchData = async () => {

        try {
            
        
            let url = baseUrl;
            if(selectedCategory) {
              url += `?category=${selectedCategory}`
            }
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setisLoading(false)
        setData(jsonData);
        } catch (error) {
            console.log(error)
            setError("error loading data")
            setisLoading(false)
        }
    }
    fetchData();
    },[selectedCategory])




  return (
    <div>  
        <h1>Books</h1>
    
        <p>
      This is where we use NodeJs, Express & MongoDB to grab some data. The
      data below is pulled from a MongoDB database.
        </p>
      <Link to='/createbook'>+ add new book</Link>
        <div className="filters">
        <label>Categories</label>
        <select onChange={(e)=> setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="other">other</option>
        </select>
      </div>
       
       {isLoading ? (<p>
        ...loading
       </p>) :error ? (
        <p>{error}</p>
      ):( <ul className="books">
            {data.map( (book) => (
                <li key={book._id}>
                    <Link to={`/books/${book._id}`}>
                        <img src={`http://localhost:8000/uploads/${book.thumbnail}`} alt={`${book.title}`} />
                        <h3>{book.title}</h3>
                    </Link>
                </li>
            ))}
        </ul>)}
       
       
</div>
  )
}

export default Book