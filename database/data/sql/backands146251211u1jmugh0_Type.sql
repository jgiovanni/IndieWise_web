CREATE TABLE indiewise_db.Type
(
    id char(36) PRIMARY KEY NOT NULL,
    name varchar(255),
    slug varchar(255)
);
CREATE UNIQUE INDEX type_id_unique ON indiewise_db.Type (id);
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'feature-animation');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('08306ea1-2941-11e6-8d88-f97eb8a09b17', 'Student', 'student');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', 'demo-reel');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', 'tv-pilot');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', 'short-narrative');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', 'feature-narrative');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('33544e7a-2941-11e6-b8db-86ac961c55b2', 'Reality Show', 'reality-show');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', 'trailer');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('3d442e39-2941-11e6-b8db-86ac961c55b2', 'Other', 'other');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', 'web-series');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', 'short-documentary');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('55cda9a6-2941-11e6-8d88-f97eb8a09b17', 'Short Animation', 'short-animation');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'feature-documentary');
INSERT INTO indiewise_db.Type (id, name, slug) VALUES ('fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'music-video');