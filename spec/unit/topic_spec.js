const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
  beforeEach(done => {
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then(res => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description:
          "A compilation of reports from recent visits to the star system."
      })
        .then(topic => {
          this.topic = topic;
          Post.create({
            title: "Buggati Chiron",
            body: "I saw some rocks.",
            topicId: this.topic.id
          }).then(post => {
            this.post = post;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#create()", () => {
    it("should create a topic with a title and a description", done => {
      Topic.create({
        title: "Exotic Cars",
        description: "Discuss the most exotic cars in the market"
      })
        .then(post => {
          expect(topic.title).toBe("Exotic Cars");
          expect(topic.description).toBe(
            "Discuss the most exotic cars in the market"
          );
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create a missing title or description", done => {
      Topic.create({
        title: "Exotic Cars"
      })
        .then(post => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        });
    });
  });
  describe("#getPosts()", () => {
    it("should return the associated posts", done => {
      this.topic.getPosts().then(posts => {
        expect(posts[0].title).toBe("Buggati Chiron");
        done();
      });
    });
  });
});
