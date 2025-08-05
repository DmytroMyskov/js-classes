const allUsers = [];

class User {
  constructor(name, role) {
    if (typeof name !== "string" || name.trim() === "") {
      alert("Некоректне ім'я");
      return;
    }

    if (role !== "admin" && role !== "user") {
      alert("Некоректна роль. Можна лише 'admin' або 'user'");
      return;
    }

    this.name = name;
    this.role = role;
    this.loggedIn = false;
    this.password = "default";
    allUsers.push(this);
  }

  getName() {
    return this.name;
  }

  getRole() {
    return this.role;
  }

  login(password) {
    if (password === this.password) {
      this.loggedIn = true;
      console.log(`${this.name} увійшов у систему`);
    } else {
      alert("Невірний пароль");
    }
  }

  logout() {
    this.loggedIn = false;
    console.log(`${this.name} вийшов із системи`);
  }

  changeName(newName) {
    if (typeof newName !== "string" || newName.trim() === "") {
      alert("Некоректне ім'я");
      return;
    }
    this.name = newName;
  }

  changePassword(newPassword) {
    if (typeof newPassword !== "string" || newPassword.length < 4) {
      alert("Пароль має бути мінімум 4 символи");
      return;
    }
    this.password = newPassword;
  }
}

class Admin extends User {
  constructor(name) {
    super(name, "admin");
  }

  addUser(name, role) {
    return new User(name, role);
  }

  removeUser(name) {
    const index = allUsers.findIndex(u => u.name === name);
    if (index !== -1) {
      allUsers.splice(index, 1);
      console.log(`Користувача '${name}' видалено`);
    } else {
      alert("Користувача не знайдено");
    }
  }

  changeUserRole(name, newRole) {
    const user = allUsers.find(u => u.name === name);
    if (!user) return alert("Користувача не знайдено");
    if (newRole !== "admin" && newRole !== "user") {
      return alert("Некоректна роль");
    }
    user.role = newRole;
    console.log(`Роль користувача '${name}' змінено на '${newRole}'`);
  }

  getAllUsers() {
    return allUsers;
  }

  removeAllUsers() {
    allUsers.length = 0;
    console.log("Усі користувачі видалені");
  }
}

const admin = new Admin("Petro");
admin.changePassword("1234");
admin.login("1234");

admin.addUser("Olena", "user");
admin.addUser("Ivan", "admin");

console.log(admin.getAllUsers());

admin.changeUserRole("Olena", "admin");
admin.removeUser("Ivan");
admin.removeAllUsers();