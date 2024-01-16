import supertest from "supertest";
import { removeAllTestContacts,removeTestUser,createTestUser,getTestContact, removeAllTestAddresses, createTestContact, createTestAddress, getTestAddress } from "./test-util.js";
import { web } from "../src/application/web.js";

describe("POST /API/ CONTACTS/ :contactId / addresses", ()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
    })

    afterEach(async()=>{
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })

    it("should be able to create new address", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).post('/api/contacts/' + testContact.id + '/addresses').set("Authorization", "test").send({
            street: "jalan test",
            city : "kota test",
            province : "provinsi test",
            country : "indonesia",
            postal_code : "234234"
        })

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("234234");

    })

    it("should be able to if reject invalid ", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).post('/api/contacts/' + testContact.id + '/addresses').set("Authorization", "test").send({
            street: "jalan test",
            city : "kota test",
            province : "provinsi test",
            country : "",
            postal_code : ""
        })

        expect(result.status).toBe(400);

    })

    it("should be able to reject if contact is not found  ", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).post('/api/contacts/' + (testContact.id + 1) + '/addresses').set("Authorization", "test").send({
            street: "jalan test",
            city : "kota test",
            province : "provinsi test",
            country : "",
            postal_code : ""
        })

        expect(result.status).toBe(404);

    })
})

describe("GET /api/contacts/:contactId/addresses/:addressId", ()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async()=>{
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })

    it("should be able to get address", async()=>{
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web).get('/api/contacts/' +testContact.id + '/addresses/' + testAddress.id).set("Authorization", "test")

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("234234");
    })

    it("should be able to reject if contact is not found", async()=>{
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web).get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id).set("Authorization", "test")

        expect(result.status).toBe(404)
    })

    it("should be able to reject if address is not found", async()=>{
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web).get('/api/contacts/' + testContact.id  + '/addresses/' + (testAddress.id + 1)).set("Authorization", "test")

        expect(result.status).toBe(404)
    })
})

describe("PUT /api/contacts/:contactId/addresses/:addressId", ()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async()=>{
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })

    it("should be able to update contact", async()=>{
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
        .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
        .set("Authorization", "test").send({
            street: "street",
            city : "city",
            province : "provinsi",
            country : "indonesia",
            postal_code : "1111"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("street");
        expect(result.body.data.city).toBe("city");
        expect(result.body.data.province).toBe("provinsi");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("1111")

    })

    it("should be able to reject if request is invalid", async()=>{
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
        .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
        .set("Authorization", "test").send({
            street: "street",
            city : "city",
            province : "provinsi",
            country : "",
            postal_code : ""
        });

        expect(result.status).toBe(400);

    })

    it("should be able to address is not found", async()=>{
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
        .put('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
        .set("Authorization", "test").send({
            street: "street",
            city : "city",
            province : "provinsi",
            country : "indonesia",
            postal_code : "1111"
        });

        expect(result.status).toBe(404);

    })

    it("should be able to contact is not found", async()=>{
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
        .put('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id )
        .set("Authorization", "test").send({
            street: "street",
            city : "city",
            province : "provinsi",
            country : "indonesia",
            postal_code : "1111"
        });

        expect(result.status).toBe(404);

    })
})

describe("DELETE /api/contacts/:contactId/addresses/:addressId",()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async()=>{
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })

    it("should be able to remove address", async()=>{
        const testContact = await getTestContact();
        let testAddress = await getTestAddress();

        const result = await supertest(web).delete('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id).set("Authorization", "test")

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK")

        testAddress = await getTestAddress();
        expect(testAddress).toBeNull();
    })

    it("should be able to reject if address is not found", async()=>{
        const testContact = await getTestContact();
        let testAddress = await getTestAddress();

        const result = await supertest(web).delete('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1)).set("Authorization", "test")

        expect(result.status).toBe(404);
    })

    it("should be able to reject if contact is not found", async()=>{
        const testContact = await getTestContact();
        let testAddress = await getTestAddress();

        const result = await supertest(web).delete('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id).set("Authorization", "test")

        expect(result.status).toBe(404);
    })
})

describe("GET /api/contacts/:contactId/addresses",()=>{
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async()=>{
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })
    it("should be able to list address", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).get('/api/contacts/' + testContact.id + '/addresses').set("Authorization", "test")

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);

    })

    it("should be able to reject if contact is not found", async()=>{
        const testContact = await getTestContact();

        const result = await supertest(web).get('/api/contacts/' + (testContact.id + 1)+ '/addresses').set("Authorization", "test")

        expect(result.status).toBe(404);

    })
})