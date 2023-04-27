const request = require("supertest");
const mongoose = require("mongoose");

const app=require("../../app");
const {PORT, DB_HOST} = process.env;

describe("test /users/login route", ()=> {
    let server = null;

    beforeAll(async ()=> {
      server = app.listen(PORT);
      await mongoose.connect(DB_HOST);
    });

    afterAll(async ()=> {
      server.close();
      await mongoose.connection.close();
    });    

    test("test login router with correct data", async ()=> {
      const loginData = {
        email:'petya11@mail.com',
        password:'1234567'
      }

      const res = await request(app).post("/users/login").send(loginData);
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined(); 
      expect(res.body.user).toBeDefined(); 
      expect(typeof res.body.user.email).toBe("string");
      expect(typeof res.body.user.subscription).toBe("string");
    });
})
