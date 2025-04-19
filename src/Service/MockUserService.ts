interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  const MockUserService = {
    getMockUser: (): User => ({
      id: '12345',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'User', // or 'Admin'
    }),
  };
  './Service/MockUserService';
  export default MockUserService;