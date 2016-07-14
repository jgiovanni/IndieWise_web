CREATE TABLE indiewise_db.Badge
(
    id char(36) PRIMARY KEY NOT NULL,
    createdAt datetime,
    updatedAt datetime,
    name varchar(255)
);
CREATE UNIQUE INDEX badge_id_unique ON indiewise_db.Badge (id);