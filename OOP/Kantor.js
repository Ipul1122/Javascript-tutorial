class Kantor {
    constructor(name, jabatan){
        this.name = name;
        this.jabatan = jabatan;
    }

    introducePegawai(){
        console.log(`Halo, nama saya ${this.name}, saya bekerja sebagai ${this.jabatan}.`);
    }
}

class Manager extends Kantor {
    constructor(name, jabatan, departemen){
        super(name, jabatan);
        this.departemen = departemen;
    }

    introduceManager(){
        console.log(`Halo, nama saya ${this.name}, saya bekerja sebagai ${this.jabatan} di departemen ${this.departemen}.`);
    }

    updateDivisi(newDepartemen){
        this.departemen = newDepartemen;
        console.log(`Departemen saya sudah di update menjadi ${this.departemen}.`);
    }
}

const pegawai1 = new Kantor('Syaiful', 'Software Engineer');
pegawai1.introducePegawai();
const manage1 = new Manager('Syaifulloh', 'Manager','IT');
manage1.introduceManager();
manage1.updateDivisi('HR');
manage1.introduceManager();

