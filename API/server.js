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

// Create HTTP server
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

    // POST CREATE USERS
    if (url === '/users' && method === 'POST'){
        try {
            const body = await parseBody(req);
            const {name, age} = body;

            if (!name || !age){
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

    // 404 NOT FOUND
    sendJson(res, 404, { message: 'ENDPOINT TIDAK DITEMUKAN' });
});


// Start Server
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})