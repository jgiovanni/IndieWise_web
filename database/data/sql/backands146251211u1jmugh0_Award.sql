CREATE TABLE indiewise_db.Award
(
    id char(36) PRIMARY KEY NOT NULL,
    createdAt datetime,
    name varchar(255),
    slug varchar(255),
    updatedAt datetime
);
CREATE UNIQUE INDEX award_id_unique ON indiewise_db.Award (id);
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('080c2d0b-1ccf-11e6-b1e1-e12b04098a26', '2016-05-18 08:03:40', 'Best Special Effects', 'best-special-effects', '2016-05-18 08:03:40');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('0c6a14ea-1496-11e6-89ed-2088f168c8bb', '2016-05-07 20:55:36', 'Best Cinematography', 'best-cinematography', '2016-05-07 20:55:36');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('0f5adc74-28ef-11e6-b8db-86ac961c55b2', '2016-06-02 18:23:10', 'Most Motivational', 'most-motivational', '2016-06-02 18:23:10');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('0febe7ca-1ccf-11e6-a2ae-ad4c5d3797ab', '2016-05-18 08:03:53', 'Best Stuntperson', 'best-stuntperson', '2016-05-18 08:03:53');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('15462612-28ef-11e6-8d88-f97eb8a09b17', '2016-06-02 18:23:20', 'Most Inspiring', 'most-inspiring', '2016-06-02 18:23:20');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('1ef8a27c-1ccf-11e6-a2ae-ad4c5d3797ab', '2016-05-18 08:04:18', 'Best Foreign Language Film', 'best-foreign-language-film', '2016-05-18 08:04:18');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('295d4fa7-1ccf-11e6-a2ae-ad4c5d3797ab', '2016-05-18 08:04:35', 'Best Original Song', 'best-original-song', '2016-05-18 08:04:35');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('3458107f-28e7-11e6-b8db-86ac961c55b2', '2016-06-02 17:26:56', 'Most Adventurous', 'most-adventurous', '2016-06-02 17:26:56');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('3f4161fc-1cce-11e6-a2ae-ad4c5d3797ab', '2016-05-18 07:58:03', 'Best Actor', 'best-actor', '2016-05-18 07:58:03');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('41395363-28e7-11e6-b8db-86ac961c55b2', '2016-06-02 17:27:17', 'Most Bizarre', 'most-bizarre', '2016-06-02 17:27:17');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('499c84a2-1cce-11e6-a2ae-ad4c5d3797ab', '2016-05-18 07:58:20', 'Best Actress', 'best-actress', '2016-05-18 07:58:42');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('53748823-1cce-11e6-a2ae-ad4c5d3797ab', '2016-05-18 07:58:37', 'Best Director', 'best-director', '2016-05-18 07:58:37');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('6950ef19-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 07:59:13', 'Best Music Score', 'best-music-score', '2016-05-18 07:59:13');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('6f197b67-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 07:59:23', 'Best Screenplay', 'best-screenplay', '2016-05-18 07:59:23');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('75322f6b-1cce-11e6-a2ae-ad4c5d3797ab', '2016-05-18 07:59:33', 'Best Editing', 'best-editing', '2016-05-18 07:59:33');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('7e42d9bd-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 07:59:48', 'Best Sound Design', 'best-sound-design', '2016-05-18 07:59:48');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('85f1c5e8-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:00:01', 'Best Feature', 'best-feature', '2016-05-18 08:00:01');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('883c607e-28e7-11e6-b8db-86ac961c55b2', '2016-06-02 17:29:16', 'Most Controversial', 'most-controversial', '2016-06-02 17:29:16');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('90377833-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:00:18', 'Best Narrative Short', 'best-narrative-short', '2016-05-18 08:00:18');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('97bb79cf-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:00:31', 'Best Documentary', 'best-documentary', '2016-05-18 08:00:31');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('9d36bc6e-1cce-11e6-a2ae-ad4c5d3797ab', '2016-05-18 08:00:40', 'Best Animation', 'best-animation', '2016-05-18 08:00:40');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('9dc945b9-28e7-11e6-b8db-86ac961c55b2', '2016-06-02 17:29:53', 'Most Daring', 'most-daring', '2016-06-02 17:29:53');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('a4e45e82-28e7-11e6-b8db-86ac961c55b2', '2016-06-02 17:30:05', 'Most Dramatic', 'most-dramatic', '2016-06-02 17:30:05');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('a77d6f63-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:00:58', 'Best Visual Effects', 'best-visual-effects', '2016-05-18 08:00:58');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('ac128a32-28e7-11e6-b8db-86ac961c55b2', '2016-06-02 17:30:17', 'Most Entertaining', 'most-entertaining', '2016-06-02 17:30:17');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('af87e84b-28e7-11e6-8d88-f97eb8a09b17', '2016-06-02 17:30:22', 'Most Epic', 'most-epic', '2016-06-02 17:30:22');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('afcb0ccd-1cce-11e6-a2ae-ad4c5d3797ab', '2016-05-18 08:01:11', 'Best Recording Artist', 'best-recording-artist', '2016-05-18 08:01:11');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('b46c2345-28ee-11e6-b8db-86ac961c55b2', '2016-06-02 18:20:37', 'Most Humorous', 'most-humorous', '2016-06-02 18:20:37');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('bb53a64a-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:01:31', 'Best Web Series', 'best-web-series', '2016-05-18 08:01:31');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('be953a15-28ee-11e6-b8db-86ac961c55b2', '2016-06-02 18:20:54', 'Most Influential', 'most-influential', '2016-06-02 18:20:54');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('ca1f2e22-28ee-11e6-b8db-86ac961c55b2', '2016-06-02 18:21:13', 'Most Informative', 'most-informative', '2016-06-02 18:21:13');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('cb29f804-1cce-11e6-a2ae-ad4c5d3797ab', '2016-05-18 08:01:57', 'Best Youth In Arts (For Filmmakers/Artists Under 16)', 'best-youth-in-arts', '2016-05-18 08:01:57');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('d38fd1a9-28ee-11e6-8d88-f97eb8a09b17', '2016-06-02 18:21:29', 'Most Revolutionary', 'most-revolutionary', '2016-06-02 18:21:29');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('d6809000-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:02:16', 'Best Music Video', 'best-music-video', '2016-05-18 08:02:16');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('dd3eaddf-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:02:28', 'Best Trailer', 'best-trailer', '2016-05-18 08:02:28');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('e4ce991e-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:02:40', 'Best Costume Design', 'best-costume-design', '2016-05-18 08:02:40');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('ed4d84dc-28ee-11e6-8d88-f97eb8a09b17', '2016-06-02 18:22:12', 'Most Romantic', 'most-romantic', '2016-06-02 18:22:12');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('ee343212-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:02:56', 'Best Production Design', 'best-production-design', '2016-05-18 08:02:56');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('f327193f-28e6-11e6-b8db-86ac961c55b2', '2016-06-02 17:25:06', 'Most Action-Packed', 'most-action-packed', '2016-06-02 17:25:06');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('f92bd818-28ee-11e6-b8db-86ac961c55b2', '2016-06-02 18:22:32', 'Most Suspenseful', 'most-suspenseful', '2016-06-02 18:22:32');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('fc312b3b-1cce-11e6-b1e1-e12b04098a26', '2016-05-18 08:03:20', 'Best Makeup and Hairstyling', 'best-makeup-hairstyling', '2016-05-18 08:03:20');
INSERT INTO indiewise_db.Award (id, createdAt, name, slug, updatedAt) VALUES ('ffdaae27-28ee-11e6-8d88-f97eb8a09b17', '2016-06-02 18:22:44', 'Most Terrifying', 'most-terrifying', '2016-06-02 18:22:44');