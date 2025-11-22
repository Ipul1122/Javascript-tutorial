const http = require('http');
const port = 3000;


// Data Dummy
let users = [
    { id: 1, name : 'Syaiful', age : 23},
    { id: 2, name : 'Ipul', age : 25}
];

// Helper function to get user by ID
function sendJson(res, statusCode, data){
    res.writeHead(statusCode, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(data));
};

// Helper function handle body request
function parseBody(req){
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            if(!body) return resolve({});
            try {
                const json = JSON.parse(body);
                resolve(json);
            } catch (err) {
                reject(err);
            }
        });

        req.on('error', err => {
            reject(err);
        });
    });
}

// Create HTTP server & Routing
const server = http.createServer(async (req, res) =>{
    const method = req.method;
    const url = req.url;

    // test endpoint
    if (url === '/ping' && method === 'GET'){
        return sendJson(res, 200, { message: 'pong' });
    }

    // GET ALL USERS
    if (url === '/users' && method === 'GET'){
        return sendJson(res, 200, users);
    }

    // GET USER BY ID 
    if (url.startsWith('/users/') && method === 'GET'){
        const parts = url.split('/'); // Diubah menjadi array [ '', 'users', '1' ]
        const id = parseInt(parts[2]); // Mengambil ID dari array

        const user = users.find(u => u.id === id);
        if (!user){
            return sendJson(res, 404, { message: 'User Tidak Ditemukan'});
        } else {
            return sendJson(res, 200, user);
        };
    }

    // POST CREATE USERS
    if (url === '/users' && method === 'POST'){
        try {
            // membuat body request menjadi json
            const body = await parseBody(req);
            const {name, age} = body;

            if (name && age){
                return sendJson (res, 400, { message: 'Nama dan umur wajib diisi' });
            }

            const newUser = {
                id: users.length + 1,
                name,
                age
            };

            users.push(newUser);
            return sendJson(res, 201, {
                message: 'User Berhasil Ditambahkan',
                data: newUser
            });
        } catch (err) {
            return sendJson(res, 400, { message: 'Body Tidak Valid' });
        }
    }

    // PUT UPDATE USER BY ID
    if (url.startsWith('/users/') && method === 'PUT'){
        try {
            const parts = url.split('/');
            const id = parseInt(parts[2]);

            const userIndex = users.findIndex(u => u.id === id);
            if (userIndex === -1){
                return sendJson(res, 404, { message: 'User Tidak Ditemukan'});
            }

            const body = await parseBody(req);
            const {name, age} = body;

            // Update User Data, if provided, else keep existing
            if (name !== undefined) users[userIndex].name = name;
            if (age !== undefined) users[userIndex].age = age;

            return sendJson(res, 200, {
                message: 'User Berhasil Diupdate',
                data: users[userIndex]
            });
        }   catch (err) {
            return sendJson(res, 400, { message: 'Body Tidak Valid' });
        }
    }

    // DELETE USER BY ID
    if (url.startsWith('/users/') && method === 'DELETE'){
        const parts = url.split('/');
        const id = parseInt(parts[2]);

        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1){
            return sendJson(res, 404, { message: 'User Tidak Ditemukan'});
        }

        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);

        return sendJson(res, 200, {
            message: 'User Berhasil Dihapus',
            data: deletedUser
        });
    }

    // 404 NOT FOUND
    sendJson(res, 404, { message: 'ENDPOINT TIDAK DITEMUKAN' });
});


// Start Server
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})