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
});
