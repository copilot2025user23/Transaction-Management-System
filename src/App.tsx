// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import TransactionForm from "./components/TransactionForm";
// import TransactionGrid from "./components/TransactionGrid";
// import AuthComponent from "./components/AuthComponent";
// import AuthService from "./Service/AuthService";
// import "./App.css";

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check if the user is already logged in
//   useEffect(() => {
//     const currentUser = AuthService.getCurrentUser();
//     if (currentUser) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Method to handle login success
//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   // Method to handle logout
//   const handleLogout = () => {
//     AuthService.logout();
//     setIsAuthenticated(false);
//   };

//   // Method to navigate to the TransactionGrid
//   const handleViewTransactions = () => {
//     window.location.href = "/view-transactions";
//   };

//   // Method to navigate back to the TransactionForm
//   const handleBackToForm = () => {
//     window.location.href = "/begin-transaction";
//   };

//   return (
//     <Router>
//       <div>
//         <h1>Transaction Management System</h1>
//         {!isAuthenticated ? (
//           // Render the login page
//           <AuthComponent onLoginSuccess={handleLoginSuccess} />
//         ) : (
//           <>
//             {/* App Header */}
//             <nav>
//               <button onClick={handleLogout}>Logout</button>
//               <a href="/begin-transaction">Begin Transaction</a>
//               <a href="/view-transactions">View Transactions</a>
//             </nav>

//             {/* Routes */}
//             <Routes>
//               <Route
//                 path="/"
//                 element={<Navigate to="/begin-transaction" />}
//               />
//               <Route
//                 path="/begin-transaction"
//                 element={<TransactionForm onViewTransactions={handleViewTransactions} />}
//               />
//               <Route
//                 path="/view-transactions"
//                 element={<TransactionGrid onBack={handleBackToForm} />}
//               />
//             </Routes>
//           </>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import TransactionGrid from "./components/TransactionGrid";
import AuthComponent from "./components/AuthComponent";
import "./App.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Method to handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Method to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear login state
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <h1>Transaction Management System</h1>
        <nav className="app-header">
          <div className="tabs">
            <Link to="/" className="tab">Home</Link>
            {!isAuthenticated ? (
              <Link to="/login" className="tab">Login</Link>
            ) : (
              <>
                <Link to="/begin-transaction" className="tab">Begin Transaction</Link>
                <Link to="/view-transactions" className="tab">View Transactions</Link>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <h2>Welcome to the Transaction Management System</h2>
                <p>
                  Manage your transactions securely and efficiently. Below are some best practices to keep your account safe:
                </p>
                <ul className="best-practices">
                  <li>
                    <strong>Beware of Fraud Alerts:</strong> Always verify the source of any transaction alerts. Do not share OTPs or sensitive information with anyone.
                  </li>
                  <li>
                    <strong>Avoid Spam:</strong> Do not click on suspicious links or respond to unsolicited emails or messages.
                  </li>
                  <li>
                    <strong>Secure Your Account:</strong> Use strong passwords and enable two-factor authentication wherever possible.
                  </li>
                  <li>
                    <strong>Monitor Transactions:</strong> Regularly review your transaction history to identify any unauthorized activity.
                  </li>
                  <li>
                    <strong>Report Issues:</strong> If you suspect fraud, contact customer support immediately.
                  </li>
                </ul>
              </div>
            }
          />
          <Route
            path="/login"
            element={<AuthComponent onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
  path="/begin-transaction"
  element={isAuthenticated ? <TransactionForm /> : <Navigate to="/login" />}
/>
<Route
  path="/view-transactions"
  element={isAuthenticated ? <TransactionGrid onBack={() => window.history.back()} /> : <Navigate to="/login" />}
/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;