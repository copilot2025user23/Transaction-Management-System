// import { PublicClientApplication, AccountInfo } from "@azure/msal-browser";

// const msalConfig = {
//   auth: {
//     clientId: "YOUR_AZURE_AD_CLIENT_ID", // Replace with your Azure AD Client ID
//     authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace with your Tenant ID
//     redirectUri: "http://localhost:3000", // Replace with your app's redirect URI
//   },
// };

// const msalInstance = new PublicClientApplication(msalConfig);

// const AuthService = {
//   login: async (): Promise<void> => {
//     try {
//       await msalInstance.loginPopup({
//         scopes: ["user.read"], // Add required scopes
//       });
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw error;
//     }
//   },

//   logout: (): void => {
//     msalInstance.logoutPopup();
//   },

//   getCurrentUser: (): AccountInfo | null => {
//     const accounts = msalInstance.getAllAccounts();
//     return accounts.length > 0 ? accounts[0] : null;
//   },
// };

// export default AuthService;


const AuthService = {
    /**
     * Mock login method.
     * Simulates a successful login.
     */
    login: async (): Promise<void> => {
      return new Promise((resolve) => {
        console.log("Mock login successful");
        setTimeout(resolve, 1000); // Simulate async behavior
      });
    },
  
    /**
     * Mock logout method.
     * Simulates a logout action.
     */
    logout: (): void => {
      console.log("Mock logout successful");
    },
  
    /**
     * Mock method to get the current user.
     * Returns a mock user object if logged in.
     */
    getCurrentUser: (): { name: string; email: string } | null => {
      // Simulate a logged-in user
      return { name: "John Doe", email: "johndoe@example.com" };
    },
  };
  
  export default AuthService;