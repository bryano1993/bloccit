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

  describe("GET /topics/:topicId/flair/new", () => {
    it("should render a new flair form", done => {
      request.get(`${base}/${topic.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });
  });

  describe("POST /topics/:topicId/flairs/create", () => {
    it("should create a new flair and redirect", done => {
      const options = {
        url: `${base}/${this.topic.id}/flairs/create`,
        form: {
          name: "Legendary Developer",
          color: "blue"
        }
      };
      request.flair(options, (err, res, body) => {
        Flair.findOne({ where: { title: "Legendary Developer" } })
          .then(flair => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe("Legendary Developer");
            expect(flair.color).toBe("blue");
            expect(flair.topicId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /topics/:topicId/flairs/:id", () => {
    it("should render a view with the selected flair", done => {
      request.get(
        `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${
          this.flair.id
        }`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Summer Time");
          done();
        }
      );
    });
  });

  describe("POST /topics/:topicId/flairs/:id/destroy", () => {
    it("should delete the flair with the associated ID", done => {
      expect(flair.id).toBe(1);

      request.flair(
        `${base}/${this.topic.id}/flairs/${this.flair.id}/destroy`,
        (err, res, body) => {
          Flair.findById(1).then(flair => {
            expect(err).toBeNull();
            expect(flair).toBeNull();
            done();
          });
        }
      );
    });
  });

  describe("GET /topics/:topicId/flairs/:id/edit", () => {
    it("should render a view with an edit flair form", done => {
      request.get(
        `${base}/${this.topic.id}/flairs/${this.post.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Post");
          expect(body).toContain("Snowball Fighting");
          done();
        }
      );
    });
  });

  describe("POST /topics/:topicId/posts/:postId/flairs/:id/update", () => {
    it("should return a status code 302", done => {
      request.post(
        {
          url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${
            this.flair.id
          }/update`,
          form: {
            name: "Winter games",
            color: "red"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(302);
          done();
        }
      );
    });

    it("should update the post with the given values", done => {
      const options = {
        url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${
          this.flair.id
        }/update`,
        form: {
          name: "Winter games"
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();

        Flair.findOne({
          where: { id: this.flair.id }
        }).then(flair => {
          expect(flair.name).toBe("Winter games");
          done();
        });
      });
    });
  });
});
