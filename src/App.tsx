import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CryptoDetail from "./components/CryptoDetail.tsx";
import CryptoList from "./components/CryptoList.tsx";
import CryptoWatchlist from "./components/CryptoWatchlist.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CryptoList/>}/>
                <Route path="/crypto/:id" element={<CryptoDetail/>}/>
                <Route path="/watchlist" element={
                    <CryptoWatchlist/>
                }/>
                <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
        </Router>
    );
}

export default App;
