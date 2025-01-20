import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MainPage } from './pages/MainPage';
import { QuestPage } from './pages/QuestPage';
import { AuthProvider } from './components/AuthProvider';
import { PracticePage } from './pages/PracticePage';
import { QuizPage } from './pages/QuizPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/quest' element={<QuestPage />} />
            <Route path='/quiz' element={<QuizPage />} />
            <Route path='/practice' element={<PracticePage />} />
          </Routes>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
