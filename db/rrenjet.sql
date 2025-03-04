-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 04, 2025 at 07:06 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rrenjet`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(5, 'Lufte', '2025-03-04 18:23:25', '2025-03-04 18:23:25'),
(6, 'UÇK', '2025-03-04 18:23:42', '2025-03-04 18:23:42'),
(7, 'Letersi', '2025-03-04 18:23:53', '2025-03-04 18:23:53'),
(8, 'Autor', '2025-03-04 18:23:59', '2025-03-04 18:23:59');

-- --------------------------------------------------------

--
-- Table structure for table `Personalities`
--

CREATE TABLE `Personalities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `biography` text,
  `birth_date` datetime DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `short_description` text,
  `death_date` datetime DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Personalities`
--

INSERT INTO `Personalities` (`id`, `name`, `biography`, `birth_date`, `image_url`, `video_url`, `createdAt`, `updatedAt`, `short_description`, `death_date`, `profession`) VALUES
(6, 'Naim Frasheri', '<p>Naim Frashëri lindi më <strong>25 maj 1846</strong> në Frashër, një fshat i Përmetit. Ai ishte vëllai i Sami dhe Abdyl Frashërit, të cilët gjithashtu luajtën role të rëndësishme në lëvizjen kombëtare shqiptare. Në rininë e tij, Naimi mori arsim në gjuhën perse, turke, arabe dhe greke, duke u thelluar në letërsi dhe filozofi.</p><p></p><img src=\"https://albanianprofile.com/wp-content/uploads/2020/02/naimfrasheri.jpg\"><p></p><p>Gjatë jetës së tij, ai punoi si nëpunës shtetëror në administratën osmane, por dashuria për Shqipërinë dhe kulturën e saj e shtyu që të përkushtohej në çështjen kombëtare. Ai ishte një nga ideologët kryesorë të <strong>Rilindjes Kombëtare Shqiptare</strong>, duke shkruar dhe botuar vepra në shqip, në një kohë kur gjuha shqipe ishte e ndaluar nga Perandoria Osmane.</p><p>Një nga veprat e tij më të famshme është <strong>“Bagëti e Bujqësia”</strong>, një poezi epike ku shpreh dashurinë për natyrën shqiptare dhe jetën rurale. Një tjetër vepër e rëndësishme është <strong>“Historia e Skënderbeut”</strong>, e cila forcoi ndjenjën e krenarisë kombëtare tek shqiptarët. Ai shkroi gjithashtu për çështje filozofike dhe fetare, duke pasqyruar ndikimin e filozofisë sufi.</p><p>Naim Frashëri u përpoq gjithashtu të përhapte idenë e një <strong>arsimi kombëtar shqiptar</strong>, duke e parë edukimin si mjetin kryesor për çlirimin kombëtar. Ai ishte një nga mbështetësit kryesorë të <strong>Shoqërisë së Stambollit për Shtypjen e Librave Shqip</strong>, e cila botoi libra në gjuhën shqipe.</p><p>Naim Frashëri vdiq më <strong>20 tetor 1900</strong> në Stamboll, por vepra dhe idealet e tij mbetën të gjalla. Sot, ai konsiderohet një nga poetët më të mëdhenj të letërsisë shqipe dhe një simbol i Rilindjes Kombëtare. Për nder të tij, Shqipëria e ka shpallur <strong>Poet Kombëtar</strong>.</p>', '1846-05-25 00:00:00', '/uploads/1741112752928-naim frasheri.jpeg', NULL, '2025-03-04 18:25:52', '2025-03-04 18:25:52', 'Naim Frashëri (1846-1900) ishte një poet, shkrimtar dhe rilindas shqiptar, i cili luajti një rol kyç në lëvizjen kombëtare për pavarësi dhe zhvillimin e letërsisë shqipe. Ai ishte një nga figurat kryesore të Rilindjes Kombëtare dhe përdori poezinë e tij për të nxitur ndjenjën patriotike dhe ndërgjegjësimin kombëtar. Veprat e tij, si “Bagëti e Bujqësia” dhe “Historia e Skënderbeut”, mbetën të pavdekshme në letërsinë shqipe. Përmes shkrimeve të tij, ai kontribuoi në ruajtjen dhe forcimin e gjuhës shqipe. Vdiq më 20 tetor 1900 në Stamboll.', '1900-11-20 00:00:00', 'Autor'),
(7, 'Gjergj Kastrioti Skënderbeu', '<p>Gjergj Kastrioti Skënderbeu lindi më 1405 në Dibër, në familjen fisnike Kastrioti. Ai ishte biri i Gjon Kastriotit, një princ shqiptar që luftoi kundër zgjerimit osman. Në fëmijëri, Gjergji u mor peng nga Perandoria Osmane dhe u dërgua në oborrin e sulltanit, ku u konvertua në Islam dhe u emërua me titullin “Iskender” (nga Aleksandri i Madh) dhe “Bey” (prijës), prej nga vjen emri Skënderbeu.</p><p></p><img src=\"https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/279557522_109905795040799_4555020747908498489_n.jpg?_nc_cat=101&amp;ccb=1-7&amp;_nc_sid=6ee11a&amp;_nc_ohc=hjDDlDJxs7cQ7kNvgH4iqPT&amp;_nc_oc=AdjjY0UIeEf1cjUBVzeB34fgzh9u790UteyYTdSQUuq3BkJvVDX2DgTkVFOGAzEh6IY&amp;_nc_zt=23&amp;_nc_ht=scontent.fprn3-1.fna&amp;_nc_gid=AhQWYcANAJynNxPELJqdmiA&amp;oh=00_AYDAIbuzGZTC2PWJBkdH8YkLZd6TFUb4qRoybJ7hYObv9Q&amp;oe=67CD1520\"><p></p><p>Brenda ushtrisë osmane, Skënderbeu u bë një nga komandantët më të aftë, duke fituar besimin e sulltanit. Megjithatë, ai ruajti lidhjet me origjinën e tij dhe në vitin 1443, gjatë një beteje në Nish, u shkëput nga osmanët dhe u kthye në Shqipëri. Ai mori në kontroll Krujën dhe ngriti flamurin e Kastriotëve, duke shpallur pavarësinë nga osmanët.</p><p>Për të mbrojtur Shqipërinë, Skënderbeu bashkoi princërit shqiptarë në Kuvendin e Lezhës më 1444, duke krijuar një aleancë të fuqishme kundër Perandorisë Osmane. Për 25 vjet, ai organizoi mbrojtjen e Shqipërisë kundër disa fushatave osmane, duke i shkaktuar humbje të mëdha ushtrisë së sulltanëve Murati II dhe Mehmeti II.</p><p>Ndihma nga Europa Perëndimore ishte e kufizuar, por Skënderbeu gjeti mbështetje nga Papa dhe mbretëria e Napolit. Pavarësisht kësaj, pas vdekjes së tij më 17 janar 1468, rezistenca shqiptare filloi të dobësohej, dhe në fund të shekullit XV, Shqipëria ra nën sundimin osman për disa shekuj.</p><p>Skënderbeu mbetet një figurë qendrore në historinë dhe identitetin kombëtar shqiptar. Ai simbolizon qëndresën dhe luftën për liri, duke u bërë frymëzim për breza të tërë.</p>', '1405-05-06 00:00:00', '/uploads/1741112926662-skenderbeu.jpg', NULL, '2025-03-04 18:28:46', '2025-03-04 18:28:46', 'Gjergj Kastrioti Skënderbeu (1405-1468) ishte një nga figurat më të rëndësishme të historisë shqiptare, i njohur për rezistencën e tij kundër Perandorisë Osmane. I marrë peng nga osmanët në moshë të re, ai u bë një nga gjeneralët e tyre më të suksesshëm, por më vonë u kthye në Shqipëri dhe ngriti kryengritjen kundër pushtuesve. Për 25 vjet, ai mbrojti lirinë e shqiptarëve, duke bashkuar principatat shqiptare dhe duke u bërë simbol i qëndresës. Vdekja e tij më 1468 shënoi një kthesë për Shqipërinë, e cila ra nën sundimin osman.', '1468-01-17 00:00:00', 'Gjeneral'),
(9, 'Adem Jashari', '<p>Adem Jashari lindi më <strong>28 nëntor 1955</strong> në fshatin Prekaz të Drenicës, Kosovë. Që në rini, ai u përfshi në aktivitetet patriotike për lirinë e Kosovës nga regjimi serb. Në vitet ’90, ai dhe shokët e tij formuan bërthamën e parë të Ushtrisë Çlirimtare të Kosovës (UÇK), duke filluar rezistencën e armatosur kundër forcave serbe.</p><p></p><img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWkQeXxLE_FAVfdyD5_xxoxyQ17mqeSLnVQ&amp;s\"><p></p><p>Në vitin 1991, Adem Jashari udhëtoi në Shqipëri për të marrë trajnim ushtarak dhe për të siguruar armatim për luftën e ardhshme. Ai udhëhoqi disa sulme kundër policisë dhe ushtrisë serbe, duke u bërë një nga figurat kryesore të UÇK-së. Prekazi u kthye në një bazë të rezistencës shqiptare, duke u sulmuar vazhdimisht nga forcat serbe.</p><p>Sulmi më i madh ndodhi më <strong>5-7 mars 1998</strong>, kur mijëra forca serbe rrethuan shtëpinë e tij në Prekaz. Për tri ditë, Adem Jashari dhe familja e tij luftuan kundër një ushtrie të madhe, duke refuzuar të dorëzohen. Më <strong>7 mars 1998</strong>, Adem Jashari u vra bashkë me 58 anëtarë të familjes, përfshirë gra dhe fëmijë. Ky akt i tmerrshëm e bëri atë një figurë legjendare dhe forcoi vendosmërinë e popullit shqiptar për liri.</p><p>Sakrifica e tij shënoi një kthesë të madhe në luftën për çlirimin e Kosovës. Pas vdekjes së tij, UÇK-ja mori mbështetje të gjerë ndërkombëtare, duke çuar në ndërhyrjen e NATO-s më 1999 dhe çlirimin e Kosovës nga Serbia.</p><p></p><img src=\"https://media.pamfleti.net/pamfleti.net/media3/-900-0-1709635919xjashari-693.jpg\"><p></p><p>Adem Jashari është nderuar si “<strong>Komandanti Legjendar</strong>” i UÇK-së, ndërsa Prekazi është kthyer në një vend pelegrinazhi për shqiptarët. Ai mbetet një simbol i sakrificës dhe luftës për liri, duke u kujtuar me nder dhe respekt nga brezat e ardhshëm.</p>', '1955-11-28 00:00:00', '/uploads/1741113124533-adem.jpg', NULL, '2025-03-04 18:32:04', '2025-03-04 18:32:04', 'Adem Jashari (1955-1998) ishte një nga figurat kryesore të luftës për lirinë dhe pavarësinë e Kosovës. Ai ishte komandant dhe themelues i Ushtrisë Çlirimtare të Kosovës (UÇK), duke udhëhequr luftën kundër forcave serbe për çlirimin e Kosovës. Në mars të vitit 1998, ai dhe familja e tij u rrethuan nga forcat serbe në Prekaz dhe pas një beteje heroike, ai u vra së bashku me 58 anëtarë të familjes. Adem Jashari mbetet një simbol i sakrificës dhe qëndresës për lirinë e Kosovës, duke u nderuar si “Komandanti Legjendar” i UÇK-së.', '1998-03-07 00:00:00', 'Komandat');

-- --------------------------------------------------------

--
-- Table structure for table `personality_category`
--

CREATE TABLE `personality_category` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PersonalityId` int(11) NOT NULL,
  `CategoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `personality_category`
--

INSERT INTO `personality_category` (`createdAt`, `updatedAt`, `PersonalityId`, `CategoryId`) VALUES
('2025-03-04 18:25:52', '2025-03-04 18:25:52', 6, 7),
('2025-03-04 18:25:52', '2025-03-04 18:25:52', 6, 8),
('2025-03-04 18:28:46', '2025-03-04 18:28:46', 7, 5),
('2025-03-04 18:32:04', '2025-03-04 18:32:04', 9, 5),
('2025-03-04 18:32:04', '2025-03-04 18:32:04', 9, 6);

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250303185006-add_short_description_and_death_date_to_personality.js'),
('20250303224527-add-profession-to-personalities.js');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(3, 'admin', 'admin@rrenjet.com', '$2b$10$rZ8ORkj37jnirTRj7Boka.JRg7nDcymXlPGxEymzY/YxERoQQacrO', 'admin', '2025-03-04 18:19:06', '2025-03-04 18:19:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Personalities`
--
ALTER TABLE `Personalities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personality_category`
--
ALTER TABLE `personality_category`
  ADD PRIMARY KEY (`PersonalityId`,`CategoryId`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Personalities`
--
ALTER TABLE `Personalities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `personality_category`
--
ALTER TABLE `personality_category`
  ADD CONSTRAINT `personality_category_ibfk_1` FOREIGN KEY (`PersonalityId`) REFERENCES `Personalities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personality_category_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
