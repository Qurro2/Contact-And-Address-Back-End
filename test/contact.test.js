import supertest from "supertest";
import { createManyTestContact, createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-util.js"
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST / API / CONTACTS", ()=>{
    
    beforeEach(async()=>{
        await createTestUser();
    })

    afterEach(async()=>{
        await removeAllTestContacts();
        await removeTestUser();
    })
    it("should be able to create new contacts", async()=>{
        const result = await supertest(web).post("/api/contacts").set("Authorization", "test").send({
            first_name : "test",
            last_name : "test",
            email : "test@gmail.com",
            phone : "0812345"
        })

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.phone).toBe("0812345");

        logger.info(result);

    })

    it("should be able to if request is not invalid", async()=>{
        const result = await supertest(web).post("/api/contacts").set("Authorization", "test").send({
            first_name : "",
            last_name : "test",
            email : "test@gmail.com",
            phone : "08123451232546123124513566123"
        })

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();

        logger.info(result);

    })
})

describe("Get API/ CONTACTS /:contactId",()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
    })

    afterEach(async()=>{
        await removeAllTestContacts();
        await removeTestUser();
    })
    it("should be able to get contact ", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).get("/api/contacts/" + testContact.id).set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);

        logger.info(result.body);

    })
    it("should be able to return 404 if contact i is not found ", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).get("/api/contacts/" + (testContact.id + 1)).set("Authorization", "test");

        expect(result.status).toBe(404);
    })
})

describe("PUT API / CONTACT / :contactId", ()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
    })

    afterEach(async()=>{
        await removeAllTestContacts();
        await removeTestUser();
    })
    it("should be able to update existing contact", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).put("/api/contacts/" + testContact.id).set("Authorization", "test").send({
            first_name : "Qurrota",
            last_name : "Ayun",
            email : "Qurro@gmail.com",
            phone : "0854321"
        })
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("Qurrota");
        expect(result.body.data.last_name).toBe("Ayun");
        expect(result.body.data.email).toBe("Qurro@gmail.com");
        expect(result.body.data.phone).toBe("0854321");
    })

    it("should be able to reject if request is invalid", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).put("/api/contacts/" + testContact.id).set("Authorization", "test").send({
            first_name : "",
            last_name : "",
            email : "",
            phone : ""
        })
        expect(result.status).toBe(400);
    })

    it("should be able to if contact is not found", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).put("/api/contacts/" + (testContact.id + 1)).set("Authorization", "test").send({
            first_name : "Qurrota",
            last_name : "Ayun",
            email : "Qurro@gmail.com",
            phone : "0854321"
        })
        expect(result.status).toBe(404);
    })
})

describe("DELETE /API / CONTACTS/ :contactId",()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
    })

    afterEach(async()=>{
        await removeAllTestContacts();
        await removeTestUser();
    })
    it("should be able to delete contact", async()=>{
        let testContact = await getTestContact();

        const result = await supertest(web).delete("/api/contacts/" + testContact.id).set("Authorization", "test");

       
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK")
        testContact = await getTestContact();
        expect(testContact).toBeNull();
    })

    it("should be able to if contact is not found", async()=>{
        let testContact = await getTestContact();

        const result = await supertest(web).delete("/api/contacts/" + (testContact.id + 1)).set("Authorization", "test");

       
        expect(result.status).toBe(404);
    })
})

describe("GET / API / CONTACTS", ()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createManyTestContact();
    })

    afterEach(async()=>{
        await removeAllTestContacts();
        await removeTestUser();
    })

    it("should be able to search without parameters",async()=>{
        const result = await supertest(web).get('/api/contacts').set("Authorization", "test")

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    } )

    it("should be able to search to page 2",async()=>{
        const result = await supertest(web).get('/api/contacts').query({
            page : 2
        }).set("Authorization", "test")

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    } )

    it("should be able to search using name",async()=>{
        const result = await supertest(web).get('/api/contacts').query({
            name : "test1"
        }).set("Authorization", "test")

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    } )

    it("should be able to search using email",async()=>{
        const result = await supertest(web).get('/api/contacts').query({
            email : "test1"
        }).set("Authorization", "test")

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    } )

    it("should be able to search using phone",async()=>{
        const result = await supertest(web).get('/api/contacts').query({
            phone : "081234567"
        }).set("Authorization", "test")

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    } )
})