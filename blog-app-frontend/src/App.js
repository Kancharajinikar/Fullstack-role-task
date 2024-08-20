
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList/BlogList';
import BlogDetail from './components/BlogDetail/BlogDetail';
import BlogForm from './components/BlogForm/BlogForm';
import Header from './components/Header/Header'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/posts/:id" element={<BlogDetail />} />
          <Route path="/new-post" element={<BlogForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
