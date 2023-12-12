import About from "../About";
import Contact from "../Contact";
import CustomSoftware from "../CustomSoftware";
import Estimate from "../Estimate";
import LandingPage from "../LandingPage";
import MobileApps from "../MobileApps";
import Revolution from "../Revolution";
import Services from "../Services";
import Websites from "../Websites";

export const components = [
  { path: "/", Component: LandingPage },
  { path: "/services", Component: Services },
  { path: "/customsoftware", Component: CustomSoftware },
  { path: "/mobileapps", Component: MobileApps },
  { path: "/websites", Component: Websites },
  { path: "/revolution", Component: Revolution },
  { path: "/about", Component: About },
  { path: "/contact", Component: Contact },
  { path: "/estimate", Component: Estimate },
];
