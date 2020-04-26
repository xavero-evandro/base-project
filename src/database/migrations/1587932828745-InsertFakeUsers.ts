/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertFakeUsers1587932828745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
      INSERT INTO users
      VALUES
      ('55ddb5da-a9f1-4ed9-b7b6-67cfa1121fa6',
      'Xavero',
      'xavero@xavero.com',
      '$2a$08$4undrbtfV4MDcoaV3gM.DOy.lnFj56U9yVMbRrU8kBFWbxHAmpl16',
      '2020-04-26 12:11:54',
      '2020-04-26 12:11:54'),
      ('d023b1a0-3733-408f-8366-532c81d3f153',
      'Xavero2',
      'xavero2@xavero.com',
      '$2a$08$2F5M2MbzBB3CbGAXu1mNM.rTdr05m1shfUuRC2IlKg7Mn0tQzw/WC',
      '2020-04-26 20:19:10',
      '2020-04-26 20:19:10');
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
      DELETE FROM users WHERE = '55ddb5da-a9f1-4ed9-b7b6-67cfa1121fa6';
      DELETE FROM users WHERE = 'd023b1a0-3733-408f-8366-532c81d3f153';
      `
    );
  }
}
