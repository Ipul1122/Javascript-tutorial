const API_URL = 'http://localhost:3000';

// Helper function untuk menampilkan hasil di console
function logResult(method, url, data) {
    console.log(`%c[${method}] ${url}`, 'color: blue; font-weight: bold;');
    console.log(data);
    console.log('---');
}

// ==========================================================
// FUNGSI API
// ==========================================================

async function pingServer() {
    try {
        const response = await fetch(`${API_URL}/ping`);
        const data = await response.json();
        logResult('GET', '/ping', data);
    } catch (error) {
        console.error('Error saat ping server:', error);
    }
}

async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        logResult('GET', '/users', data);
    } catch (error) {
        console.error('Error saat mengambil user:', error);
    }
}

async function getUserById() {
    const id = document.getElementById('getUserId').value;
    if (!id) {
        console.log('%c[ERROR]', 'color: red; font-weight: bold;', 'Masukkan User ID.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        const data = await response.json();
        
        if (response.status === 404) {
            logResult('GET', `/users/${id} (404)`, data.message);
        } else {
            logResult('GET', `/users/${id}`, data);
        }
    } catch (error) {
        console.error(`Error saat mengambil user ID ${id}:`, error);
    }
}

async function postUser() {
    const name = document.getElementById('postName').value;
    const age = document.getElementById('postAge').value;
    
    if (!name || !age) {
        console.log('%c[ERROR]', 'color: red; font-weight: bold;', 'Nama dan Umur wajib diisi.');
        return;
    }

    const newUser = {
        name: name,
        age: Number(age) 
    };

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        const data = await response.json();
        logResult('POST', '/users', data);
    } catch (error) {
        console.error('Error saat membuat user baru:', error);
    }
}

async function updateUser() {
    const id = document.getElementById('putId').value;
    const name = document.getElementById('putName').value;
    const ageInput = document.getElementById('putAge').value;
    
    if (!id) {
        console.log('%c[ERROR]', 'color: red; font-weight: bold;', 'Masukkan User ID Target.');
        return;
    }

    const updatedData = {};
    if (name) {
        updatedData.name = name;
    }
    if (ageInput) {
        updatedData.age = Number(ageInput);
    }

    if (Object.keys(updatedData).length === 0) {
        console.log('%c[WARNING]', 'color: orange; font-weight: bold;', 'Tidak ada data yang diisi untuk diupdate.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const data = await response.json();
        logResult('PUT', `/users/${id}`, data);
    } catch (error) {
        console.error(`Error saat mengupdate user ID ${id}:`, error);
    }
}

async function deleteUser() {
    const id = document.getElementById('deleteId').value;
    
    if (!id) {
        console.log('%c[ERROR]', 'color: red; font-weight: bold;', 'Masukkan User ID yang akan dihapus.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        
        if (response.status === 404) {
            logResult('DELETE', `/users/${id} (404)`, data.message);
        } else {
            logResult('DELETE', `/users/${id}`, data);
        }
    } catch (error) {
        console.error(`Error saat menghapus user ID ${id}:`, error);
    }
}

// ==========================================================
// INISIALISASI DAN DOM LISTENERS
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Menghubungkan tombol ke fungsi JavaScript
    document.getElementById('pingBtn').onclick = pingServer;
    document.getElementById('getUsersBtn').onclick = getUsers;
    document.getElementById('getUserBtn').onclick = getUserById;
    document.getElementById('postUserBtn').onclick = postUser;
    document.getElementById('putUserBtn').onclick = updateUser;
    document.getElementById('deleteUserBtn').onclick = deleteUser;
});