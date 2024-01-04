"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("PropertyFeatures", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
            },
            propertyId: {
                type: Sequelize.UUID,
                // reference là mối liên hệ giữa các bảng, model là liên kết với bảng nào, key là khoá chính bảng kia liên kết với trường nào bên bảng này
                references: {
                    model: "Properties",
                    key: "id",
                },
            },
            featureId: {
                type: Sequelize.UUID,
                references: {
                    model: "Features",
                    key: "id",
                },
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
        await queryInterface.dropTable("PropertyFeatures");
    },
};
