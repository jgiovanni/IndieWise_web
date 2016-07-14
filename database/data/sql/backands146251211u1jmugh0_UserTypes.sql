CREATE TABLE indiewise_db.UserTypes
(
    id char(36) PRIMARY KEY NOT NULL,
    type_id varchar(255),
    type_name varchar(255),
    user char(36),
    CONSTRAINT users_user_bkname_types FOREIGN KEY (user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX users_user_bkname_types ON indiewise_db.UserTypes (user);
CREATE UNIQUE INDEX usertypes_id_unique ON indiewise_db.UserTypes (id);
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('05527079-3fb5-11e6-8c27-1bf5c2fd32f3', '18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('19eb6301-2ff9-11e6-8ac7-0afa3110e5de', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', '19632e85-2ff9-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('1f545b49-3046-11e6-8ac7-0afa3110e5de', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('1fa56a1a-3046-11e6-8ac7-0afa3110e5de', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('1ff41607-3046-11e6-8ac7-0afa3110e5de', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('203dff76-3046-11e6-8ac7-0afa3110e5de', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('211818cb-3046-11e6-a803-f3837110b8a1', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('21254275-3046-11e6-8ac7-0afa3110e5de', '55cda9a6-2941-11e6-8d88-f97eb8a09b17', 'Short Animation', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('215f9f9d-3046-11e6-a803-f3837110b8a1', '3d442e39-2941-11e6-b8db-86ac961c55b2', 'Other', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('21718c91-3046-11e6-8ac7-0afa3110e5de', '33544e7a-2941-11e6-b8db-86ac961c55b2', 'Reality Show', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('21c4fee4-3046-11e6-8ac7-0afa3110e5de', '52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('220c825a-3046-11e6-8ac7-0afa3110e5de', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('22671daa-3046-11e6-8ac7-0afa3110e5de', '08306ea1-2941-11e6-8d88-f97eb8a09b17', 'Student', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('232960c0-3046-11e6-a803-f3837110b8a1', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('237a70b8-3046-11e6-a803-f3837110b8a1', '18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('23c458d3-3046-11e6-a803-f3837110b8a1', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2563282b-368e-11e6-8dcf-8bc10eacec46', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '248aed84-368e-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2567ebaa-368e-11e6-8dcf-8bc10eacec46', '18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', '248aed84-368e-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('257d6202-368e-11e6-8dcf-8bc10eacec46', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', '248aed84-368e-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('25ce70cf-368e-11e6-8dcf-8bc10eacec46', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '248aed84-368e-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('25dfda79-368e-11e6-8503-2b2a187ec926', '52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', '248aed84-368e-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('261abc02-368e-11e6-8dcf-8bc10eacec46', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', '248aed84-368e-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2891f182-2d2b-11e6-b1f2-2cbdc1a26111', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '29ff3338-2d2b-11e6-9f2e-df967fc712f1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2caccc9d-3582-11e6-8828-b7be8e0d870c', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2cb9dd2a-3582-11e6-b069-da2edfe9b29b', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2cd08fe7-3582-11e6-8828-b7be8e0d870c', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2d4b4b7b-3582-11e6-b069-da2edfe9b29b', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2d514e18-3582-11e6-8828-b7be8e0d870c', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2d92d0e7-3582-11e6-b069-da2edfe9b29b', '3d442e39-2941-11e6-b8db-86ac961c55b2', 'Other', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2ddf1ade-3582-11e6-b069-da2edfe9b29b', '33544e7a-2941-11e6-b8db-86ac961c55b2', 'Reality Show', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2e7db4d5-3582-11e6-8828-b7be8e0d870c', '55cda9a6-2941-11e6-8d88-f97eb8a09b17', 'Short Animation', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2eb09836-3019-11e6-8ac7-0afa3110e5de', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', '2dd91e43-3019-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2ec3fb9d-3582-11e6-b069-da2edfe9b29b', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2ec60d60-3019-11e6-8ac7-0afa3110e5de', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '2dd91e43-3019-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2eca0018-3582-11e6-8828-b7be8e0d870c', '52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2ef0f7b4-3019-11e6-8ac7-0afa3110e5de', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', '2dd91e43-3019-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2f62941c-3582-11e6-8828-b7be8e0d870c', '08306ea1-2941-11e6-8d88-f97eb8a09b17', 'Student', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2f9e1ab0-3019-11e6-a803-f3837110b8a1', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', '2dd91e43-3019-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2fbf90be-3582-11e6-8828-b7be8e0d870c', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2ff52656-3582-11e6-b069-da2edfe9b29b', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('2ffb2b88-3582-11e6-8828-b7be8e0d870c', '18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('32aed9d4-2d29-11e6-9f2e-df967fc712f1', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', '31b6e6f6-2d29-11e6-9f2e-df967fc712f1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('32d29e35-2d29-11e6-9f2e-df967fc712f1', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', '31b6e6f6-2d29-11e6-9f2e-df967fc712f1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('33024d3b-2d29-11e6-9f2e-df967fc712f1', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '31b6e6f6-2d29-11e6-9f2e-df967fc712f1');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('4a0496d1-329c-11e6-a1e2-7c89a788219b', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '4958eea5-329c-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('57cb28b3-2956-11e6-8d88-f97eb8a09b17', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('580acc7f-328b-11e6-acb8-176fa9e6cbc9', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('583f403f-328b-11e6-acb8-176fa9e6cbc9', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('588ded0c-328b-11e6-acb8-176fa9e6cbc9', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('58b72f3d-2956-11e6-8d88-f97eb8a09b17', '33544e7a-2941-11e6-b8db-86ac961c55b2', 'Reality Show', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('58d7d5f0-328b-11e6-acb8-176fa9e6cbc9', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('58eb10f7-328b-11e6-a1e2-7c89a788219b', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('59011828-2956-11e6-8d88-f97eb8a09b17', '55cda9a6-2941-11e6-8d88-f97eb8a09b17', 'Short Animation', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('59241f19-328b-11e6-acb8-176fa9e6cbc9', '3d442e39-2941-11e6-b8db-86ac961c55b2', 'Other', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('594fc49f-2956-11e6-8d88-f97eb8a09b17', '52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('59706ba1-328b-11e6-acb8-176fa9e6cbc9', '52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('59bcb61e-328b-11e6-acb8-176fa9e6cbc9', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5a090165-328b-11e6-acb8-176fa9e6cbc9', '08306ea1-2941-11e6-8d88-f97eb8a09b17', 'Student', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5a57ae32-328b-11e6-acb8-176fa9e6cbc9', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5a869b04-2956-11e6-b8db-86ac961c55b2', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5aa19717-328b-11e6-acb8-176fa9e6cbc9', '18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5aa338db-2956-11e6-b8db-86ac961c55b2', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5ac87454-2956-11e6-8d88-f97eb8a09b17', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5ada0ef3-2956-11e6-b8db-86ac961c55b2', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5b79cbba-2956-11e6-b8db-86ac961c55b2', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5bc3b3d6-2956-11e6-b8db-86ac961c55b2', '3d442e39-2941-11e6-b8db-86ac961c55b2', 'Other', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5cf74199-2956-11e6-b8db-86ac961c55b2', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5d438cdb-2956-11e6-b8db-86ac961c55b2', '08306ea1-2941-11e6-8d88-f97eb8a09b17', 'Student', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5d9bc313-2956-11e6-b8db-86ac961c55b2', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('5ddc2293-2956-11e6-b8db-86ac961c55b2', '18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('6a7a0be3-35bb-11e6-b069-da2edfe9b29b', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', '69285671-35bb-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('6aae7f9f-35bb-11e6-b069-da2edfe9b29b', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '69285671-35bb-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('6ade2d87-35bb-11e6-b069-da2edfe9b29b', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', '69285671-35bb-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('6aefb540-35bb-11e6-8828-b7be8e0d870c', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '69285671-35bb-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('6e90e433-37f0-11e6-9a3b-282a510a8b6f', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', '6f4aa052-37f0-11e6-b877-628b485ab83f');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('703ec3e5-3809-11e6-b877-628b485ab83f', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '6f6a942b-3809-11e6-b877-628b485ab83f');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('706e72e8-3809-11e6-b877-628b485ab83f', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', '6f6a942b-3809-11e6-b877-628b485ab83f');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('9e09b3a1-29c1-11e6-b8db-86ac961c55b2', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a32402e9-3672-11e6-8503-2b2a187ec926', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a34fbddf-3672-11e6-8dcf-8bc10eacec46', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a36b8971-3672-11e6-8503-2b2a187ec926', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a39c0803-3672-11e6-8dcf-8bc10eacec46', '18b115ee-2941-11e6-8d88-f97eb8a09b17', 'TV Pilot', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a3a9869b-3672-11e6-8503-2b2a187ec926', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a3e85348-3672-11e6-8dcf-8bc10eacec46', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a3f83369-3672-11e6-8503-2b2a187ec926', '3d442e39-2941-11e6-b8db-86ac961c55b2', 'Other', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a436feb2-3672-11e6-8dcf-8bc10eacec46', '08306ea1-2941-11e6-8d88-f97eb8a09b17', 'Student', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a4834b01-3672-11e6-8dcf-8bc10eacec46', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a5197e02-3672-11e6-8dcf-8bc10eacec46', '55cda9a6-2941-11e6-8d88-f97eb8a09b17', 'Short Animation', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('a5bf9232-3672-11e6-8503-2b2a187ec926', '52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('b1744b1a-2970-11e6-b8db-86ac961c55b2', '55cda9a6-2941-11e6-8d88-f97eb8a09b17', 'Short Animation', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('bb72243a-316b-11e6-bda4-58f29e7e8856', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', 'ba45be32-316b-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('bbbc0d2e-316b-11e6-bda4-58f29e7e8856', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', 'ba45be32-316b-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('bc9d3720-316b-11e6-89fb-d5a8c8c9c779', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'ba45be32-316b-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('c679dd6a-4540-11e6-9245-e53ed8e64ac8', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'c5713a00-4540-11e6-9245-e53ed8e64ac8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('c83a1522-4540-11e6-9245-e53ed8e64ac8', '2c49e623-2941-11e6-b8db-86ac961c55b2', 'Feature Narrative', 'c5713a00-4540-11e6-9245-e53ed8e64ac8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('dd2a1faf-2ce2-11e6-b1f2-2cbdc1a26111', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'db710fed-2ce2-11e6-b1f2-2cbdc1a26111');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('dd8e4258-2ce2-11e6-b1f2-2cbdc1a26111', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', 'db710fed-2ce2-11e6-b1f2-2cbdc1a26111');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('de1eff77-3381-11e6-98c7-fb943f7bac0d', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', 'dcfe852d-3381-11e6-98c7-fb943f7bac0d');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('df73fe38-2ce2-11e6-9f2e-df967fc712f1', '39704d3d-2941-11e6-b8db-86ac961c55b2', 'Trailer', 'db710fed-2ce2-11e6-b1f2-2cbdc1a26111');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('dfc2abd3-2ce2-11e6-9f2e-df967fc712f1', '33544e7a-2941-11e6-b8db-86ac961c55b2', 'Reality Show', 'db710fed-2ce2-11e6-b1f2-2cbdc1a26111');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('e12c67b5-2d7a-11e6-bfe3-1a07ba6e61f1', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('e77eac17-44b9-11e6-af2d-4338a59813d0', '12791168-2941-11e6-b8db-86ac961c55b2', 'Demo Reel', 'e643f6ae-44b9-11e6-af2d-4338a59813d0');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('e7a4d1ba-44b9-11e6-af2d-4338a59813d0', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'e643f6ae-44b9-11e6-af2d-4338a59813d0');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('eb7eeac5-2a0b-11e6-a613-0e2ee6ca73a5', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ebba8525-2a0b-11e6-a613-0e2ee6ca73a5', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ec09325f-2a0b-11e6-a613-0e2ee6ca73a5', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ec557da2-2a0b-11e6-a613-0e2ee6ca73a5', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ec90eb35-2a0b-11e6-94bc-b20a1f8c62f8', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ece1fb2a-2a0b-11e6-94bc-b20a1f8c62f8', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ed271e39-2a0b-11e6-94bc-b20a1f8c62f8', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ed73697e-2a0b-11e6-94bc-b20a1f8c62f8', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('edd2f387-2a0b-11e6-a613-0e2ee6ca73a5', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ee1f3eca-2a0b-11e6-a613-0e2ee6ca73a5', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ee5848f8-2a0b-11e6-94bc-b20a1f8c62f8', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('eeae1da0-2a0b-11e6-94bc-b20a1f8c62f8', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('eef0de5a-2a0b-11e6-94bc-b20a1f8c62f8', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ef7fea4f-2a0b-11e6-94bc-b20a1f8c62f8', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f013baf7-2a0b-11e6-94bc-b20a1f8c62f8', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f0ecaded-2a0b-11e6-94bc-b20a1f8c62f8', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f144e5af-2a0b-11e6-94bc-b20a1f8c62f8', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f2229f48-2a0b-11e6-94bc-b20a1f8c62f8', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f289531b-2a0b-11e6-a613-0e2ee6ca73a5', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f326ad86-2a0b-11e6-a613-0e2ee6ca73a5', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f3ba7e87-2a0b-11e6-a613-0e2ee6ca73a5', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f3fbfca9-30eb-11e6-b0f7-d7ab247e4744', '482c01c6-2941-11e6-b8db-86ac961c55b2', 'Web Series', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f40e092a-30eb-11e6-af43-1e2bf94a7604', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f476efd9-30eb-11e6-af43-1e2bf94a7604', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f489ea58-2a0b-11e6-a613-0e2ee6ca73a5', 'fe411ae6-2940-11e6-b8db-86ac961c55b2', 'Music Video', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f4949207-30eb-11e6-b0f7-d7ab247e4744', '23d77c46-2941-11e6-b8db-86ac961c55b2', 'Short Narrative', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f49d1579-30eb-11e6-af43-1e2bf94a7604', '55cda9a6-2941-11e6-8d88-f97eb8a09b17', 'Short Animation', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f4ee0c57-2a0b-11e6-a613-0e2ee6ca73a5', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f5380d8a-30eb-11e6-af43-1e2bf94a7604', '52872b5a-2941-11e6-b8db-86ac961c55b2', 'Short Documentary', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('f57f4968-2a0b-11e6-94bc-b20a1f8c62f8', '076fddc7-2941-11e6-b8db-86ac961c55b2', 'Feature Animation', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.UserTypes (id, type_id, type_name, user) VALUES ('ff0b882b-3fb4-11e6-8c27-1bf5c2fd32f3', '603a3c66-2941-11e6-b8db-86ac961c55b2', 'Feature Documentary', '00000000-0000-6463-7952-633635765552');