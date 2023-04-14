import { MigrationInterface, QueryRunner } from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
   public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable('movies', {
        id: { type: 'integer', primary: true, generated: true },
        name: { type: 'varchar', length: '255' },
        description: { type: 'text' },
    });

    await queryRunner.createTable('shows', {
        id: { type: 'integer', primary: true, generated: true },
        movieId: { type: 'integer' },
        startTime: { type: 'timestamp' },
        endTime: { type: 'timestamp' },
        roomId: { type: 'integer' },
        price: { type: 'float' },
    });

    await queryRunner.createTable('rooms', {
        id: { type: 'integer', primary: true, generated: true },
        name: { type: 'varchar', length: '255' },
        capacity: { type: 'integer' },
    });

    await queryRunner.createTable('seats', {
        id: { type: 'integer', primary: true, generated: true },
        roomId: { type: 'integer' },
        row: { type: 'integer' },
        number: { type: 'integer' },
        seatType: { type: 'varchar', length: '255' },
    });

    await queryRunner.createTable('bookings', {
        id: { type: 'integer', primary: true, generated: true },
        showId: { type: 'integer' },
        seatId: { type: 'integer' },
        userId: { type: 'integer' },
    });
}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
