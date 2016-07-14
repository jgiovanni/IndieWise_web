CREATE TABLE indiewise_db.Message
(
    id char(36) PRIMARY KEY NOT NULL,
    body text,
    createdAt datetime,
    conversation char(36),
    `from` char(36),
    CONSTRAINT conversation_conversation_bkname_messages FOREIGN KEY (conversation) REFERENCES Conversation (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT users_from_bkname_messages FOREIGN KEY (`from`) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX conversation_conversation_bkname_messages ON indiewise_db.Message (conversation);
CREATE UNIQUE INDEX message_id_unique ON indiewise_db.Message (id);
CREATE INDEX users_from_bkname_messages ON indiewise_db.Message (`from`);
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('147601c4-2da3-11e6-b3fc-b454ab633f47', 'yo, yup!', '2016-06-08 18:01:52', 'd4e7d14b-2a0a-11e6-a613-0e2ee6ca73a5', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('1505276f-3187-11e6-89fb-d5a8c8c9c779', 'Testing...', '2016-06-13 16:51:32', '14e3c680-3187-11e6-89fb-d5a8c8c9c779', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('29adb230-32cb-11e6-a1e2-7c89a788219b', 'welcome!', '2016-06-15 07:31:24', '2982c7d7-32cb-11e6-a1e2-7c89a788219b', '00000000-0000-776c-3364-6572444c6235');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('2bc78384-319a-11e6-bda4-58f29e7e8856', 'Welcome to IndieWise!', '2016-06-13 19:08:11', '2b97d539-319a-11e6-bda4-58f29e7e8856', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('3803e675-3190-11e6-bda4-58f29e7e8856', 'Testing 11', '2016-06-13 17:56:56', '37e2858b-3190-11e6-bda4-58f29e7e8856', '330d5f13-2133-11e6-874e-22a3540ace20');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('3c62b894-3588-11e6-b069-da2edfe9b29b', 'test', '2016-06-18 19:09:52', '3c8b3862-3588-11e6-8828-b7be8e0d870c', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('44efe49a-318a-11e6-bda4-58f29e7e8856', 'testing 2', '2016-06-13 17:14:21', '4627c9fc-318a-11e6-89fb-d5a8c8c9c779', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('4578f39f-3190-11e6-bda4-58f29e7e8856', 'testing 12', '2016-06-13 17:57:19', '452f0abf-3190-11e6-bda4-58f29e7e8856', '330d5f13-2133-11e6-874e-22a3540ace20');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('45b2d739-3588-11e6-b069-da2edfe9b29b', 'I can add A comment to a message?', '2016-06-18 19:10:08', '3c8b3862-3588-11e6-8828-b7be8e0d870c', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('4660e2db-342d-11e6-839c-2ef7ffe900d5', 'Just wanted to thank you for your feedback on my video!', '2016-06-17 01:46:14', '4956d43e-342d-11e6-9bae-53b6c16b9153', '5af5bf3d-28dd-11e6-add7-1362f0150681');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('48abecd4-318a-11e6-bda4-58f29e7e8856', 'testing 3', '2016-06-13 17:14:27', '488cee3a-318a-11e6-bda4-58f29e7e8856', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('4b9f44ac-337d-11e6-98c7-fb943f7bac0d', 'hi', '2016-06-16 04:46:31', '4b50983f-337d-11e6-98c7-fb943f7bac0d', '2dd91e43-3019-11e6-a803-f3837110b8a1');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('4d1efab4-3588-11e6-b069-da2edfe9b29b', '(You should change the is to say message)', '2016-06-18 19:10:20', '3c8b3862-3588-11e6-8828-b7be8e0d870c', '2badb299-3582-11e6-8828-b7be8e0d870c');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('53d68546-3cfd-11e6-8975-6f8d5b7bef9f', 'hey', '2016-06-28 06:55:41', '539625c8-3cfd-11e6-8975-6f8d5b7bef9f', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('5c812919-28dd-11e6-8d88-f97eb8a09b17', 'and again!', '2016-06-02 16:16:28', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('7430f2e2-319b-11e6-89fb-d5a8c8c9c779', 'testing again', '2016-06-13 19:17:22', '73fee17f-319b-11e6-89fb-d5a8c8c9c779', '330d5f13-2133-11e6-874e-22a3540ace20');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('758faf6d-2a0a-11e6-94bc-b20a1f8c62f8', 'hey', '2016-06-04 04:11:49', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('775963ac-3429-11e6-839c-2ef7ffe900d5', 'Thank you for your feedback!', '2016-06-17 01:18:58', '773a651b-3429-11e6-839c-2ef7ffe900d5', '00000000-0000-4279-3068-44657951375a');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('7d277969-3231-11e6-89fb-d5a8c8c9c779', 'How''s it going?', '2016-06-14 13:11:21', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('87bbd6ed-3194-11e6-89fb-d5a8c8c9c779', 'testing', '2016-06-13 18:27:48', '863b484f-3194-11e6-bda4-58f29e7e8856', '330d5f13-2133-11e6-874e-22a3540ace20');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('96cfb4e1-28df-11e6-8d88-f97eb8a09b17', 'Test B', '2016-06-02 16:32:25', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('9a25b10a-28d1-11e6-8d88-f97eb8a09b17', 'Testing messages', '2016-06-02 14:52:18', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('a18b2029-28dd-11e6-add7-1362f0150681', 'Lorem ipsum', '2016-06-02 16:18:24', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('bbafd1b1-28de-11e6-8d88-f97eb8a09b17', 'test A', '2016-06-02 16:26:17', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('cef9973e-2a0a-11e6-94bc-b20a1f8c62f8', 'yo', '2016-06-04 04:14:19', 'cee3aada-2a0a-11e6-a613-0e2ee6ca73a5', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('d4fb58cb-2a0a-11e6-94bc-b20a1f8c62f8', 'yo test', '2016-06-04 04:14:29', 'd4e7d14b-2a0a-11e6-a613-0e2ee6ca73a5', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('e63d4244-28dc-11e6-8d88-f97eb8a09b17', 'testing again!', '2016-06-02 16:13:10', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Message (id, body, createdAt, conversation, `from`) VALUES ('ece9f08e-2ba4-11e6-ad0b-203ff95236b1', 'Yo', '2016-06-06 05:10:03', '979ad394-28d1-11e6-8d88-f97eb8a09b17', '00000000-0000-3647-3736-70594a6b6457');