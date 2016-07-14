CREATE TABLE indiewise_db.Comment
(
    id char(36) PRIMARY KEY NOT NULL,
    body varchar(255),
    createdAt datetime,
    editedAt datetime,
    parentComment char(36),
    parentCritique char(36),
    repliedAt datetime,
    replyCount decimal(18,8) DEFAULT '0.00000000',
    updatedAt datetime,
    author char(36),
    CONSTRAINT comment_parentcomment_bkname_comment_parentComment FOREIGN KEY (parentComment) REFERENCES Comment (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT critique_parentcritique_bkname_comment_parentCritique FOREIGN KEY (parentCritique) REFERENCES Critique (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT users_author_bkname_comments FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX comment_id_unique ON indiewise_db.Comment (id);
CREATE INDEX comment_parentcomment_bkname_comment_parentComment ON indiewise_db.Comment (parentComment);
CREATE INDEX critique_parentcritique_bkname_comment_parentCritique ON indiewise_db.Comment (parentCritique);
CREATE INDEX users_author_bkname_comments ON indiewise_db.Comment (author);
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('08701cff-2ed3-11e6-838e-bc1d0f2f928f', '3 cooler!', '2016-06-10 06:17:39', null, '6f6bd138-2ed2-11e6-a1a3-d03b51387fbb', 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', null, 0.00000000, '2016-06-10 06:17:39', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('0dd9a4bb-364c-11e6-8dcf-8bc10eacec46', 'I agree with Jarrod, it was very refreshing and the main characters became personable very quickly!', '2016-06-19 18:31:35', null, null, '866fdb64-35cf-11e6-b069-da2edfe9b29b', '2016-06-20 04:26:17', 1.00000000, '2016-06-19 18:31:35', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('1efb12d9-2ed2-11e6-838e-bc1d0f2f928f', 'cooler!', '2016-06-10 06:11:07', null, '32ecdd1c-2ed1-11e6-838e-bc1d0f2f928f', 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', null, 0.00000000, '2016-06-10 06:11:07', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('2022a042-369f-11e6-8dcf-8bc10eacec46', '4 sure', '2016-06-20 04:26:14', null, '0dd9a4bb-364c-11e6-8dcf-8bc10eacec46', '866fdb64-35cf-11e6-b069-da2edfe9b29b', null, 0.00000000, '2016-06-20 04:26:14', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('20521aaa-381c-11e6-9a3b-282a510a8b6f', 'testing', '2016-06-22 01:53:33', null, null, 'c43f9197-2a03-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-22 01:53:33', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('24af9bf1-365d-11e6-8dcf-8bc10eacec46', 'testing', '2016-06-19 20:33:55', null, null, 'c43f9197-2a03-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-19 20:33:55', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('2a7c6398-2b26-11e6-a1af-71b9b48fc188', 'testing comments', '2016-06-05 14:02:40', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 14:02:40', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('32ecdd1c-2ed1-11e6-838e-bc1d0f2f928f', 'Cool', '2016-06-10 06:04:31', null, null, 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', '2016-06-10 06:11:15', 1.00000000, '2016-06-10 06:04:31', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('3813bebe-2b33-11e6-a1af-71b9b48fc188', 'testing', '2016-06-05 15:36:06', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 15:36:06', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('3e245471-2ed2-11e6-838e-bc1d0f2f928f', '2 cool', '2016-06-10 06:12:00', null, null, 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', '2016-06-10 06:17:01', 2.00000000, '2016-06-10 06:12:00', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('3e3b3baf-2b2f-11e6-ad0b-203ff95236b1', 'testing comment post', '2016-06-05 15:07:38', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 15:07:38', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('3e6aecbf-365d-11e6-8dcf-8bc10eacec46', 'testing again', '2016-06-19 20:34:38', null, null, 'c43f9197-2a03-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-19 20:34:38', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('3ed9b7f0-2ed3-11e6-a1a3-d03b51387fbb', '4 cool!', '2016-06-10 06:19:10', null, null, 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', null, 0.00000000, '2016-06-10 06:19:10', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('486bde1a-2b33-11e6-a1af-71b9b48fc188', 'test', '2016-06-05 15:36:33', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', '2016-06-05 15:40:36', 1.00000000, '2016-06-05 15:36:33', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('4c8fe0bc-2b26-11e6-a1af-71b9b48fc188', 'testing comments again', '2016-06-05 14:03:37', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 14:03:37', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('4ed27e7a-3640-11e6-8503-2b2a187ec926', 'thanks so much! I appreciate that!', '2016-06-19 17:07:30', null, null, 'd52881a1-3604-11e6-8dcf-8bc10eacec46', null, 0.00000000, '2016-06-19 17:07:30', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('6f6bd138-2ed2-11e6-a1a3-d03b51387fbb', '3 cool!', '2016-06-10 06:13:22', null, null, 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', '2016-06-10 06:17:46', 1.00000000, '2016-06-10 06:13:22', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('70fcec0c-2a15-11e6-a613-0e2ee6ca73a5', 'lol', '2016-06-04 05:30:25', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 05:30:25', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('7ab3b753-2b33-11e6-a1af-71b9b48fc188', 'test2', '2016-06-05 15:37:58', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', '2016-06-05 15:38:49', 2.00000000, '2016-06-05 15:37:58', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('7d0b2160-3285-11e6-acb8-176fa9e6cbc9', 'thanks man. Was maybe hoping for a higher rating... :/', '2016-06-14 23:12:39', null, null, '1bd5cdb9-3279-11e6-acb8-176fa9e6cbc9', null, 0.00000000, '2016-06-14 23:12:39', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('85df98f7-3336-11e6-8666-b3e971a26aee', 'I agree with you! He made some good points, but the overall message came across negative in my opinion', '2016-06-15 20:19:54', null, null, '8a4b1ef8-32a5-11e6-a1e2-7c89a788219b', null, 0.00000000, '2016-06-15 20:19:54', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('8c29efc0-2b33-11e6-a1af-71b9b48fc188', 'test reply', '2016-06-05 15:38:27', null, '7ab3b753-2b33-11e6-a1af-71b9b48fc188', 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 15:38:27', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('8e50007f-2ed2-11e6-a1a3-d03b51387fbb', '2 cooler!', '2016-06-10 06:14:14', null, '3e245471-2ed2-11e6-838e-bc1d0f2f928f', 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', null, 0.00000000, '2016-06-10 06:14:14', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('99244ac4-2b33-11e6-ad0b-203ff95236b1', 'test reply', '2016-06-05 15:38:49', null, '7ab3b753-2b33-11e6-a1af-71b9b48fc188', 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 15:38:49', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('acbdec76-2a14-11e6-94bc-b20a1f8c62f8', 'testing comment', '2016-06-04 05:24:56', null, null, '91c8d21c-29f5-11e6-94bc-b20a1f8c62f8', null, 0.00000000, '2016-06-04 05:24:56', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('b72e83bb-2a14-11e6-94bc-b20a1f8c62f8', 'testing comment again', '2016-06-04 05:25:14', null, null, '91c8d21c-29f5-11e6-94bc-b20a1f8c62f8', null, 0.00000000, '2016-06-04 05:25:14', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('bb9b7402-2a14-11e6-a613-0e2ee6ca73a5', 'yup', '2016-06-04 05:25:21', null, 'e1031f8e-2a0d-11e6-a613-0e2ee6ca73a5', 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 05:25:21', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('c085c8f2-2a14-11e6-94bc-b20a1f8c62f8', 'nice', '2016-06-04 05:25:29', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 05:25:29', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('ccc10647-2d90-11e6-bfe3-1a07ba6e61f1', 'Thanks bro for this epic rating!', '2016-06-08 15:51:01', null, null, 'a1a13f8b-2d30-11e6-b1f2-2cbdc1a26111', '2016-06-08 15:51:26', 1.00000000, '2016-06-08 15:51:01', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('cde09d49-2a14-11e6-94bc-b20a1f8c62f8', 'test 3', '2016-06-04 05:25:52', null, null, '91c8d21c-29f5-11e6-94bc-b20a1f8c62f8', null, 0.00000000, '2016-06-04 05:25:52', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('d877e5c3-2a14-11e6-a613-0e2ee6ca73a5', 'test 4', '2016-06-04 05:26:10', null, null, '91c8d21c-29f5-11e6-94bc-b20a1f8c62f8', null, 0.00000000, '2016-06-04 05:26:10', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('d87ff6de-2d90-11e6-b3fc-b454ab633f47', 'Test reply', '2016-06-08 15:51:21', null, 'ccc10647-2d90-11e6-bfe3-1a07ba6e61f1', 'a1a13f8b-2d30-11e6-b1f2-2cbdc1a26111', null, 0.00000000, '2016-06-08 15:51:21', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('d8eade26-2b33-11e6-ad0b-203ff95236b1', 'reply 3', '2016-06-05 15:40:36', null, '486bde1a-2b33-11e6-a1af-71b9b48fc188', 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 15:40:36', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('dcb0e1ed-2a0d-11e6-a613-0e2ee6ca73a5', 'I agree with you', '2016-06-04 04:36:10', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 04:36:10', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('df6d472e-2a15-11e6-94bc-b20a1f8c62f8', 'tested', '2016-06-04 05:33:31', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 05:33:31', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('e0741342-2a0d-11e6-a613-0e2ee6ca73a5', 'I agree with you', '2016-06-04 04:36:16', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 04:36:16', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('e1031f8e-2a0d-11e6-a613-0e2ee6ca73a5', 'I agree with you', '2016-06-04 04:36:17', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', '2016-06-04 05:25:21', 1.00000000, '2016-06-04 04:36:17', 'eac26662-2a0b-11e6-94bc-b20a1f8c62f8');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('ec3170ba-326e-11e6-a1e2-7c89a788219b', 'thanks man', '2016-06-14 20:31:07', null, null, 'dd4cec38-3260-11e6-acb8-176fa9e6cbc9', null, 0.00000000, '2016-06-14 20:31:07', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('ed11c683-2b22-11e6-ad0b-203ff95236b1', 'and again!', '2016-06-05 13:39:28', null, 'fab45af4-2a15-11e6-94bc-b20a1f8c62f8', 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-05 13:39:28', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('f0a3ba8f-2ed2-11e6-a1a3-d03b51387fbb', '2 coolest!!', '2016-06-10 06:16:59', null, '3e245471-2ed2-11e6-838e-bc1d0f2f928f', 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', null, 0.00000000, '2016-06-10 06:16:59', '00000000-0000-6463-7952-633635765552');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('f0cba6ec-2a15-11e6-94bc-b20a1f8c62f8', 'test', '2016-06-04 05:34:00', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 05:34:00', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('f6cc3660-2a15-11e6-a613-0e2ee6ca73a5', 'lol', '2016-06-04 05:34:10', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', null, 0.00000000, '2016-06-04 05:34:10', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('fab45af4-2a15-11e6-94bc-b20a1f8c62f8', 'again', '2016-06-04 05:34:17', null, null, 'bab9ee81-2a0d-11e6-a613-0e2ee6ca73a5', '2016-06-05 13:39:29', 1.00000000, '2016-06-04 05:34:17', '00000000-0000-3647-3736-70594a6b6457');
INSERT INTO indiewise_db.Comment (id, body, createdAt, editedAt, parentComment, parentCritique, repliedAt, replyCount, updatedAt, author) VALUES ('fcca51f3-365a-11e6-8503-2b2a187ec926', 'testing quick reply', '2016-06-19 20:18:29', null, null, 'c151062e-2ed0-11e6-838e-bc1d0f2f928f', null, 0.00000000, '2016-06-19 20:18:29', '00000000-0000-6463-7952-633635765552');