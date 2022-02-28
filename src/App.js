import './styles.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className='app-content'>
                <Sidebar />
                <Dashboard />
            </div>
        </div>
    );
}

export default App;
