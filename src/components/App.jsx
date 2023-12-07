import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./ui/Theme";
import Button from "@material-ui/core/Button";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Hello
    </ThemeProvider>
  );
}

export default App;
