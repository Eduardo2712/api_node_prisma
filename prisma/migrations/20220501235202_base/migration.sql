-- AddForeignKey
ALTER TABLE `anuncios` ADD CONSTRAINT `anuncios_ibfk_4` FOREIGN KEY (`id_estado`) REFERENCES `estados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `anuncios` ADD CONSTRAINT `anuncios_ibfk_3` FOREIGN KEY (`id_cidade`) REFERENCES `cidades`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
