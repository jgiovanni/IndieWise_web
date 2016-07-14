CREATE TABLE indiewise_db.Playlist
(
    id char(36) PRIMARY KEY NOT NULL,
    name varchar(255),
    private bit(1) DEFAULT b'0',
    user char(36),
    CONSTRAINT users_user_bkname_playlists FOREIGN KEY (user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX playlist_id_unique ON indiewise_db.Playlist (id);
CREATE INDEX users_user_bkname_playlists ON indiewise_db.Playlist (user);
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('0976f4f9-2dfa-11e6-bfe3-1a07ba6e61f1', 'Wsf vids', false, '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('13810e94-2dfa-11e6-bfe3-1a07ba6e61f1', 'Wsf', false, '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('196cb7ed-2ff9-11e6-a803-f3837110b8a1', 'Favorites', true, '19632e85-2ff9-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('1eeef974-3046-11e6-a803-f3837110b8a1', 'Favorites', true, '1ee5713f-3046-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('249476f3-368e-11e6-8503-2b2a187ec926', 'Favorites', true, '248aed84-368e-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('2710b053-4724-11e6-874c-bc8a3124620f', 'Favorites', true, '270726f9-4724-11e6-874c-bc8a3124620f');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('299946f0-35a0-11e6-8828-b7be8e0d870c', 'test2', false, '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('2bb4d7fa-3582-11e6-8828-b7be8e0d870c', 'Favorites', true, '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('2bb73b53-3582-11e6-8828-b7be8e0d870c', 'Watch Later', true, '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('2de2a65e-3019-11e6-a803-f3837110b8a1', 'Favorites', true, '2dd91e43-3019-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('2de50a08-3019-11e6-a803-f3837110b8a1', 'Watch Later', true, '2dd91e43-3019-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('358df6ad-4726-11e6-874c-bc8a3124620f', 'Favorites', true, '3586ce83-4726-11e6-874c-bc8a3124620f');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('3590591e-4726-11e6-874c-bc8a3124620f', 'Watch Later', true, '3586ce83-4726-11e6-874c-bc8a3124620f');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('41fd70f4-337c-11e6-8666-b3e971a26aee', 'Favorites', true, '41f3e78d-337c-11e6-8666-b3e971a26aee');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('49627814-329c-11e6-a1e2-7c89a788219b', 'Favorites', true, '4958eea5-329c-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('5749adf7-328b-11e6-acb8-176fa9e6cbc9', 'Favorites', true, '574287be-328b-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('6931e002-35bb-11e6-8828-b7be8e0d870c', 'Favorites', true, '69285671-35bb-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('6f5429b5-37f0-11e6-b877-628b485ab83f', 'Favorites', true, '6f4aa052-37f0-11e6-b877-628b485ab83f');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('6f741d93-3809-11e6-b877-628b485ab83f', 'Favorites', true, '6f6a942b-3809-11e6-b877-628b485ab83f');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('798b90e7-4996-11e6-80ef-d8b01b295d90', 'Favorites', true, '797f9ba6-4996-11e6-80ef-d8b01b295d90');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('798cc966-4996-11e6-80ef-d8b01b295d90', 'Watch Later', true, '797f9ba6-4996-11e6-80ef-d8b01b295d90');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('80129e49-3ce2-11e6-8975-6f8d5b7bef9f', 'test 3', false, '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('855a7f0c-3384-11e6-8666-b3e971a26aee', 'Favorites', true, '8550f727-3384-11e6-8666-b3e971a26aee');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('8eba14f5-2bee-11e6-8879-06539fb34139', 'My Cool Playlist', false, '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('992369cd-359f-11e6-b069-da2edfe9b29b', 'Another Playlist', false, '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('a0d7760a-32cc-11e6-a1e2-7c89a788219b', 'Favorites', true, 'a0cdec71-32cc-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('a15f80f6-3585-11e6-b069-da2edfe9b29b', 'Tet', false, '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('a27011ef-3672-11e6-8503-2b2a187ec926', 'Favorites', true, 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('a271249e-3672-11e6-8503-2b2a187ec926', 'Watch Later', true, 'a267aab9-3672-11e6-8503-2b2a187ec926');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('a4247166-3585-11e6-8828-b7be8e0d870c', 'test', false, '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('af13d73a-3278-11e6-acb8-176fa9e6cbc9', 'Favorites', true, 'ae6f55c2-3278-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('afc813e2-325f-11e6-acb8-176fa9e6cbc9', 'Favorites', true, 'afbe8a77-325f-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('afca763f-325f-11e6-acb8-176fa9e6cbc9', 'Watch Later', true, 'afbe8a77-325f-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('ba4f47c1-316b-11e6-bda4-58f29e7e8856', 'Favorites', true, 'ba45be32-316b-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('ba51a9f5-316b-11e6-bda4-58f29e7e8856', 'Watch Later', true, 'ba45be32-316b-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('c5786129-4540-11e6-9245-e53ed8e64ac8', 'Favorites', true, 'c5713a00-4540-11e6-9245-e53ed8e64ac8');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('c57ac364-4540-11e6-9245-e53ed8e64ac8', 'Watch Later', true, 'c5713a00-4540-11e6-9245-e53ed8e64ac8');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('c728f4f7-4781-11e6-874c-bc8a3124620f', 'Favorites', true, 'c71f6b47-4781-11e6-874c-bc8a3124620f');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('dd080e91-3381-11e6-98c7-fb943f7bac0d', 'Favorites', true, 'dcfe852d-3381-11e6-98c7-fb943f7bac0d');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('dd0a70ee-3381-11e6-98c7-fb943f7bac0d', 'Watch Later', true, 'dcfe852d-3381-11e6-98c7-fb943f7bac0d');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('e64d8188-44b9-11e6-af2d-4338a59813d0', 'Favorites', true, 'e643f6ae-44b9-11e6-af2d-4338a59813d0');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('e64fe3bc-44b9-11e6-af2d-4338a59813d0', 'Watch Later', true, 'e643f6ae-44b9-11e6-af2d-4338a59813d0');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('f3567355-30eb-11e6-af43-1e2bf94a7604', 'Favorites', true, 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('f358d743-30eb-11e6-af43-1e2bf94a7604', 'Watch Later', true, 'f34f4e04-30eb-11e6-af43-1e2bf94a7604');
INSERT INTO indiewise_db.Playlist (id, name, private, user) VALUES ('fcbd8b1b-359f-11e6-b069-da2edfe9b29b', 'test', false, '00000000-0000-6463-7952-633635765552');