import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/router/About";
import Acceuil from "./components/router/Acceuil";
import Contacts from "./components/router/Contacts";
import Hebergementweb from "./components/router/Hebergementweb";
import Nomdedomaine from "./components/router/Nomdedomaine";
import NotreEquipe from "./components/router/NotreEquipe";
import Portfolio from "./components/router/Portfolio";
import Publications from "./components/router/Publications";
import Services from "./components/router/Services";
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import { AnimatePresence, motion } from "framer-motion";
import MobileNav from "./components/Layout/MobileNav";
import HostingPlan from "./components/router/HostingPlan";
import Login from "./components/router/Login";
import Signin from "./components/router/Signin";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminPublications from "./components/router/AdminPublications";
import AdminTeam from "./components/router/AdminTeam";
import AdminProject from "./components/router/AdminProject";
import AdminUsers from "./components/router/AdminUsers";
import AdminProjectStacks from "./components/router/AdminProjectStacks";
import AdminResponsibilities from "./components/router/AdminResponsibilities";
import { AuthProvider } from './hooks/use-auth';

function App() {

  return (
    <AuthProvider>
      <Router>
        <NavBar/>
        <MobileNav/>
        <AnimatePresence>
          <Routes>
            <Route 
              path="/about" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} // Added duration
                >
                  <About />
                </motion.div>
              } 
            />
            <Route 
              path="/" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} // Added duration
                >
                  <Acceuil />
                </motion.div>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} 
                >
                  <Contacts />
                </motion.div>
              } 
            />
            <Route 
              path="/hebergement-web" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hebergementweb/>
                </motion.div>
              } 
            />
            <Route path="/hebergement-web/:id" element={<HostingPlan />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route 
              path="/nom-de-domaine" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} 
                >
                  <Nomdedomaine/>
                </motion.div>
              } 
            />
            <Route 
              path="/notre-equipe" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} 
                >
                  <NotreEquipe/>
                </motion.div>
              } 
            />
            <Route 
              path="/portfolio" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} // Added duration
                >
                  <Portfolio/>
                </motion.div>
              } 
            />
            <Route 
              path="/publication" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} // Added duration
                >
                  <Publications/>
                </motion.div>
              } 
            />
            <Route 
              path="/services" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} // Added duration
                >
                  <Services/>
                </motion.div>
              } 
            />
            <Route
              path="/admin"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AdminLayout />
                </motion.div>
              }
            >
              <Route
                path="publications"
                element={<AdminPublications />}
              />
              <Route
                path="team"
                element={<AdminTeam />}
              />
              <Route
                path="project"
                element={<AdminProject />}
              />
              <Route
                path="users"
                element={<AdminUsers />}
              />
              <Route
                path="project-stacks"
                element={<AdminProjectStacks />}
              />
              <Route
                path="responsibilities"
                element={<AdminResponsibilities />}
              />
            </Route>
          </Routes>
        </AnimatePresence>
        <Footer/>
      </Router>
    </AuthProvider>
  )
}

export default App
