-- Insert data into tag
INSERT INTO tag (label) VALUES
('Action'),('Aliens'),('Arts Martiaux'),('Aventure'),('Comédie'),('Culinaire'),('Cyberpunk'),('Drame'),('Ecchi'),('Fantasy'),
('Gore'),('Harem'),('Hentai'),('Historique'),('Horreur'),('Idols'),('Isekai'),('Jeux'),('Josei'),('Magie'),('Mecha'),
('Militaire'),('Musical'),('Mystère'),('Parodie'),('Policier'),('Post-apocalyptique'),('Psychologique'),('Romance'),
('Samouraï'),('School Life'),('Science-fiction'),('Seinen'),('Shojo'),('Shojo Ai'),('Shonen'),('Shonen Ai'),
('Slice of Life'),('Sports'),('Steampunk'),('Supernaturel'),('Thriller'),('Tragédie'),('Vampires'),('Voyage Temporel'),('Yaoi'),('Yuri')  ON CONFLICT (label) DO NOTHING;
