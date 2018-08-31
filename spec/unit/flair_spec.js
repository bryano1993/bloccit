const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flair", () => {
  beforeEach(done => {
    this.topic;
    this.post;
    this.flair;
    sequelize.sync({ force: true }).then(res => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description:
          "A compilation of reports from recent visits to the star system."
      })
        .then(topic => {
          this.topic = topic;

          Post.create({
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            topicId: this.topic.id
          }).then(post => {
            this.post = post;
            done();
          });
          Flair.create({
            name: "Star chaser",
            color: "yellow",
            topicId: this.topic.id
          }).then(flair => {
            this.flair = flair;
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
    it("should create a flair object with a name and color, and assigned topic", done => {
      Flaire.create({
        title: "Millionare Web Developer",
        color: "Blue",
        topicId: this.flair.id
      })
        .then(flair => {
          expect(flair.title).toBe("Millionare Web Developer");
          expect(flair.color).toBe("Blue");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create a flair with missing name, color, or assigned topic", done => {
      Flaire.create({
        title: "Millionare Web Developer"
      })
        .then(flair => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch(err => {
          expect(err.message).toContain("Post.body cannot be null");
          expect(err.message).toContain("Post.topicId cannot be null");
          done();
        });
    });
  });

  describe("#setFlair()", () => {
    it("should associate a topic and a flair together", done => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      }).then(newTopic => {
        expect(this.flair.topicId).toBe(this.topic.id);

        this.flair.setTopic(newTopic).then(flair => {
          expect(flair.topicId).toBe(newTopic.id);
          done();
        });
      });
    });
  });

  describe("#getFlair()", () => {
    it("should return the associated topic", done => {
      this.flair.getTopic().then(associatedTopic => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      });
    });
  });
});
