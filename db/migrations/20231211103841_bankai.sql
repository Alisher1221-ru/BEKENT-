-- migrate:up
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `role` ENUM ('admin', 'user', 'moderator', 'delevery')
  `username` varchar(255),
  `firstname` varchar(255),
  `email` varchar(255),
  `refresh_token` varchar(255),
  `phone` varchar(255),
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `product` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `price` integer,
  `images` text,
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `desc_shop_uz` varchar(255),
  `desc_shop_ru` varchar(255),
  `desc_uz` varchar(255),
  `desc_ru` varchar(255),
  `view_count` integer,
  `order_count` integer,
  `discount_in_perecnt` float,
  `remoining_count` integer,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `event` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `name` varchar(255)
);

CREATE TABLE `category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `desc_shop_uz` varchar(255),
  `desc_shop_ru` varchar(255),
  `product_id` varchar(255),
  `atrebuts_id` varchar(255),
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `parent_id` integer
);

CREATE TABLE `cart` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `product_id` integer,
  `count` integer
);

CREATE TABLE `like` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `product_id` integer
);

CREATE TABLE `comment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `parent_id` integer,
  `user_id` integer,
  `content` text,
  `images` varchar(255),
  `product_id` integer,
  `rating` varchar(255),
  `answer_to` integer
);

CREATE TABLE `Adress` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `region` varchar(255),
  `city` varchar(255),
  `street` varchar(255),
  `houes` varchar(255),
  `room` varchar(255),
  `name` varchar(255),
  `user_id` integer
);

CREATE TABLE `attributes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `name_uz` varchar(255),
  `name_ru` varchar(255)
);

CREATE TABLE `attributes_value` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `atrebuts_id` integer
);

CREATE TABLE `order` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `adress_id` integer,
  `user_id` integer,
  `product` integer,
  `delevery_id` integer,
  `count` integer,
  `status` ENUM ('packing', 'on_the_way', 'finished')
);

CREATE TABLE `delivery` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `delevery_id` integer,
  `note` varchar(255),
  `delevery_fee` integer
);

CREATE TABLE `product_event` (
  `product_id` integer,
  `event_id` integer,
  PRIMARY KEY (`product_id`, `event_id`)
);

ALTER TABLE `product_event` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`); 

ALTER TABLE `product_event` ADD FOREIGN KEY (`event_id`) REFERENCES `event` (`id`);


ALTER TABLE `category` ADD FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

CREATE TABLE `product_comment` (
  `product_id` integer,
  `comment_id` integer,
  PRIMARY KEY (`product_id`, `comment_id`)
);

ALTER TABLE `product_comment` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `product_comment` ADD FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`);


ALTER TABLE `comment` ADD FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`answer_to`) REFERENCES `comment` (`id`);

ALTER TABLE `Adress` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `product_attributes` (
  `product_id` integer,
  `attributes_id` integer,
  PRIMARY KEY (`product_id`, `attributes_id`)
);

ALTER TABLE `product_attributes` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `product_attributes` ADD FOREIGN KEY (`attributes_id`) REFERENCES `attributes` (`id`);


CREATE TABLE `product_attributes_value` (
  `product_id` integer,
  `attributes_value_id` integer,
  PRIMARY KEY (`product_id`, `attributes_value_id`)
);

ALTER TABLE `product_attributes_value` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `product_attributes_value` ADD FOREIGN KEY (`attributes_value_id`) REFERENCES `attributes_value` (`id`);


ALTER TABLE `attributes_value` ADD FOREIGN KEY (`atrebuts_id`) REFERENCES `attributes` (`id`);

CREATE TABLE `product_order` (
  `product_id` integer,
  `order_id` integer,
  PRIMARY KEY (`product_id`, `order_id`)
);

ALTER TABLE `product_order` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `product_order` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);


ALTER TABLE `order` ADD FOREIGN KEY (`adress_id`) REFERENCES `Adress` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`product`) REFERENCES `product` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`delevery_id`) REFERENCES `delivery` (`id`);

ALTER TABLE `delivery` ADD FOREIGN KEY (`delevery_id`) REFERENCES `users` (`id`);



-- migrate:down

DROP DABABASE ecommerce