import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1643374563989 implements MigrationInterface {
    name = 'migrationName1643374563989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`permission\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` varchar(36) NOT NULL,
                \`firstName\` varchar(50) NOT NULL,
                \`lastName\` varchar(50) NOT NULL,
                \`userName\` varchar(50) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` (\`userName\`),
                UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`role\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`userId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`session\` (
                \`id\` varchar(255) NOT NULL,
                \`expiresAt\` int NOT NULL,
                \`data\` text NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`role_permissions\` (
                \`roleId\` varchar(36) NOT NULL,
                \`permissionId\` varchar(36) NOT NULL,
                INDEX \`IDX_b4599f8b8f548d35850afa2d12\` (\`roleId\`),
                INDEX \`IDX_06792d0c62ce6b0203c03643cd\` (\`permissionId\`),
                PRIMARY KEY (\`roleId\`, \`permissionId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`role\`
            ADD CONSTRAINT \`FK_3e02d32dd4707c91433de0390ea\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`role_permissions\`
            ADD CONSTRAINT \`FK_b4599f8b8f548d35850afa2d12c\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`role_permissions\`
            ADD CONSTRAINT \`FK_06792d0c62ce6b0203c03643cdd\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_06792d0c62ce6b0203c03643cdd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_b4599f8b8f548d35850afa2d12c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`role\` DROP FOREIGN KEY \`FK_3e02d32dd4707c91433de0390ea\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_06792d0c62ce6b0203c03643cd\` ON \`role_permissions\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_b4599f8b8f548d35850afa2d12\` ON \`role_permissions\`
        `);
        await queryRunner.query(`
            DROP TABLE \`role_permissions\`
        `);
        await queryRunner.query(`
            DROP TABLE \`session\`
        `);
        await queryRunner.query(`
            DROP TABLE \`role\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`permission\`
        `);
    }

}
