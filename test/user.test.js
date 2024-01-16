import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";




describe("Post/api/users",()=>{
    

    afterEach(async()=>{
        await removeTestUser();
     });
    it("should be able to register new user", async()=>{
        const result = await supertest(web).post("/api/users").send({
            username : 'test',
            password : 'rahasia',
            name : 'test'
        });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should be able to reject if request is invalid", async()=>{
        const result = await supertest(web).post("/api/users").send({
            username : '',
            password : '',
            name : ''
        });
        logger.info(result.body)
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should be able to reject if username is registerd", async()=>{
        let result = await supertest(web).post("/api/users").send({
            username : 'qurro',
            password : 'rahasia',
            name : 'Qurrota Ayun'
        });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("qurro");
        expect(result.body.data.name).toBe("Qurrota Ayun");
        expect(result.body.data.password).toBeUndefined();
        logger.info(result.body)

        result = await supertest(web).post("/api/users").send({
            username : 'qurro',
            password : 'rahasia',
            name : 'Qurrota Ayun'
        });
        logger.info(result.body)
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
    
});

describe("POST / API / USERS / LOGIN", ()=>{
    
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });
    it("should be able to login user", async()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username : "test",
            password : "rahasia"
        })
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    })

    it("should be able to reject login if user invalid", async()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username : "",
            password : ""
        })
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })

    it("should be able to reject login if password wrong", async()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username : "test",
            password : "aas2wdaws"
        })
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })

    it("should be able to reject login if username wrong", async()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username : "awwsadsdwa",
            password : "aas2wdaws"
        })
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
    
    
})

describe("GET / API / USERS / CURRENT", ()=>{

    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });

    it("should be able to get current user", async()=>{
        const result = await supertest(web).get('/api/users/current').set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
    })

    it("should be able to reject if token is invalid", async()=>{
        const result = await supertest(web).get('/api/users/current').set('Authorization', 'aaa');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
})

describe("PATCH API / USERS / CURRENT", ()=>{
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });
    
    it("should be able to update user", async()=>{
        const result = await supertest(web).patch("/api/users/current").set('Authorization', "test").send({
            name : "Qurrota",
            password : "rahasialagi"
        });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("Qurrota")

        logger.info(result);

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi",user.password)).toBe(true)
    })

    it("should be able to update name", async()=>{
        const result = await supertest(web).patch("/api/users/current").set('Authorization', "test").send({
            name : "Qurrota",
        });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("Qurrota")

        logger.info(result);
    })

    it("should be able to update password", async()=>{
        const result = await supertest(web).patch("/api/users/current").set('Authorization', "test").send({
            password : "rahasialagi"
        });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")

        logger.info(result);

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi",user.password)).toBe(true)
    })

    it("should be able to update is not valid", async()=>{
        const result = await supertest(web).patch("/api/users/current").set('Authorization', "salah").send({
            password : ""
        });
        expect(result.status).toBe(401);
    })
})

describe("DELETE API/USERS/LOGOUT", ()=>{
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });

    it("should be able to logout", async()=>{
        const result = await supertest(web).delete("/api/users/logout").set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    })

    it("should be able to reject logout if token is invalid", async()=>{
        const result = await supertest(web).delete("/api/users/logout").set("Authorization", "salah");

        expect(result.status).toBe(401);
    })
})