--
-- PostgreSQL database dump
-- Database: tomez
-- Created: 2025-10-23
--

-- Disable triggers for faster data loading
SET session_replication_role = replica;

-- Table: tag
DROP TABLE IF EXISTS tag;
CREATE TABLE tag (
    label VARCHAR(191) NOT NULL PRIMARY KEY
);


-- Table: manga
DROP TABLE IF EXISTS manga;
CREATE TABLE manga (
    name VARCHAR(191) NOT NULL PRIMARY KEY,
    description TEXT NOT NULL
);

-- Table: tome
DROP TABLE IF EXISTS tome;
CREATE TABLE tome (
    mangaName VARCHAR(191) NOT NULL,
    numero INT NOT NULL,
    nbrPages INT NOT NULL,
    PRIMARY KEY (mangaName, numero),
    CONSTRAINT Tome_mangaName_fkey FOREIGN KEY (mangaName) REFERENCES manga(name) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: mangatag
DROP TABLE IF EXISTS mangatag;
CREATE TABLE mangatag (
    mangaName VARCHAR(191) NOT NULL,
    tagLabel VARCHAR(191) NOT NULL,
    PRIMARY KEY (mangaName, tagLabel),
    CONSTRAINT MangaTag_mangaName_fkey FOREIGN KEY (mangaName) REFERENCES manga(name) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT MangaTag_tagLabel_fkey FOREIGN KEY (tagLabel) REFERENCES tag(label) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: selection
DROP TABLE IF EXISTS selection;
CREATE TABLE selection (
    name VARCHAR(191) NOT NULL,
    mangaName VARCHAR(191) NOT NULL,
    PRIMARY KEY (name,mangaName),
    CONSTRAINT Selection_mangaName_fkey FOREIGN KEY (mangaName) REFERENCES manga(name) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Re-enable triggers
SET session_replication_role = DEFAULT;
