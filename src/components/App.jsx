import { ThemeProvider } from "@material-ui/core/styles";
import Header from "./ui/Header";
import { theme } from "./ui/Theme";
import { Routes, Route } from "react-router-dom";
import Footer from "./ui/Footer";
import { useState } from "react";
import { components } from "./helpers";

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
        {components.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Component
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            }
          />
        ))}
      </Routes>
      <Footer
        setValue={setValue}
        setSelectedIndex={setSelectedIndex}
      />
    </ThemeProvider>
  );
}

export default App;
