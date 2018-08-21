const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
//a test for the route path
describe("routes : static", () => {
  //#1
  describe("GET /", () => {
    //#2
    it("should return status code 200", done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        //#4
        done();
      });
    });
  });

  //#1
  describe("GET /marco", () => {
    //#2
    it("should return status code 200", done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        //#4
        done();
      });
    });
  });
});
