CREATE TABLE indiewise_db.Watched
(
    id char(36) PRIMARY KEY NOT NULL,
    project char(36),
    count decimal(18,8) DEFAULT '0.00000000',
    createdAt datetime,
    updatedAt datetime,
    CONSTRAINT project_project_bkname_watched FOREIGN KEY (project) REFERENCES Project (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX project_project_bkname_watched ON indiewise_db.Watched (project);
CREATE UNIQUE INDEX watched_id_unique ON indiewise_db.Watched (id);
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('0b215797-4794-11e6-874c-bc8a3124620f', '0b1a3084-4794-11e6-874c-bc8a3124620f', 1.00000000, '2016-07-11 18:19:44', '2016-07-11 18:19:44');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('11123d5b-2cd5-11e6-9f2e-df967fc712f1', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1', 20.00000000, '2016-06-07 17:27:10', '2016-06-07 17:27:10');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('1387cead-329e-11e6-acb8-176fa9e6cbc9', '137be270-329e-11e6-acb8-176fa9e6cbc9', 6.00000000, '2016-06-15 02:08:39', '2016-06-15 02:08:39');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('13fa312e-35bc-11e6-8828-b7be8e0d870c', '13f0a7c4-35bc-11e6-8828-b7be8e0d870c', 5.00000000, '2016-06-19 01:20:58', '2016-06-19 01:20:58');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('1af81cbd-32d6-11e6-acb8-176fa9e6cbc9', '1af0f667-32d6-11e6-acb8-176fa9e6cbc9', 15.00000000, '2016-06-15 08:49:43', '2016-06-15 08:49:43');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('3cb3c222-28da-11e6-add7-1362f0150681', '3cac9b10-28da-11e6-add7-1362f0150681', 9.00000000, '2016-06-02 15:54:06', '2016-06-02 15:54:06');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('47b40b7b-2bfb-11e6-917b-88aff6d1ce80', '47aa8215-2bfb-11e6-917b-88aff6d1ce80', 6.00000000, '2016-06-06 15:28:12', '2016-06-06 15:28:12');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('4e17c604-3386-11e6-8666-b3e971a26aee', '4e0e3cc8-3386-11e6-8666-b3e971a26aee', 2.00000000, '2016-06-16 05:51:01', '2016-06-16 05:51:01');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('4f37cc87-3cff-11e6-8988-9b575f1c7b6b', '4f271c0a-3cff-11e6-8988-9b575f1c7b6b', 6.00000000, '2016-06-28 07:09:52', '2016-06-28 07:09:52');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('52369a4f-316c-11e6-bda4-58f29e7e8856', '522d127d-316c-11e6-bda4-58f29e7e8856', 5.00000000, '2016-06-13 13:39:58', '2016-06-13 13:39:58');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('5938caa4-3d65-11e6-8975-6f8d5b7bef9f', '592f4142-3d65-11e6-8975-6f8d5b7bef9f', 8.00000000, '2016-06-28 19:20:17', '2016-06-28 19:20:17');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('595334be-32a3-11e6-acb8-176fa9e6cbc9', '59474902-32a3-11e6-acb8-176fa9e6cbc9', 11.00000000, '2016-06-15 02:46:24', '2016-06-15 02:46:24');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('61e49022-3d93-11e6-b37b-f1c90dcb217f', '61dd68ed-3d93-11e6-b37b-f1c90dcb217f', 8.00000000, '2016-06-29 00:49:49', '2016-06-29 00:49:49');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('6883c333-2bb7-11e6-ad0b-203ff95236b1', '687c9cd9-2bb7-11e6-ad0b-203ff95236b1', 4.00000000, '2016-06-06 07:22:21', '2016-06-06 07:22:21');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('83c39260-2a0c-11e6-a613-0e2ee6ca73a5', '83ba08f2-2a0c-11e6-a613-0e2ee6ca73a5', 2.00000000, '2016-06-04 04:26:31', '2016-06-04 04:26:31');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('9dd75e03-32ce-11e6-a1e2-7c89a788219b', '9dcdd496-32ce-11e6-a1e2-7c89a788219b', 4.00000000, '2016-06-15 07:56:07', '2016-06-15 07:56:07');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('9eb37958-2bfa-11e6-917b-88aff6d1ce80', '9ea9efd3-2bfa-11e6-917b-88aff6d1ce80', 1.00000000, '2016-06-06 15:23:28', '2016-06-06 15:23:28');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('9f8c3888-2e16-11e6-bfe3-1a07ba6e61f1', '9f25b364-2e16-11e6-bfe3-1a07ba6e61f1', 5.00000000, '2016-06-09 07:48:58', '2016-06-09 07:48:58');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('a656642e-3d66-11e6-8988-9b575f1c7b6b', 'a64cdcaa-3d66-11e6-8988-9b575f1c7b6b', 7.00000000, '2016-06-28 19:29:36', '2016-06-28 19:29:36');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('a897f8dd-3190-11e6-89fb-d5a8c8c9c779', 'a88e7011-3190-11e6-89fb-d5a8c8c9c779', 3.00000000, '2016-06-13 18:00:05', '2016-06-13 18:00:05');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('b9083768-2e04-11e6-b3fc-b454ab633f47', 'b9011015-2e04-11e6-b3fc-b454ab633f47', 6.00000000, '2016-06-09 05:40:50', '2016-06-09 05:40:50');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('ba765bfc-2958-11e6-b8db-86ac961c55b2', 'ba6f34eb-2958-11e6-b8db-86ac961c55b2', 17.00000000, '2016-06-03 06:59:34', '2016-06-03 06:59:34');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('c1883b76-28e2-11e6-8d88-f97eb8a09b17', 'c17eb1ff-28e2-11e6-8d88-f97eb8a09b17', 11.00000000, '2016-06-02 16:55:05', '2016-06-02 16:55:05');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('c2b231f9-2ded-11e6-bfe3-1a07ba6e61f1', 'c2a8a88e-2ded-11e6-bfe3-1a07ba6e61f1', 5.00000000, '2016-06-09 02:56:27', '2016-06-09 02:56:27');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('cca25f3a-2d24-11e6-9f2e-df967fc712f1', 'cc9b3815-2d24-11e6-9f2e-df967fc712f1', 18.00000000, '2016-06-08 02:57:55', '2016-06-08 02:57:55');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('d3e0554b-3dbf-11e6-b37b-f1c90dcb217f', 'd3d92c46-3dbf-11e6-b37b-f1c90dcb217f', 2.00000000, '2016-06-29 06:07:58', '2016-06-29 06:07:58');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('d9c9ab9a-2d20-11e6-9f2e-df967fc712f1', 'd9c28320-2d20-11e6-9f2e-df967fc712f1', 6.00000000, '2016-06-08 02:29:39', '2016-06-08 02:29:39');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('dddd9f24-3311-11e6-964e-ae3954e91258', 'dcac7464-3311-11e6-964e-ae3954e91258', 3.00000000, '2016-06-15 15:57:31', '2016-06-15 15:57:31');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('dea3e766-2c20-11e6-8879-06539fb34139', 'de9cc058-2c20-11e6-8879-06539fb34139', 8.00000000, '2016-06-06 19:57:16', '2016-06-06 19:57:16');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('ebb755a4-3fa1-11e6-8c27-1bf5c2fd32f3', 'ebb02e9d-3fa1-11e6-8c27-1bf5c2fd32f3', 2.00000000, '2016-07-01 15:38:55', '2016-07-01 15:38:55');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('ed29d443-3182-11e6-bda4-58f29e7e8856', 'ed22ad25-3182-11e6-bda4-58f29e7e8856', 4.00000000, '2016-06-13 16:21:47', '2016-06-13 16:21:47');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('edecabfc-2ee5-11e6-a1a3-d03b51387fbb', 'ede584e3-2ee5-11e6-a1a3-d03b51387fbb', 3.00000000, '2016-06-10 08:32:55', '2016-06-10 08:32:55');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('f040789b-2bfa-11e6-8879-06539fb34139', 'f039518b-2bfa-11e6-8879-06539fb34139', 2.00000000, '2016-06-06 15:25:45', '2016-06-06 15:25:45');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('f19ccf36-2d2b-11e6-9f2e-df967fc712f1', 'f19346a0-2d2b-11e6-9f2e-df967fc712f1', 8.00000000, '2016-06-08 03:49:04', '2016-06-08 03:49:04');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('f87ce75e-4727-11e6-874c-bc8a3124620f', 'f875c04c-4727-11e6-874c-bc8a3124620f', 3.00000000, '2016-07-11 05:26:07', '2016-07-11 05:26:07');
INSERT INTO indiewise_db.Watched (id, project, count, createdAt, updatedAt) VALUES ('fb79e6d9-4728-11e6-ba59-64be4d48eae5', 'fb705d70-4728-11e6-ba59-64be4d48eae5', 6.00000000, '2016-07-11 05:33:22', '2016-07-11 05:33:22');