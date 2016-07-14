CREATE TABLE indiewise_db.PlaylistItem
(
    id char(36) PRIMARY KEY NOT NULL,
    playlist char(36),
    project varchar(255),
    CONSTRAINT playlist_playlist_bkname_items FOREIGN KEY (playlist) REFERENCES Playlist (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX playlistitem_id_unique ON indiewise_db.PlaylistItem (id);
CREATE INDEX playlist_playlist_bkname_items ON indiewise_db.PlaylistItem (playlist);
INSERT INTO indiewise_db.PlaylistItem (id, playlist, project) VALUES ('686ac4e7-2e5b-11e6-90b0-6d7b7e0b3f1c', '13810e94-2dfa-11e6-bfe3-1a07ba6e61f1', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1');
INSERT INTO indiewise_db.PlaylistItem (id, playlist, project) VALUES ('77ef2bf9-3586-11e6-b069-da2edfe9b29b', '2bb73b53-3582-11e6-8828-b7be8e0d870c', 'dcac7464-3311-11e6-964e-ae3954e91258');
INSERT INTO indiewise_db.PlaylistItem (id, playlist, project) VALUES ('9ece5509-3585-11e6-8828-b7be8e0d870c', '2bb4d7fa-3582-11e6-8828-b7be8e0d870c', 'dcac7464-3311-11e6-964e-ae3954e91258');
INSERT INTO indiewise_db.PlaylistItem (id, playlist, project) VALUES ('a5826174-3fb3-11e6-a2f6-58b58feef1b1', 'f358d743-30eb-11e6-af43-1e2bf94a7604', 'ebb02e9d-3fa1-11e6-8c27-1bf5c2fd32f3');
INSERT INTO indiewise_db.PlaylistItem (id, playlist, project) VALUES ('a76bfd87-3fb3-11e6-8c27-1bf5c2fd32f3', 'f3567355-30eb-11e6-af43-1e2bf94a7604', 'ebb02e9d-3fa1-11e6-8c27-1bf5c2fd32f3');
INSERT INTO indiewise_db.PlaylistItem (id, playlist, project) VALUES ('cb3d9507-32d2-11e6-acb8-176fa9e6cbc9', 'a0d7760a-32cc-11e6-a1e2-7c89a788219b', '59474902-32a3-11e6-acb8-176fa9e6cbc9');
INSERT INTO indiewise_db.PlaylistItem (id, playlist, project) VALUES ('db90e6fb-2bf4-11e6-917b-88aff6d1ce80', '8eba14f5-2bee-11e6-8879-06539fb34139', '3cac9b10-28da-11e6-add7-1362f0150681');