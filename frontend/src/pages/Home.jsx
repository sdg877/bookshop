import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AIOutlineEdit } from "react-icons/ai";
import { BSInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MDOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5555/books").then((response) => {
      setBooks(response.data.data);
      setLoading(false);
    })
  
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, []);
  <div className='p-4'>
  return <div className='flex justify-between items-center'>
    <h1 className='text-3xl my-8'>Books List</h1>
    <Link to='/books/create'>
    </Link>
  </div>

  </div>;
};

export default Home;
