CREATE TABLE indiewise_db.Rating
(
    id char(36) PRIMARY KEY NOT NULL,
    createdAt datetime,
    down bit(1),
    up bit(1),
    updatedAt datetime,
    project char(36),
    author char(36),
    CONSTRAINT project_project_bkname_ratings FOREIGN KEY (project) REFERENCES Project (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT users_author_bkname_ratings FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX project_project_bkname_ratings ON indiewise_db.Rating (project);
CREATE UNIQUE INDEX rating_id_unique ON indiewise_db.Rating (id);
CREATE INDEX users_author_bkname_ratings ON indiewise_db.Rating (author);
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('0019c606-31a1-11e6-bda4-58f29e7e8856', '2016-06-13 19:57:04', false, true, '2016-06-13 19:57:29', 'a88e7011-3190-11e6-89fb-d5a8c8c9c779', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('028aa9a2-2f58-11e6-a1a3-d03b51387fbb', '2016-06-10 22:09:32', false, true, '2016-06-10 22:09:32', '3cac9b10-28da-11e6-add7-1362f0150681', '330d5f13-2133-11e6-874e-22a3540ace20');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('06c521b0-31d4-11e6-bda4-58f29e7e8856', '2016-06-14 02:02:19', false, true, '2016-06-14 02:02:26', 'c17eb1ff-28e2-11e6-8d88-f97eb8a09b17', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('0794eb3f-3184-11e6-89fb-d5a8c8c9c779', '2016-06-13 16:29:41', false, true, '2016-06-13 16:29:41', '522d127d-316c-11e6-bda4-58f29e7e8856', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('16ff4890-2c98-11e6-917b-88aff6d1ce80', '2016-06-07 10:10:41', false, true, '2016-06-07 18:48:50', 'f039518b-2bfa-11e6-8879-06539fb34139', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('18dc13c5-2ed1-11e6-a1a3-d03b51387fbb', '2016-06-10 06:03:48', true, false, '2016-06-10 06:04:54', '687c9cd9-2bb7-11e6-ad0b-203ff95236b1', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('1b432f51-2ed1-11e6-a1a3-d03b51387fbb', '2016-06-10 06:03:52', true, false, '2016-06-10 06:03:52', '687c9cd9-2bb7-11e6-ad0b-203ff95236b1', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('1b4a62ca-3584-11e6-b069-da2edfe9b29b', '2016-06-18 18:40:19', false, true, '2016-06-18 18:40:29', 'dcac7464-3311-11e6-964e-ae3954e91258', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('1bf864cd-3584-11e6-8828-b7be8e0d870c', '2016-06-18 18:40:20', true, false, '2016-06-18 18:40:20', 'dcac7464-3311-11e6-964e-ae3954e91258', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('21d5d7cb-329e-11e6-acb8-176fa9e6cbc9', '2016-06-15 02:09:03', false, true, '2016-06-15 02:09:03', '137be270-329e-11e6-acb8-176fa9e6cbc9', '4958eea5-329c-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('25bc3f1f-28e3-11e6-add7-1362f0150681', '2016-06-02 16:57:53', false, true, '2016-06-02 16:57:55', 'c17eb1ff-28e2-11e6-8d88-f97eb8a09b17', '5af5bf3d-28dd-11e6-add7-1362f0150681');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('2910053d-3d2d-11e6-8975-6f8d5b7bef9f', '2016-06-28 12:38:05', false, true, '2016-07-06 03:20:38', '4f271c0a-3cff-11e6-8988-9b575f1c7b6b', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('2a3e9daa-295b-11e6-8d88-f97eb8a09b17', '2016-06-03 07:17:00', false, true, '2016-06-03 17:00:47', 'ba6f34eb-2958-11e6-b8db-86ac961c55b2', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('2d91b366-2cd5-11e6-9f2e-df967fc712f1', '2016-06-07 17:27:58', false, true, '2016-06-17 08:41:08', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('3089092a-2f3c-11e6-a1a3-d03b51387fbb', '2016-06-10 18:50:23', false, true, '2016-06-10 18:50:23', 'c2a8a88e-2ded-11e6-bfe3-1a07ba6e61f1', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('3178734c-29f7-11e6-a613-0e2ee6ca73a5', '2016-06-04 01:53:54', false, true, '2016-06-09 04:48:48', '3cac9b10-28da-11e6-add7-1362f0150681', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('3222490d-3387-11e6-98c7-fb943f7bac0d', '2016-06-16 05:57:23', false, false, '2016-06-16 05:57:30', 'f039518b-2bfa-11e6-8879-06539fb34139', '8550f727-3384-11e6-8666-b3e971a26aee');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('32f91d12-29f6-11e6-a613-0e2ee6ca73a5', '2016-06-04 01:46:47', false, true, '2016-06-04 01:46:47', 'c17eb1ff-28e2-11e6-8d88-f97eb8a09b17', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('34011f21-2d1c-11e6-b1f2-2cbdc1a26111', '2016-06-08 01:56:23', false, true, '2016-06-08 01:56:23', 'f039518b-2bfa-11e6-8879-06539fb34139', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('3a5807e5-29cc-11e6-b8db-86ac961c55b2', '2016-06-03 20:46:21', false, true, '2016-06-03 20:46:23', '3cac9b10-28da-11e6-add7-1362f0150681', 'a46f2fbf-29ae-11e6-8d7d-a630dd62b40f');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('3ccb442d-3336-11e6-8666-b3e971a26aee', '2016-06-15 20:17:52', false, true, '2016-06-15 20:17:52', '137be270-329e-11e6-acb8-176fa9e6cbc9', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('3d3433c6-2c17-11e6-917b-88aff6d1ce80', '2016-06-06 18:48:20', false, true, '2016-06-06 18:51:00', '83ba08f2-2a0c-11e6-a613-0e2ee6ca73a5', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('40c3cf81-32ba-11e6-a1e2-7c89a788219b', '2016-06-15 05:30:21', false, true, '2016-06-15 05:30:21', '137be270-329e-11e6-acb8-176fa9e6cbc9', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('427fcaf1-3183-11e6-89fb-d5a8c8c9c779', '2016-06-13 16:24:10', false, false, '2016-06-13 16:25:37', 'ed22ad25-3182-11e6-bda4-58f29e7e8856', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('43e4177c-2bb9-11e6-a1af-71b9b48fc188', '2016-06-06 07:35:38', false, true, '2016-06-08 10:03:01', '687c9cd9-2bb7-11e6-ad0b-203ff95236b1', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('44b20a72-3429-11e6-9bae-53b6c16b9153', '2016-06-17 01:17:33', false, true, '2016-06-17 01:17:38', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', '00000000-0000-4279-3068-44657951375a');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('44ebab32-3183-11e6-89fb-d5a8c8c9c779', '2016-06-13 16:24:14', false, true, '2016-06-13 16:24:14', 'ed22ad25-3182-11e6-bda4-58f29e7e8856', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('48229810-3466-11e6-839c-2ef7ffe900d5', '2016-06-17 08:34:18', false, true, '2016-06-17 08:34:18', '4e0e3cc8-3386-11e6-8666-b3e971a26aee', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('4e52f864-35cc-11e6-b069-da2edfe9b29b', '2016-06-19 03:17:08', false, true, '2016-06-19 15:54:45', '13f0a7c4-35bc-11e6-8828-b7be8e0d870c', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('56ab6e2c-3604-11e6-8dcf-8bc10eacec46', '2016-06-19 09:58:14', false, true, '2016-06-19 09:58:14', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', '69285671-35bb-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('575bdb0e-3604-11e6-8dcf-8bc10eacec46', '2016-06-19 09:58:15', false, true, '2016-06-19 09:58:15', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', '69285671-35bb-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('5e60a6eb-2f38-11e6-a1a3-d03b51387fbb', '2016-06-10 18:23:02', false, true, '2016-06-10 18:23:02', '9ea9efd3-2bfa-11e6-917b-88aff6d1ce80', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('64b2d922-29f5-11e6-a613-0e2ee6ca73a5', '2016-06-04 01:41:01', false, true, '2016-06-04 01:41:01', 'ba6f34eb-2958-11e6-b8db-86ac961c55b2', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('64b80001-2f38-11e6-838e-bc1d0f2f928f', '2016-06-10 18:23:13', false, true, '2016-06-10 18:23:13', '9ea9efd3-2bfa-11e6-917b-88aff6d1ce80', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('7065915c-2d30-11e6-9f2e-df967fc712f1', '2016-06-08 04:21:14', false, true, '2016-06-08 04:21:14', 'f19346a0-2d2b-11e6-9f2e-df967fc712f1', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('75907404-2ed6-11e6-a1a3-d03b51387fbb', '2016-06-10 06:42:11', false, true, '2016-06-10 06:42:11', 'ba6f34eb-2958-11e6-b8db-86ac961c55b2', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('76aefd03-2e27-11e6-bfe3-1a07ba6e61f1', '2016-06-09 09:49:31', false, false, '2016-06-09 09:49:50', 'c2a8a88e-2ded-11e6-bfe3-1a07ba6e61f1', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('7a41c6e3-30ee-11e6-b0f7-d7ab247e4744', '2016-06-12 22:39:09', false, true, '2016-06-12 22:39:09', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('7b05b4b6-2ed0-11e6-838e-bc1d0f2f928f', '2016-06-10 05:59:23', false, true, '2016-06-10 05:59:23', '3cac9b10-28da-11e6-add7-1362f0150681', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('7d87096f-30ee-11e6-af43-1e2bf94a7604', '2016-06-12 22:39:14', false, true, '2016-06-12 22:39:14', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('7e51b0a7-30ee-11e6-af43-1e2bf94a7604', '2016-06-12 22:39:16', false, true, '2016-06-12 22:39:16', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('7ede5a7d-30ee-11e6-af43-1e2bf94a7604', '2016-06-12 22:39:17', false, true, '2016-06-12 22:39:17', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('7ee04c3a-30ee-11e6-b0f7-d7ab247e4744', '2016-06-12 22:39:17', true, false, '2016-06-12 22:39:17', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('8000c5b3-30ee-11e6-b0f7-d7ab247e4744', '2016-06-12 22:39:18', true, false, '2016-06-12 22:39:18', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('8030e6d9-30ee-11e6-af43-1e2bf94a7604', '2016-06-12 22:39:19', true, false, '2016-06-12 22:39:19', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('8155df7d-2f29-11e6-838e-bc1d0f2f928f', '2016-06-10 16:36:39', false, true, '2016-06-10 16:36:39', 'ede584e3-2ee5-11e6-a1a3-d03b51387fbb', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('81c8969b-30ee-11e6-af43-1e2bf94a7604', '2016-06-12 22:39:21', false, true, '2016-06-12 22:39:21', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('8220cda1-30ee-11e6-af43-1e2bf94a7604', '2016-06-12 22:39:22', false, true, '2016-06-12 22:39:22', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('859be818-2e88-11e6-a1a3-d03b51387fbb', '2016-06-09 21:24:17', false, true, '2016-06-09 21:24:17', '47aa8215-2bfb-11e6-917b-88aff6d1ce80', '00000000-0000-4b37-5572-4c6e39376e39');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('85dbc6d9-31d5-11e6-bda4-58f29e7e8856', '2016-06-14 02:13:02', false, true, '2016-06-14 02:13:02', 'a88e7011-3190-11e6-89fb-d5a8c8c9c779', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('939e449f-32a5-11e6-acb8-176fa9e6cbc9', '2016-06-15 03:02:20', true, false, '2016-06-15 03:02:20', 'ede584e3-2ee5-11e6-a1a3-d03b51387fbb', '4958eea5-329c-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('965e4b7c-2eb2-11e6-a1a3-d03b51387fbb', '2016-06-10 02:25:24', false, true, '2016-06-10 02:31:24', 'b9011015-2e04-11e6-b3fc-b454ab633f47', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('9c5acbea-3fb3-11e6-a2f6-58b58feef1b1', '2016-07-01 17:45:33', false, false, '2016-07-01 17:45:48', 'ebb02e9d-3fa1-11e6-8c27-1bf5c2fd32f3', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('a6dda4ca-2d2e-11e6-9f2e-df967fc712f1', '2016-06-08 04:08:27', true, true, '2016-06-20 04:22:56', 'f19346a0-2d2b-11e6-9f2e-df967fc712f1', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('aa02da28-359c-11e6-b069-da2edfe9b29b', '2016-06-18 21:36:06', true, false, '2016-06-18 21:49:28', 'dcac7464-3311-11e6-964e-ae3954e91258', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('b7223cf8-3d55-11e6-8988-9b575f1c7b6b', '2016-06-28 17:28:23', false, true, '2016-06-28 17:28:43', '4f271c0a-3cff-11e6-8988-9b575f1c7b6b', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('bddff109-2b35-11e6-a1af-71b9b48fc188', '2016-06-05 15:54:10', false, false, '2016-06-28 03:43:28', '3cac9b10-28da-11e6-add7-1362f0150681', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('c473911b-342c-11e6-9bae-53b6c16b9153', '2016-06-17 01:42:36', false, true, '2016-06-17 01:42:45', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', '5af5bf3d-28dd-11e6-add7-1362f0150681');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('c5075e4e-32d2-11e6-acb8-176fa9e6cbc9', '2016-06-15 08:25:51', false, true, '2016-06-15 08:25:51', '59474902-32a3-11e6-acb8-176fa9e6cbc9', 'a0cdec71-32cc-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('c86a8687-2b3c-11e6-a1af-71b9b48fc188', '2016-06-05 16:44:34', false, true, '2016-06-05 16:44:38', 'c17eb1ff-28e2-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('cb527ac1-3fb6-11e6-a2f6-58b58feef1b1', '2016-07-01 18:08:20', false, true, '2016-07-01 18:08:20', 'a64cdcaa-3d66-11e6-8988-9b575f1c7b6b', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('d15e8387-2c16-11e6-917b-88aff6d1ce80', '2016-06-06 18:45:19', false, false, '2016-06-07 23:43:29', '47aa8215-2bfb-11e6-917b-88aff6d1ce80', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('d398612d-457d-11e6-98fb-d9435856f487', '2016-07-09 02:35:40', false, false, '2016-07-09 02:35:59', '592f4142-3d65-11e6-8975-6f8d5b7bef9f', 'e643f6ae-44b9-11e6-af2d-4338a59813d0');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('d63c7bd3-295b-11e6-8d88-f97eb8a09b17', '2016-06-03 07:21:49', false, true, '2016-06-03 07:21:49', 'c17eb1ff-28e2-11e6-8d88-f97eb8a09b17', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('d69feb95-2d25-11e6-b1f2-2cbdc1a26111', '2016-06-08 03:05:21', false, true, '2016-06-08 03:05:21', 'cc9b3815-2d24-11e6-9f2e-df967fc712f1', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('df31ba56-2c70-11e6-8879-06539fb34139', '2016-06-07 05:29:57', false, true, '2016-06-07 05:30:03', 'de9cc058-2c20-11e6-8879-06539fb34139', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('df8a63f5-330a-11e6-acb8-176fa9e6cbc9', '2016-06-15 15:07:27', false, true, '2016-06-15 15:07:27', '9dcdd496-32ce-11e6-a1e2-7c89a788219b', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('e0f602f7-3dbf-11e6-b37b-f1c90dcb217f', '2016-06-29 06:08:20', false, true, '2016-07-03 03:29:40', 'd3d92c46-3dbf-11e6-b37b-f1c90dcb217f', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('e3e6e0d4-295c-11e6-b8db-86ac961c55b2', '2016-06-03 07:29:21', false, true, '2016-06-03 07:29:26', '3cac9b10-28da-11e6-add7-1362f0150681', '563a9fe6-2956-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('e421c3c7-3fb6-11e6-a2f6-58b58feef1b1', '2016-07-01 18:09:02', false, true, '2016-07-01 18:09:02', 'a88e7011-3190-11e6-89fb-d5a8c8c9c779', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('e500000a-3278-11e6-acb8-176fa9e6cbc9', '2016-06-14 21:42:30', false, true, '2016-06-14 21:42:30', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', 'ae6f55c2-3278-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('e7879cce-32b7-11e6-a1e2-7c89a788219b', '2016-06-15 05:13:32', false, true, '2016-06-15 05:13:32', '59474902-32a3-11e6-acb8-176fa9e6cbc9', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('f379ec7b-4728-11e6-ba59-64be4d48eae5', '2016-07-11 05:33:09', false, false, '2016-07-11 05:33:21', 'ba6f34eb-2958-11e6-b8db-86ac961c55b2', '3586ce83-4726-11e6-874c-bc8a3124620f');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('f456e8c6-29ae-11e6-8d7d-a630dd62b40f', '2016-06-03 17:16:48', false, true, '2016-06-03 17:16:48', 'ba6f34eb-2958-11e6-b8db-86ac961c55b2', 'a46f2fbf-29ae-11e6-8d7d-a630dd62b40f');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('f6f175b5-3599-11e6-b069-da2edfe9b29b', '2016-06-18 21:16:47', false, true, '2016-06-18 21:16:47', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', '19632e85-2ff9-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('f7013030-2df9-11e6-b3fc-b454ab633f47', '2016-06-09 04:23:49', false, true, '2016-06-09 04:23:49', 'c2a8a88e-2ded-11e6-bfe3-1a07ba6e61f1', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('facb8bd7-3fb5-11e6-8c27-1bf5c2fd32f3', '2016-07-01 18:02:31', false, true, '2016-07-01 18:02:42', '4f271c0a-3cff-11e6-8988-9b575f1c7b6b', 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Rating (id, createdAt, down, up, updatedAt, project, author) VALUES ('fecd6511-3520-11e6-8828-b7be8e0d870c', '2016-06-18 06:50:51', false, true, '2016-06-18 06:50:51', '59474902-32a3-11e6-acb8-176fa9e6cbc9', '00000000-0000-3647-3736-70594a6b6457');