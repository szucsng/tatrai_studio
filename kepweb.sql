-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 02. 07:53
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kepweb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `event`
--

CREATE TABLE `event` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `event`
--

INSERT INTO `event` (`id`, `name`, `description`, `date`, `createdAt`, `updatedAt`) VALUES
('cmm8b8wo100008ypzaulckqbl', 'Ferenczi - Kandó Bál 2026', NULL, '2026-02-27 00:00:00.000', '2026-03-01 22:17:22.273', '2026-03-01 22:45:11.841');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `image`
--

CREATE TABLE `image` (
  `id` varchar(191) NOT NULL,
  `filename` varchar(191) NOT NULL,
  `path` varchar(191) NOT NULL,
  `eventId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `image`
--

INSERT INTO `image` (`id`, `filename`, `path`, `eventId`, `createdAt`, `updatedAt`) VALUES
('cmm8b8wxe00028ypztpwt1wik', '_MG_3678.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3678.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.610', '2026-03-01 22:17:22.610'),
('cmm8b8wxf00048ypz192rq00p', '_MG_3680.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3680.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.611', '2026-03-01 22:17:22.611'),
('cmm8b8wxg00068ypzpeizz28q', '_MG_3678-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3678-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.610', '2026-03-01 22:17:22.610'),
('cmm8b8wxg00088ypz97ia9nd6', '_MG_3714.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3714.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.612', '2026-03-01 22:17:22.612'),
('cmm8b8wxi000a8ypzyrnlicjw', '_MG_3751.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3751.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.614', '2026-03-01 22:17:22.614'),
('cmm8b8wxn000c8ypzywnievwe', '_MG_3891.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3891.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.619', '2026-03-01 22:17:22.619'),
('cmm8b8wxo000e8ypzec6p8mkp', '_MG_3849.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442527-_MG_3849.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.616', '2026-03-01 22:17:22.616'),
('cmm8b8wxo000g8ypzsrkkvebv', '_MG_3866.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3866.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.617', '2026-03-01 22:17:22.617'),
('cmm8b8wxo000i8ypzkgdoif4i', '_MG_3854.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442527-_MG_3854.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.617', '2026-03-01 22:17:22.617'),
('cmm8b8wxo000k8ypz6s6w33vr', '_MG_3872.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3872.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.618', '2026-03-01 22:17:22.618'),
('cmm8b8wxp000m8ypzvynpnog5', '_MG_3881.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3881.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.618', '2026-03-01 22:17:22.618'),
('cmm8b8wxt000o8ypz40xcafrr', '_MG_4041.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4041.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.625', '2026-03-01 22:17:22.625'),
('cmm8b8wxu000q8ypz61subn5m', '_MG_4073.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4073.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.626', '2026-03-01 22:17:22.626'),
('cmm8b8wxu000s8ypzjr84aks7', '_MG_4082.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4082.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.627', '2026-03-01 22:17:22.627'),
('cmm8b8wxw000u8ypzef3ta7fs', '_MG_4164.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4164.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.628', '2026-03-01 22:17:22.628'),
('cmm8b8wxw000w8ypzvrozic6r', '_MG_4169.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4169.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.629', '2026-03-01 22:17:22.629'),
('cmm8b8wxw000y8ypzi6iyiw7p', '_MG_4172-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4172-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.629', '2026-03-01 22:17:22.629'),
('cmm8b8wxx00108ypz0x49js5w', '_MG_4185.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4185.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.629', '2026-03-01 22:17:22.629'),
('cmm8b8wxx00128ypzgshempnd', '_MG_4246.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4246.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.630', '2026-03-01 22:17:22.630'),
('cmm8b8wxy00148ypztin3594s', '_MG_4241.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4241.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.630', '2026-03-01 22:17:22.630'),
('cmm8b8wxy00168ypzcmulmyvw', '_MG_4271.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4271.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.630', '2026-03-01 22:17:22.630'),
('cmm8b8wxy00188ypzmoczvtm1', '_MG_4266.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4266.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.631', '2026-03-01 22:17:22.631'),
('cmm8b8wxy001a8ypzj2b4viey', '_MG_4278.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4278.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.631', '2026-03-01 22:17:22.631'),
('cmm8b8wxz001c8ypz66tjfons', '_MG_4302.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442534-_MG_4302.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.631', '2026-03-01 22:17:22.631'),
('cmm8b8wxz001e8ypzikwvlhrp', '_MG_4307.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442534-_MG_4307.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.632', '2026-03-01 22:17:22.632'),
('cmm8b8wy0001g8ypzabnoo9vt', '_MG_4320.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442534-_MG_4320.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.632', '2026-03-01 22:17:22.632'),
('cmm8b8wy0001i8ypzdbv6egaa', '_MG_4326.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4326.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.632', '2026-03-01 22:17:22.632'),
('cmm8b8wy0001k8ypzp55v594f', '_MG_4352.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4352.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.633', '2026-03-01 22:17:22.633'),
('cmm8b8wy1001m8ypzumarcbx3', '_MG_4356.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4356.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.633', '2026-03-01 22:17:22.633'),
('cmm8b8wy1001o8ypzic9wzq6e', '_MG_4406.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4406.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.634', '2026-03-01 22:17:22.634'),
('cmm8b8wy1001q8ypzvibkp7zz', '_MG_4399.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4399.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.634', '2026-03-01 22:17:22.634'),
('cmm8b8wy2001s8ypz7eet73rs', '_MG_4408.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4408.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.634', '2026-03-01 22:17:22.634'),
('cmm8b8wy2001u8ypzd0aa5e3d', '_MG_4401.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4401.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.634', '2026-03-01 22:17:22.634'),
('cmm8b8wy2001w8ypztfr9gyj7', '_MG_4454.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4454.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.635', '2026-03-01 22:17:22.635'),
('cmm8b8wy3001y8ypz6xfsqw92', '_MG_4520.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4520.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.636', '2026-03-01 22:17:22.636'),
('cmm8b8wy500208ypz4c9xpm16', '_MG_4617.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4617.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.637', '2026-03-01 22:17:22.637'),
('cmm8b8wy600228ypzmr2uqi8h', '_MG_4629.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4629.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.638', '2026-03-01 22:17:22.638'),
('cmm8b8wy800248ypzvcl838vv', '_MG_4738.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4738.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.640', '2026-03-01 22:17:22.640'),
('cmm8b8wy900268ypzjdt83v3d', '_MG_4829.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4829.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.642', '2026-03-01 22:17:22.642'),
('cmm8b8wyg00288ypzk6xyu2dj', '_MG_5351.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5351.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.648', '2026-03-01 22:17:22.648'),
('cmm8b8wyh002a8ypzo0807d5h', '_MG_3650.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442524-_MG_3650.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.650', '2026-03-01 22:17:22.650'),
('cmm8b8wyi002c8ypzw2j9zuex', '_MG_3668.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442524-_MG_3668.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.650', '2026-03-01 22:17:22.650'),
('cmm8b8wyi002e8ypz9nkzgq3i', '_MG_3675-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3675-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.651', '2026-03-01 22:17:22.651'),
('cmm8b8wyj002g8ypzf24l8sen', '_MG_3675.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3675.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.651', '2026-03-01 22:17:22.651'),
('cmm8b8wyj002i8ypzeu60xlj4', '_MG_5523-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5523-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.651', '2026-03-01 22:17:22.651'),
('cmm8b8wyj002k8ypz2f3f4l4f', '_MG_3690.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3690.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.652', '2026-03-01 22:17:22.652'),
('cmm8b8wyk002m8ypzogzmjtgb', '_MG_3710.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3710.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.652', '2026-03-01 22:17:22.652'),
('cmm8b8wyk002o8ypzgxbw4zl2', '_MG_3719.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3719.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.652', '2026-03-01 22:17:22.652'),
('cmm8b8wyk002q8ypzi5r17rzt', '_MG_3710-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442525-_MG_3710-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.653', '2026-03-01 22:17:22.653'),
('cmm8b8wyk002s8ypz3ytpiaqm', '_MG_3802.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3802.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.653', '2026-03-01 22:17:22.653'),
('cmm8b8wyk002u8ypzb74z4b31', '_MG_3724.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3724.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.653', '2026-03-01 22:17:22.653'),
('cmm8b8wyl002w8ypzxowns0d6', '_MG_3833.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3833.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.653', '2026-03-01 22:17:22.653'),
('cmm8b8wyl002y8ypzt1qo37bh', '_MG_3723.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3723.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.653', '2026-03-01 22:17:22.653'),
('cmm8b8wyl00308ypz2cs0nz3t', '_MG_3837.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3837.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.654', '2026-03-01 22:17:22.654'),
('cmm8b8wym00328ypzakdr1ct0', '_MG_3841.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442527-_MG_3841.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.655', '2026-03-01 22:17:22.655'),
('cmm8b8wyn00348ypz4imqyj9b', '_MG_3903.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3903.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.655', '2026-03-01 22:17:22.655'),
('cmm8b8wyo00368ypzot4diz8g', '_MG_3991.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_3991.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.656', '2026-03-01 22:17:22.656'),
('cmm8b8wyo00388ypzo77pkvuu', '_MG_4016.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_4016.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.657', '2026-03-01 22:17:22.657'),
('cmm8b8wyp003a8ypz6nfrdg6y', '_MG_4021.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_4021.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.657', '2026-03-01 22:17:22.657'),
('cmm8b8wyp003c8ypzjiih9ohl', '_MG_4027.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4027.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.657', '2026-03-01 22:17:22.657'),
('cmm8b8wyp003e8ypz4te3ksl5', '_MG_4023.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4023.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.657', '2026-03-01 22:17:22.657'),
('cmm8b8wyp003g8ypz8ov0dfal', '_MG_4032.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4032.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.658', '2026-03-01 22:17:22.658'),
('cmm8b8wyq003i8ypz9ggwl9oa', '_MG_4041-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4041-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.658', '2026-03-01 22:17:22.658'),
('cmm8b8wyq003k8ypzjqvubbjw', '_MG_4060.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4060.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.658', '2026-03-01 22:17:22.658'),
('cmm8b8wyq003m8ypzuy7mmg8c', '_MG_4059.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4059.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.659', '2026-03-01 22:17:22.659'),
('cmm8b8wyq003o8ypzsh7erz94', '_MG_4056.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4056.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.659', '2026-03-01 22:17:22.659'),
('cmm8b8wyr003q8ypz0nd64zie', '_MG_4060-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4060-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.659', '2026-03-01 22:17:22.659'),
('cmm8b8wyr003s8ypzt98od7my', '_MG_4071.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4071.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.659', '2026-03-01 22:17:22.659'),
('cmm8b8wyr003u8ypzg2d2eo40', '_MG_4068.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4068.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.660', '2026-03-01 22:17:22.660'),
('cmm8b8wyr003w8ypzsat972fg', '_MG_4084.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4084.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.660', '2026-03-01 22:17:22.660'),
('cmm8b8wys003y8ypzg73payfw', '_MG_4085.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4085.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.660', '2026-03-01 22:17:22.660'),
('cmm8b8wys00408ypzqvc2fj98', '_MG_4085-3.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4085-3.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.660', '2026-03-01 22:17:22.660'),
('cmm8b8wys00428ypzijgqm81j', '_MG_4088.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4088.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.661', '2026-03-01 22:17:22.661'),
('cmm8b8wyt00448ypzvz8mxz27', '_MG_4088-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4088-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.661', '2026-03-01 22:17:22.661'),
('cmm8b8wyt00468ypzw4to909k', '_MG_4099-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4099-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.661', '2026-03-01 22:17:22.661'),
('cmm8b8wyu00488ypzqwyg7aij', '_MG_4146.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4146.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.662', '2026-03-01 22:17:22.662'),
('cmm8b8wyu004a8ypzk6yishrj', '_MG_4189.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4189.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.663', '2026-03-01 22:17:22.663'),
('cmm8b8wyu004c8ypzr67cd4lu', '_MG_4202.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4202.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.663', '2026-03-01 22:17:22.663'),
('cmm8b8wyv004e8ypz50dz043p', '_MG_4231-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4231-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.663', '2026-03-01 22:17:22.663'),
('cmm8b8wyv004g8ypzzvt6uznm', '_MG_4231.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4231.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.663', '2026-03-01 22:17:22.663'),
('cmm8b8wyv004i8ypzoxzw4v1g', '_MG_4251.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4251.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.664', '2026-03-01 22:17:22.664'),
('cmm8b8wyv004k8ypzefedq0s9', '_MG_4298.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442534-_MG_4298.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.664', '2026-03-01 22:17:22.664'),
('cmm8b8wyw004m8ypz2tmpgdle', '_MG_4298-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442534-_MG_4298-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.664', '2026-03-01 22:17:22.664'),
('cmm8b8wyw004o8ypz9kn9ytae', '_MG_4311.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442534-_MG_4311.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.664', '2026-03-01 22:17:22.664'),
('cmm8b8wyw004q8ypzqigu8qbs', '_MG_4325.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4325.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.665', '2026-03-01 22:17:22.665'),
('cmm8b8wyw004s8ypziyfc0rys', '_MG_4341.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4341.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.665', '2026-03-01 22:17:22.665'),
('cmm8b8wyx004u8ypzbvy9u7hq', '_MG_4347.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4347.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.665', '2026-03-01 22:17:22.665'),
('cmm8b8wyx004w8ypzi2y8khme', '_MG_4392.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4392.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.665', '2026-03-01 22:17:22.665'),
('cmm8b8wyx004y8ypzgu4gbgmv', '_MG_4380.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442535-_MG_4380.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.666', '2026-03-01 22:17:22.666'),
('cmm8b8wyx00508ypzp76cvebw', '_MG_4420.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4420.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.666', '2026-03-01 22:17:22.666'),
('cmm8b8wyy00528ypzaupkbgna', '_MG_4432.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4432.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.666', '2026-03-01 22:17:22.666'),
('cmm8b8wyy00548ypzmb2hrun2', '_MG_4433.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4433.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.666', '2026-03-01 22:17:22.666'),
('cmm8b8wyy00568ypzgaux0ozc', '_MG_4439.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4439.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.667', '2026-03-01 22:17:22.667'),
('cmm8b8wyy00588ypzq9cmcdcd', '_MG_4432-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4432-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.667', '2026-03-01 22:17:22.667'),
('cmm8b8wyz005a8ypzzrmy6o00', '_MG_4472.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4472.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.667', '2026-03-01 22:17:22.667'),
('cmm8b8wyz005c8ypzsmgj12dc', '_MG_4492.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4492.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.667', '2026-03-01 22:17:22.667'),
('cmm8b8wyz005e8ypzfa348sc4', '_MG_4487.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4487.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.668', '2026-03-01 22:17:22.668'),
('cmm8b8wz0005g8ypztz9o8ufd', '_MG_4537.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4537.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.668', '2026-03-01 22:17:22.668'),
('cmm8b8x05005i8ypzmlss6gmi', '_MG_4546.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4546.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.709', '2026-03-01 22:17:22.709'),
('cmm8b8x05005k8ypzzn7xpqwr', '_MG_4572.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4572.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.710', '2026-03-01 22:17:22.710'),
('cmm8b8x05005m8ypz5hm3ak78', '_MG_4601.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4601.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.710', '2026-03-01 22:17:22.710'),
('cmm8b8x06005o8ypzsz0aocq0', '_MG_4621.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4621.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.710', '2026-03-01 22:17:22.710'),
('cmm8b8x06005q8ypzdoyuju71', '_MG_4635.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4635.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.710', '2026-03-01 22:17:22.710'),
('cmm8b8x06005s8ypzyvgle03v', '_MG_4635-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4635-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.711', '2026-03-01 22:17:22.711'),
('cmm8b8x06005u8ypz5or23nf6', '_MG_4643.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4643.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.711', '2026-03-01 22:17:22.711'),
('cmm8b8x07005w8ypz0hap3af0', '_MG_4638.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4638.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.711', '2026-03-01 22:17:22.711'),
('cmm8b8x07005y8ypz9aww87l8', '_MG_4653.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4653.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.711', '2026-03-01 22:17:22.711'),
('cmm8b8x0700608ypzafrd2sng', '_MG_4662.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4662.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.711', '2026-03-01 22:17:22.711'),
('cmm8b8x0700628ypzzqfd9u0s', '_MG_4691.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4691.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.712', '2026-03-01 22:17:22.712'),
('cmm8b8x0800648ypzt7mpmteo', '_MG_4713.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4713.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.712', '2026-03-01 22:17:22.712'),
('cmm8b8x0800668ypzi5cnoqbx', '_MG_4716.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4716.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.712', '2026-03-01 22:17:22.712'),
('cmm8b8x0800688ypzsofgp1di', '_MG_4747.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4747.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.713', '2026-03-01 22:17:22.713'),
('cmm8b8x08006a8ypz85lo3i1m', '_MG_4777.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4777.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.713', '2026-03-01 22:17:22.713'),
('cmm8b8x09006c8ypz9eoookfn', '_MG_4778.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4778.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.713', '2026-03-01 22:17:22.713'),
('cmm8b8x09006e8ypzjtj313ie', '_MG_4784.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4784.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.713', '2026-03-01 22:17:22.713'),
('cmm8b8x09006g8ypzalhlmxa2', '_MG_4781.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4781.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.714', '2026-03-01 22:17:22.714'),
('cmm8b8x09006i8ypzhj4cvhuf', '_MG_4806.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4806.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.714', '2026-03-01 22:17:22.714'),
('cmm8b8x0a006k8ypzw73z3acc', '_MG_4902.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4902.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.715', '2026-03-01 22:17:22.715'),
('cmm8b8x0b006m8ypz5mrlltbk', '_MG_4928.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4928.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.715', '2026-03-01 22:17:22.715'),
('cmm8b8x0c006o8ypzkn1gg5pl', '_MG_4943.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4943.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.716', '2026-03-01 22:17:22.716'),
('cmm8b8x0c006q8ypzl70zrznb', '_MG_4958.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4958.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.716', '2026-03-01 22:17:22.716'),
('cmm8b8x0d006s8ypzrixpryfw', '_MG_5081.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5081.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.717', '2026-03-01 22:17:22.717'),
('cmm8b8x0d006u8ypza7u2pzdq', '_MG_5034.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5034.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.717', '2026-03-01 22:17:22.717'),
('cmm8b8x0d006w8ypz5nfhof0s', '_MG_5084.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5084.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.717', '2026-03-01 22:17:22.717'),
('cmm8b8x0e006y8ypztbpf55il', '_MG_5231.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5231.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.718', '2026-03-01 22:17:22.718'),
('cmm8b8x0e00708ypzsyyy90tp', '_MG_5225.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5225.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.718', '2026-03-01 22:17:22.718'),
('cmm8b8x0g00728ypzao2kz6bb', '_MG_3837-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3837-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.720', '2026-03-01 22:17:22.720'),
('cmm8b8x0h00748ypz11byl1os', '_MG_3876.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3876.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.721', '2026-03-01 22:17:22.721'),
('cmm8b8x0i00768ypz6d3b8vgu', '_MG_4172.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4172.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.723', '2026-03-01 22:17:22.723'),
('cmm8b8x0j00788ypztboodhdc', '_MG_4221.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4221.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.723', '2026-03-01 22:17:22.723'),
('cmm8b8x0j007a8ypzvljfhr5q', '_MG_4444.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442536-_MG_4444.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.724', '2026-03-01 22:17:22.724'),
('cmm8b8x0j007c8ypzch0ed6fm', '_MG_4529.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4529.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.724', '2026-03-01 22:17:22.724'),
('cmm8b8x0m007e8ypztx8ntrhd', '_MG_4608.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442538-_MG_4608.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.726', '2026-03-01 22:17:22.726'),
('cmm8b8x0m007g8ypz1276wpq7', '_MG_4678.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4678.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.726', '2026-03-01 22:17:22.726'),
('cmm8b8x0m007i8ypzqnbjai4j', '_MG_4700.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4700.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.727', '2026-03-01 22:17:22.727'),
('cmm8b8x0m007k8ypzzc154ogc', '_MG_4701.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442539-_MG_4701.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.727', '2026-03-01 22:17:22.727'),
('cmm8b8x0n007m8ypzq8fflyh9', '_MG_4860.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4860.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.728', '2026-03-01 22:17:22.728'),
('cmm8b8x0n007o8ypzr6r57ga1', '_MG_4872.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4872.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.728', '2026-03-01 22:17:22.728'),
('cmm8b8x0o007q8ypzpa57dtdr', '_MG_4920.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4920.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.728', '2026-03-01 22:17:22.728'),
('cmm8b8x0o007s8ypzztqvzds9', '_MG_4952.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4952.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.729', '2026-03-01 22:17:22.729'),
('cmm8b8x0p007u8ypzxlybaqlq', '_MG_4946.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4946.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.729', '2026-03-01 22:17:22.729'),
('cmm8b8x0p007w8ypzquooq4pr', '_MG_4967.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4967.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.729', '2026-03-01 22:17:22.729'),
('cmm8b8x0p007y8ypzjo4qlms4', '_MG_4978.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4978.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.729', '2026-03-01 22:17:22.729'),
('cmm8b8x0q00808ypzasyr7n63', '_MG_5010.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5010.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.730', '2026-03-01 22:17:22.730'),
('cmm8b8x0q00828ypzz8va6pgj', '_MG_5061.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5061.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.730', '2026-03-01 22:17:22.730'),
('cmm8b8x0r00848ypz66owp2nc', '_MG_5363.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5363.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.731', '2026-03-01 22:17:22.731'),
('cmm8b8x0r00868ypzpp4u3utt', '_MG_5463.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5463.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.732', '2026-03-01 22:17:22.732'),
('cmm8b8x0s00888ypzifwm8m9y', '_MG_5533.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5533.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.732', '2026-03-01 22:17:22.732'),
('cmm8b8x0s008a8ypz8f4ae0lm', '_MG_4979.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4979.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.732', '2026-03-01 22:17:22.732'),
('cmm8b8x0s008c8ypzitrsfaho', '_MG_5538.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5538.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.733', '2026-03-01 22:17:22.733'),
('cmm8b8x0s008e8ypznail41un', '_MG_5540.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5540.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.733', '2026-03-01 22:17:22.733'),
('cmm8b8x0t008g8ypzvq3rp45h', '_MG_5545.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5545.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.733', '2026-03-01 22:17:22.733'),
('cmm8b8x0t008i8ypz6zx5xsam', '_MG_5551.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442546-_MG_5551.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.733', '2026-03-01 22:17:22.733'),
('cmm8b8x0u008k8ypz1lc9zzlw', '_MG_3840.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442527-_MG_3840.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.734', '2026-03-01 22:17:22.734'),
('cmm8b8x0u008m8ypz4443oz5i', '_MG_3842.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442527-_MG_3842.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.734', '2026-03-01 22:17:22.734'),
('cmm8b8x0u008o8ypzbr70963k', '_MG_3861.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3861.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.734', '2026-03-01 22:17:22.734'),
('cmm8b8x0u008q8ypz4v82cyhx', '_MG_3851.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442527-_MG_3851.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.735', '2026-03-01 22:17:22.735'),
('cmm8b8x0v008s8ypzvbeaqj4o', '_MG_3873.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3873.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.735', '2026-03-01 22:17:22.735'),
('cmm8b8x0v008u8ypzkg8udwil', '_MG_3882.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3882.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.735', '2026-03-01 22:17:22.735'),
('cmm8b8x0v008w8ypz6evcfejv', '_MG_3925.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_3925.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.735', '2026-03-01 22:17:22.735'),
('cmm8b8x0v008y8ypzoqoh3552', '_MG_3929.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_3929.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.736', '2026-03-01 22:17:22.736'),
('cmm8b8x0v00908ypz5syu62z6', '_MG_3956.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_3956.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.736', '2026-03-01 22:17:22.736'),
('cmm8b8x0v00928ypznle5bp35', '_MG_3915.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3915.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.736', '2026-03-01 22:17:22.736'),
('cmm8b8x0w00948ypzitjfd7v6', '_MG_3952.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_3952.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.736', '2026-03-01 22:17:22.736'),
('cmm8b8x0w00968ypzvi0drked', '_MG_3969.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_3969.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.736', '2026-03-01 22:17:22.736'),
('cmm8b8x0w00988ypzcj5xayxb', '_MG_4012.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442529-_MG_4012.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.737', '2026-03-01 22:17:22.737'),
('cmm8b8x0x009a8ypzqjh6qebn', '_MG_4085-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4085-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.737', '2026-03-01 22:17:22.737'),
('cmm8b8x0x009c8ypz76pjskbg', '_MG_4099.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4099.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.737', '2026-03-01 22:17:22.737'),
('cmm8b8x0x009e8ypztn01jlsz', '_MG_4138.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4138.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.737', '2026-03-01 22:17:22.737'),
('cmm8b8x0x009g8ypzwur4ux2g', '_MG_4110.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442531-_MG_4110.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.738', '2026-03-01 22:17:22.738'),
('cmm8b8x0x009i8ypzerf0v05l', '_MG_4144.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4144.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.738', '2026-03-01 22:17:22.738'),
('cmm8b8x0y009k8ypz69k8xe97', '_MG_4156.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442532-_MG_4156.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.738', '2026-03-01 22:17:22.738'),
('cmm8b8x0y009m8ypz3pmmafdd', '_MG_4294.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442533-_MG_4294.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.738', '2026-03-01 22:17:22.738'),
('cmm8b8x0y009o8ypzlpqvde58', '_MG_4301.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442534-_MG_4301.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.739', '2026-03-01 22:17:22.739'),
('cmm8b8x1v009q8ypzkq1qq0fc', '_MG_4556.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4556.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.771', '2026-03-01 22:17:22.771'),
('cmm8b8x1v009s8ypzh1li37k4', '_MG_4791.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4791.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.771', '2026-03-01 22:17:22.771'),
('cmm8b8x1v009u8ypz7e83hdf7', '_MG_4825.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4825.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.772', '2026-03-01 22:17:22.772'),
('cmm8b8x1w009w8ypzg7nvhfk7', '_MG_4856.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4856.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.773', '2026-03-01 22:17:22.773'),
('cmm8b8x1w009y8ypz9nxzni94', '_MG_4874.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4874.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.773', '2026-03-01 22:17:22.773'),
('cmm8b8x1x00a08ypzqelu2vy1', '_MG_4896.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4896.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.774', '2026-03-01 22:17:22.774'),
('cmm8b8x1x00a28ypzzctggn8p', '_MG_4970.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4970.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.774', '2026-03-01 22:17:22.774'),
('cmm8b8x1y00a48ypzr0cc46s9', '_MG_5343.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5343.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.775', '2026-03-01 22:17:22.775'),
('cmm8b8x1z00a68ypz3vziumy5', '_MG_3817.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3817.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.775', '2026-03-01 22:17:22.775'),
('cmm8b8x1z00a88ypzp2e52nl2', '_MG_3824.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3824.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.775', '2026-03-01 22:17:22.775'),
('cmm8b8x1z00aa8ypz4lrjszv2', '_MG_3833-2.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442526-_MG_3833-2.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.775', '2026-03-01 22:17:22.775'),
('cmm8b8x1z00ac8ypzji9mc1us', '_MG_3848.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442527-_MG_3848.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.776', '2026-03-01 22:17:22.776'),
('cmm8b8x2000ae8ypznmk3j7jj', '_MG_3856.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442528-_MG_3856.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.776', '2026-03-01 22:17:22.776'),
('cmm8b8x2000ag8ypz9gmkma3v', '_MG_4055.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442530-_MG_4055.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.777', '2026-03-01 22:17:22.777'),
('cmm8b8x2700ai8ypzg69yno2u', '_MG_4842.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4842.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.784', '2026-03-01 22:17:22.784'),
('cmm8b8x2700ak8ypz0rt50inh', '_MG_4849.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4849.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.784', '2026-03-01 22:17:22.784'),
('cmm8b8x2800am8ypz67zkkolx', '_MG_4812.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4812.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.784', '2026-03-01 22:17:22.784'),
('cmm8b8x2800ao8ypz2z28v83j', '_MG_4894.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4894.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.784', '2026-03-01 22:17:22.784'),
('cmm8b8x2800aq8ypzudtfa0h0', '_MG_4817.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442540-_MG_4817.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.784', '2026-03-01 22:17:22.784'),
('cmm8b8x2800as8ypzfe2rkvgk', '_MG_4504.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442537-_MG_4504.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.785', '2026-03-01 22:17:22.785'),
('cmm8b8x2800au8ypz87u9efxv', '_MG_4878.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4878.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.785', '2026-03-01 22:17:22.785'),
('cmm8b8x2900aw8ypzo0eft442', '_MG_4917.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4917.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.785', '2026-03-01 22:17:22.785'),
('cmm8b8x2900ay8ypzeovdn1qc', '_MG_4986.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442542-_MG_4986.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.785', '2026-03-01 22:17:22.785'),
('cmm8b8x2900b08ypz2fmhrhu9', '_MG_5015.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5015.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.786', '2026-03-01 22:17:22.786'),
('cmm8b8x2900b28ypzh5qagl3b', '_MG_5201.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5201.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.786', '2026-03-01 22:17:22.786'),
('cmm8b8x2a00b48ypz2ewkkn0z', '_MG_5202.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5202.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.786', '2026-03-01 22:17:22.786'),
('cmm8b8x2a00b68ypzh9agjq0u', '_MG_5416.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5416.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.786', '2026-03-01 22:17:22.786'),
('cmm8b8x2a00b88ypz7wbrd1pt', '_MG_5459.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5459.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.787', '2026-03-01 22:17:22.787'),
('cmm8b8x2g00ba8ypzl9ngea95', '_MG_4883.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442541-_MG_4883.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.793', '2026-03-01 22:17:22.793'),
('cmm8b8x2g00bc8ypzg2xfb3uu', '_MG_5086.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5086.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.793', '2026-03-01 22:17:22.793'),
('cmm8b8x2h00be8ypzlgeka5gl', '_MG_5523.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5523.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.793', '2026-03-01 22:17:22.793'),
('cmm8b8x2j00bg8ypzwzt0xu6n', '_MG_5297.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5297.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.796', '2026-03-01 22:17:22.796'),
('cmm8b8x2j00bi8ypzfezfoks7', '_MG_5405.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442544-_MG_5405.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.796', '2026-03-01 22:17:22.796'),
('cmm8b8x2k00bk8ypzrnlm70nl', '_MG_5530.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442545-_MG_5530.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.796', '2026-03-01 22:17:22.796'),
('cmm8b8x2k00bm8ypzr9kq2aic', '_MG_5094.jpg', '/uploads/cmm8b8wo100008ypzaulckqbl/1772403442543-_MG_5094.jpg', 'cmm8b8wo100008ypzaulckqbl', '2026-03-01 22:17:22.796', '2026-03-01 22:17:22.796');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `emailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `emailVerified`, `image`, `createdAt`, `updatedAt`) VALUES
('cmm8b4etf0000u0gcxzqysg5c', 'admin@example.com', 'Admin', 0, NULL, '2026-03-01 22:13:52.514', '2026-03-01 22:13:52.514');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `session`
--

CREATE TABLE `session` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `token` varchar(191) NOT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `userAgent` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `account`
--

CREATE TABLE `account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `accountId` varchar(191) NOT NULL,
  `providerId` varchar(191) NOT NULL,
  `accessToken` text DEFAULT NULL,
  `refreshToken` text DEFAULT NULL,
  `idToken` text DEFAULT NULL,
  `expiresAt` datetime(3) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `verification`
--

CREATE TABLE `verification` (
  `id` varchar(191) NOT NULL,
  `identifier` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('7c704895-2f74-4e7f-b053-174e121ee82c', '7431bdf29fa8b522ad585bbd9a7531f5e8febcb79ba8edc0fa4e05a86fe80ddc', '2026-03-01 21:20:30.114', '20260301212030_init_mysql', NULL, NULL, '2026-03-01 21:20:30.057', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Image_eventId_fkey` (`eventId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- A tábla indexei `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_token_key` (`token`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- A tábla indexei `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_providerId_accountId_key` (`providerId`, `accountId`),
  ADD KEY `Account_userId_fkey` (`userId`);

--
-- A tábla indexei `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Verification_identifier_value_key` (`identifier`, `value`);

--
-- A tábla indexei `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `Image_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
