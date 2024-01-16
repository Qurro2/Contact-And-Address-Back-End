ini adalah code back end user , dimana user bisa menambahkan,mencari dan menghapus contact/address yang tersimpan. 

dengan bahasa pemrograman nodejs , dan library express untuk menghubungkan restfull api ke sisi front-end.
penyimpanan menggunakan mysql di bantu oleh library prisma.
untuk validation di code ini menggunakan library dari Joi, sehingga tidak rumit untuk membuat validation secara manual.
user memiliki authorization pada token yang menggunakan library uuid. 
password user memiliki algoritma kriptografi menggunakan library bcrypt sehingga password anda lebih aman.
untuk uji unit test saya menggunakan library jest yang di bantu juga oleh babel-jest untuk mempermudah mengetahui suatu error pada code secara otomatis. 
