CREATE TABLE indiewise_db.Search
(
    id char(36) PRIMARY KEY NOT NULL,
    count decimal(18,8) DEFAULT '0.00000000',
    createdAt datetime,
    term varchar(255),
    updatedAt datetime
);
CREATE UNIQUE INDEX search_id_unique ON indiewise_db.Search (id);
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-3032-7333-767175495339', 0.00000000, '2015-12-19 14:25:54', 'cr', '2015-12-19 14:25:54');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-304a-4c47-597956617539', 0.00000000, '2016-01-06 21:23:22', '[official video] winter wonderland/don’t worry be happy - pentatonix (ft tori kelly)', '2016-01-06 21:23:22');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-304e-446f-417438654834', 0.00000000, '2016-01-15 20:34:15', 'alexander', '2016-01-15 20:34:15');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-306e-585a-77364f4d3456', 13.00000000, '2016-01-08 05:57:24', 'what lies beyond', '2016-01-21 14:38:01');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-3168-3658-706f34467565', 5.00000000, '2015-12-22 03:41:39', 'jerez', '2015-12-29 18:22:58');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-3367-7a43-456450356e32', 0.00000000, '2016-01-15 17:07:37', 'knowles', '2016-01-15 17:07:37');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-366d-6b46-424171757468', 1.00000000, '2016-01-15 20:33:40', '8 mile', '2016-01-15 20:33:48');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-3851-6432-4c6c554b4768', 11.00000000, '2016-01-10 01:39:24', 'game over short action/thriller', '2016-01-12 18:48:59');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-4256-5a47-374153626774', 0.00000000, '2016-01-15 17:06:57', 'ki', '2016-01-15 17:06:57');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-4639-3436-41745a4d636b', 0.00000000, '2016-01-06 03:25:20', 'fetty', '2016-01-06 03:25:20');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-4652-6356-373658316443', 6.00000000, '2015-12-18 19:18:09', 'straight outta compton music video', '2016-01-04 07:48:36');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-4769-574e-6a663556765a', 0.00000000, '2016-01-12 17:53:17', 'game over short action%2fthriller', '2016-01-12 17:53:17');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-4d6e-5463-376879716137', 0.00000000, '2016-02-28 02:00:25', 'fear', '2016-02-28 02:00:25');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-507a-3866-48305a4c6e46', 0.00000000, '2015-12-22 03:42:09', 'erez', '2015-12-22 03:42:09');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-5135-6846-6d5769446271', 0.00000000, '2016-01-15 20:34:42', 'fratricide', '2016-01-15 20:34:42');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-5255-7255-4a677354526a', 0.00000000, '2016-01-15 16:58:28', 'what', '2016-01-15 16:58:28');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-544e-686c-38333174386a', 1.00000000, '2016-01-04 00:45:06', 'compton', '2016-01-07 06:17:46');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-5751-4869-4b376e634661', 1.00000000, '2016-01-15 16:58:15', 'what lies beyo', '2016-01-15 16:58:19');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-5865-3757-364565344c79', 0.00000000, '2015-12-23 19:46:29', 'er', '2015-12-23 19:46:29');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-5a6e-7162-576947385467', 9.00000000, '2016-01-11 03:26:26', 'game over', '2016-01-11 14:18:37');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-624c-5358-35646d584157', 3.00000000, '2016-01-15 17:06:22', 'k', '2016-01-16 04:03:42');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-6442-664d-384578556d30', 0.00000000, '2016-01-11 03:12:39', 'te', '2016-01-11 03:12:39');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-6474-724f-6d6e666d4947', 0.00000000, '2015-12-23 19:39:17', 'str', '2015-12-23 19:39:17');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-6b4c-4b64-3648384f6366', 1.00000000, '2016-01-08 01:28:53', 'americano', '2016-01-15 20:34:06');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7134-6846-775170707375', 4.00000000, '2015-12-18 19:18:43', 'penado go farrin for summer', '2016-01-16 04:39:00');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7170-7267-426f78745358', 2.00000000, '2016-01-08 05:57:30', 'what lie', '2016-04-20 21:42:45');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7172-3866-5a7738716263', 0.00000000, '2015-12-24 15:50:47', 'immensity', '2015-12-24 15:50:47');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7278-6275-624e7859376a', 1.00000000, '2015-12-18 12:40:50', 'epic', '2015-12-18 12:52:43');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7339-6269-50563464684d', 13.00000000, '2015-12-22 03:43:51', 'what lies beyond trailer', '2016-04-20 21:42:58');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7564-4a4c-374e51435669', 0.00000000, '2016-01-11 14:18:28', 'text', '2016-01-11 14:18:28');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-774d-7673-443669687676', 1.00000000, '2016-01-15 20:34:30', 'dude', '2016-01-16 02:35:36');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7752-4572-5265746c6a65', 3.00000000, '2015-12-18 13:07:00', 'crappy situation', '2015-12-29 18:23:22');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7a57-3277-785643456735', 0.00000000, '2016-01-16 11:21:25', 'tori kelly', '2016-01-16 11:21:25');
INSERT INTO indiewise_db.Search (id, count, createdAt, term, updatedAt) VALUES ('00000000-0000-7a5a-326f-303631566641', 2.00000000, '2016-01-15 16:58:22', 'what lies', '2016-03-12 20:59:07');