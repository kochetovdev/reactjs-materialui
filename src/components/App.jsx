import { ThemeProvider } from "@material-ui/core/styles";
import Header from "./ui/Header";
import { theme } from "./ui/Theme";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/services" element={<div>service</div>} />
        <Route path="/customsoftware" element={<div>customsoftware</div>} />
        <Route path="/mobileapps" element={<div>mobileapps</div>} />
        <Route path="/websites" element={<div>websites</div>} />
        <Route path="/revolution" element={<div>revolution</div>} />
        <Route path="/about" element={<div>about</div>} />
        <Route path="/contact" element={<div>contact</div>} />
        <Route path="/estimate" element={<div>estimate</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
