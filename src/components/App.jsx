import { ThemeProvider } from "@material-ui/core/styles";
import Header from "./ui/Header";
import { theme } from "./ui/Theme";
import { Routes, Route } from "react-router-dom";
import Footer from "./ui/Footer";
import { useState } from "react";
import LandingPage from "./LandingPage";
import Services from "./Services";
import CustomSoftware from "./CustomSoftware";
import MobileApps from "./MobileApps";
import Websites from "./Websites";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Header
        value={value}
        setValue={setValue}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              setValue={setValue}
              setSelectedIndex={setSelectedIndex}
            />
          }
        />
        <Route
          path="/services"
          element={
            <Services setValue={setValue} setSelectedIndex={setSelectedIndex} />
          }
        />
        <Route
          path="/customsoftware"
          element={
            <CustomSoftware
              setValue={setValue}
              setSelectedIndex={setSelectedIndex}
            />
          }
        />
        <Route
          path="/mobileapps"
          element={
            <MobileApps
              setValue={setValue}
              setSelectedIndex={setSelectedIndex}
            />
          }
        />
        <Route
          path="/websites"
          element={
            <Websites setValue={setValue} setSelectedIndex={setSelectedIndex} />
          }
        />
        <Route path="/revolution" element={<div>revolution</div>} />
        <Route path="/about" element={<div>about</div>} />
        <Route path="/contact" element={<div>contact</div>} />
        <Route path="/estimate" element={<div>estimate</div>} />
      </Routes>
      <Footer
        value={value}
        setValue={setValue}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </ThemeProvider>
  );
}

export default App;
