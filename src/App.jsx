import DetailPage from "./pages/DetailPage";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage></Homepage>} />
      <Route path="/movie/:movieId" element={<DetailPage></DetailPage>} />
      <Route path="/search/:search" element={<SearchPage></SearchPage>} />
    </Routes>
  )
}

export default App
