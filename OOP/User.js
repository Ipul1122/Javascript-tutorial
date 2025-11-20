// LEVEL 1 MEMBUAT USER
class User {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    introduceUser(){
        console.log('Halo, nama gua ' + this.name + ', umur gua ' + this.age + ' tahun.');
    }    
}

const user1 = new User('Ipul', 23);
user1.introduceUser();


// LEVEL 4 -> MEMBUAT USER MENJADI ARRAY 
const users = [];

function addUser(name, age){
    const newUser = new User(name,age);

    users.push(newUser);
}

addUser('Ipul', 23);
addUser('Syaiful', 23);
addUser('Syaiful Ipul', 23);

for (let i = 0; i < users.length; i++){
    users[i].introduceUser();
}


// LEVEL 2 -> ADMIN MEWARISI PARAMETER DARI USER 
class Admin extends User{
    constructor(name, age, role){
        super(name, age);
        this.role = role;
    }

    introduceAdmin(){
        console.log('Halo, nama gua ' + this.name + ' , umur gua ' + this.age + ' tahun, dan gua adalah ' + this.role + '.');
    }
    // lEVEL 3
    updateRole(newRole){
        this.role = newRole;
        console.log('Role sudah di update menjadi ' + this.role);
    }
}



const admin1 = new Admin('SYAIFUL', 25, 'Admin Role');
admin1.introduceAdmin();
admin1.updateRole('Super Admin Role');
admin1.introduceAdmin();