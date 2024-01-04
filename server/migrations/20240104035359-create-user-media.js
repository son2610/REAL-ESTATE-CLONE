"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserMedias", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
            },
            uid: {
                type: Sequelize.UUID,
                // reference là mối liên hệ giữa các bảng, model là liên kết với bảng nào, key là khoá chính bảng kia liên kết với trường nào bên bảng này
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            provider: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            link: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UserMedias");
    },
};
