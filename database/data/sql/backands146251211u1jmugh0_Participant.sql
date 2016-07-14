CREATE TABLE indiewise_db.Participant
(
    id char(36) PRIMARY KEY NOT NULL,
    lastReadAt datetime,
    user char(36),
    conversation char(36),
    CONSTRAINT users_user_bkname_participant FOREIGN KEY (user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT conversation_conversation_bkname_participants FOREIGN KEY (conversation) REFERENCES Conversation (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX conversation_conversation_bkname_participants ON indiewise_db.Participant (conversation);
CREATE UNIQUE INDEX participant_id_unique ON indiewise_db.Participant (id);
CREATE INDEX users_user_bkname_participant ON indiewise_db.Participant (user);
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('1502c513-3187-11e6-89fb-d5a8c8c9c779', null, '00000000-0000-6463-7952-633635765552', '14e3c680-3187-11e6-89fb-d5a8c8c9c779');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('1505276f-3187-11e6-89fb-d5a8c8c9c779', null, '00000000-0000-3647-3736-70594a6b6457', '14e3c680-3187-11e6-89fb-d5a8c8c9c779');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('29ab4fa9-32cb-11e6-a1e2-7c89a788219b', null, '574287be-328b-11e6-acb8-176fa9e6cbc9', '2982c7d7-32cb-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('2bc521ea-319a-11e6-bda4-58f29e7e8856', null, '00000000-0000-3647-3736-70594a6b6457', '2b97d539-319a-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('2bc78384-319a-11e6-bda4-58f29e7e8856', null, 'ba45be32-316b-11e6-bda4-58f29e7e8856', '2b97d539-319a-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('2bda090e-32cb-11e6-acb8-176fa9e6cbc9', null, '00000000-0000-776c-3364-6572444c6235', '2982c7d7-32cb-11e6-a1e2-7c89a788219b');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('3801842b-3190-11e6-bda4-58f29e7e8856', null, '330d5f13-2133-11e6-874e-22a3540ace20', '37e2858b-3190-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('3c60563f-3588-11e6-b069-da2edfe9b29b', null, '2badb299-3582-11e6-8828-b7be8e0d870c', '3c8b3862-3588-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('3cb8843b-3588-11e6-8828-b7be8e0d870c', null, '00000000-0000-3647-3736-70594a6b6457', '3c8b3862-3588-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('44ed823e-318a-11e6-bda4-58f29e7e8856', null, '00000000-0000-6463-7952-633635765552', '4627c9fc-318a-11e6-89fb-d5a8c8c9c779');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('45769146-3190-11e6-bda4-58f29e7e8856', null, '330d5f13-2133-11e6-874e-22a3540ace20', '452f0abf-3190-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('48a98a77-318a-11e6-bda4-58f29e7e8856', null, '00000000-0000-6463-7952-633635765552', '488cee3a-318a-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('4975d12a-342d-11e6-9bae-53b6c16b9153', null, '5af5bf3d-28dd-11e6-add7-1362f0150681', '4956d43e-342d-11e6-9bae-53b6c16b9153');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('4b9f44ac-337d-11e6-98c7-fb943f7bac0d', null, '2dd91e43-3019-11e6-a803-f3837110b8a1', '4b50983f-337d-11e6-98c7-fb943f7bac0d');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('4e42e8aa-337d-11e6-8666-b3e971a26aee', null, '00000000-0000-3647-3736-70594a6b6457', '4b50983f-337d-11e6-98c7-fb943f7bac0d');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('53d68546-3cfd-11e6-8975-6f8d5b7bef9f', null, '69285671-35bb-11e6-8828-b7be8e0d870c', '539625c8-3cfd-11e6-8975-6f8d5b7bef9f');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('54c19c2d-3cfd-11e6-8988-9b575f1c7b6b', null, '00000000-0000-3647-3736-70594a6b6457', '539625c8-3cfd-11e6-8975-6f8d5b7bef9f');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('72d4ee40-319b-11e6-bda4-58f29e7e8856', null, '330d5f13-2133-11e6-874e-22a3540ace20', '73fee17f-319b-11e6-89fb-d5a8c8c9c779');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('77570154-3429-11e6-839c-2ef7ffe900d5', null, '00000000-0000-4279-3068-44657951375a', '773a651b-3429-11e6-839c-2ef7ffe900d5');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('7a6c21dc-3429-11e6-9bae-53b6c16b9153', null, '00000000-0000-6463-7952-633635765552', '773a651b-3429-11e6-839c-2ef7ffe900d5');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('865ca93a-3194-11e6-bda4-58f29e7e8856', null, '330d5f13-2133-11e6-874e-22a3540ace20', '863b484f-3194-11e6-bda4-58f29e7e8856');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('9a1e89fb-28d1-11e6-8d88-f97eb8a09b17', null, '00000000-0000-6463-7952-633635765552', '979ad394-28d1-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('9a20ec56-28d1-11e6-8d88-f97eb8a09b17', null, '00000000-0000-3647-3736-70594a6b6457', '979ad394-28d1-11e6-8d88-f97eb8a09b17');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('cef734e5-2a0a-11e6-94bc-b20a1f8c62f8', null, '00000000-0000-3647-3736-70594a6b6457', 'cee3aada-2a0a-11e6-a613-0e2ee6ca73a5');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('cef9973e-2a0a-11e6-94bc-b20a1f8c62f8', null, '00000000-0000-6463-7952-633635765552', 'cee3aada-2a0a-11e6-a613-0e2ee6ca73a5');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('d4f8f51e-2a0a-11e6-94bc-b20a1f8c62f8', null, '00000000-0000-3647-3736-70594a6b6457', 'd4e7d14b-2a0a-11e6-a613-0e2ee6ca73a5');
INSERT INTO indiewise_db.Participant (id, lastReadAt, user, conversation) VALUES ('d4fb58cb-2a0a-11e6-94bc-b20a1f8c62f8', null, '00000000-0000-6463-7952-633635765552', 'd4e7d14b-2a0a-11e6-a613-0e2ee6ca73a5');