import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="max-w-md w-full space-y-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900">Welcome!</h1>
                <p className="text-gray-600">Sign In to Continue</p>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Go to Login
                </button>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
