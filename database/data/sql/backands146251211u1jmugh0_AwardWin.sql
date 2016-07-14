CREATE TABLE indiewise_db.AwardWin
(
    id char(36) PRIMARY KEY NOT NULL,
    award char(36),
    createdAt datetime,
    rewarded bit(1),
    rewardedAt datetime,
    updatedAt datetime,
    project char(36),
    CONSTRAINT award_award_bkname_awardwin_award FOREIGN KEY (award) REFERENCES Award (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT project_project_bkname_wins FOREIGN KEY (project) REFERENCES Project (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX awardwin_id_unique ON indiewise_db.AwardWin (id);
CREATE INDEX award_award_bkname_awardwin_award ON indiewise_db.AwardWin (award);
CREATE INDEX project_project_bkname_wins ON indiewise_db.AwardWin (project);
INSERT INTO indiewise_db.AwardWin (id, award, createdAt, rewarded, rewardedAt, updatedAt, project) VALUES ('6cd959e9-2ae7-11e6-870a-22000bde862e', 'afcb0ccd-1cce-11e6-a2ae-ad4c5d3797ab', '2016-06-05 06:33:33', null, null, null, '3cac9b10-28da-11e6-add7-1362f0150681');
INSERT INTO indiewise_db.AwardWin (id, award, createdAt, rewarded, rewardedAt, updatedAt, project) VALUES ('6cdf5b11-2d30-11e6-870a-22000bde862e', 'dd3eaddf-1cce-11e6-b1e1-e12b04098a26', '2016-06-08 04:21:08', null, null, null, 'f19346a0-2d2b-11e6-9f2e-df967fc712f1');
INSERT INTO indiewise_db.AwardWin (id, award, createdAt, rewarded, rewardedAt, updatedAt, project) VALUES ('b37d847d-369e-11e6-8dcf-8bc10eacec46', '75322f6b-1cce-11e6-a2ae-ad4c5d3797ab', '2016-06-20 04:23:12', null, null, '2016-06-20 04:23:12', '1108b3f2-2cd5-11e6-9f2e-df967fc712f1');