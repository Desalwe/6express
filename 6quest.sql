USE 6quest_db;

DROP TABLE Motorcycles;

CREATE TABLE Motorcycles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80),
  production_date DATE,
  want_it BOOLEAN,
  weight_kg INT
);


INSERT INTO `Motorcycles` (name, production_date, want_it, weight_kg) VALUES 
('Honda Super Cub','1958-01-01', false, 90),
('Triumph Bonneville','1959-02-02', true, 205),
('Kawasaki Triple','1968-03-03', false, 184),
('Royal Enfield Bullet','1931-04-04', true, 186),
('Honda Gold Wing','1974-05-05', true, 364),
('BMW R1200GS','1980-01-01', true, 238);