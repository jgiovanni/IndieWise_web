CREATE TABLE indiewise_db.Genre
(
    id char(36) PRIMARY KEY NOT NULL,
    createdAt datetime,
    name varchar(255),
    slug varchar(255),
    updatedAt datetime
);
CREATE UNIQUE INDEX genre_id_unique ON indiewise_db.Genre (id);
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-3830-314d-4f737a4f7a48', '2015-08-28 22:47:00', 'Adventure', 'adventure', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-4437-4434-79793043776a', '2015-08-30 02:12:28', 'Horror', 'horror', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-4859-704f-4850776c3832', '2015-08-28 22:14:10', 'Action', 'action', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-6464-5078-576e48454935', '2015-08-30 02:12:42', 'Romance', 'romance', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-6836-686c-514f73497367', '2015-08-30 02:13:28', 'Urban', 'urban', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-6a61-675a-465961664965', '2015-08-30 02:11:38', 'Fantasy', 'fantasy', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-6a76-6255-6d306973774c', '2015-08-28 22:48:13', 'Crime', 'crime', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-6d7a-6457-466262576e32', '2015-08-28 22:47:48', 'Comedy', 'comedy', '2015-09-11 07:10:30');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-7035-724e-4361685a4467', '2015-08-30 02:13:12', 'Suspense/Thriller', 'suspense-thriller', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-7166-474e-59625879514f', '2015-08-30 02:12:58', 'Science Fiction', 'science-fiction', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-7366-6b52-45734c4a6e48', '2015-08-30 02:12:12', 'Historical', 'historical', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-7370-424d-7053397a3446', '2015-08-30 02:11:51', 'Film Noir', 'film-noir', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-7462-5545-56724a367961', '2015-08-28 22:48:43', 'Drama', 'drama', '2015-09-11 07:03:26');
INSERT INTO indiewise_db.Genre (id, createdAt, name, slug, updatedAt) VALUES ('00000000-0000-7650-4530-684b75454d7a', '2015-10-02 19:09:32', 'Other', 'other', '2015-10-02 19:09:35');