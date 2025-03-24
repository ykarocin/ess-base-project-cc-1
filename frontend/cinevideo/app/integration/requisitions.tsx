// Exemplo: getAll
const getAllUsers = async () => {
    try {
      const response = await fetch("/users");
      if (response.ok) {
        const users = await response.json();
        console.log(users); // Faça algo com os dados
        return users;
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        return null;
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      return null;
    }
  };
  
  // Exemplo: getUserById
  const getUser = async (userId: string) => {
    try {
      const response = await fetch(`/users/${userId}`);
      if (response.ok) {
        const user = await response.json();
        console.log(user); // Faça algo com os dados
        return user;
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        return null;
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      return null;
    }
  };
  
  // Exemplo: updateUser
  const updateUserFunc = async (userId: string, userData: any) => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const updatedUsers = await response.json();
        console.log(updatedUsers); // Faça algo com os dados
        return updatedUsers;
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        return null;
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      return null;
    }
  };
  
  // Exemplo: deleteUser
  const deleteUserFunc = async (userId: string, password: string) => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result); // Faça algo com os dados
        return result;
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        return null;
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      return null;
    }
  };