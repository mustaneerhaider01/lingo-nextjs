import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔄 Seeding the database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "German",
        imageSrc: "/de.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Course 1 (Spanish)
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics...)
        title: "Nouns",
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics...)
        title: "Verbs",
        order: 2,
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics...)
        title: "Verbs",
        order: 3,
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics...)
        title: "Verbs",
        order: 4,
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics...)
        title: "Verbs",
        order: 5,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Lesson 1 (Nouns)
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 2,
        lessonId: 1, // Lesson 1 (Nouns)
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, // Lesson 1 (Nouns)
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "the robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Challenge 1 (Which one of these is "the man"?)
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1, // Challenge 1 (Which one of these is "the man"?)
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1, // Challenge 1 (Which one of these is "the man"?)
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // Challenge 2 ("the man")
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2, // Challenge 2 ("the man")
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2, // Challenge 2 ("the man")
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Challenge 3 (Which one of these is "the robot"?)
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3, // Challenge 3 (Which one of these is "the robot"?)
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3, // Challenge 3 (Which one of these is "the robot"?)
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // Lesson 2 (Verbs)
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 5,
        lessonId: 2, // Lesson 2 (Verbs)
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 6,
        lessonId: 2, // Lesson 2 (Verbs)
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "the robot"?',
      },
    ]);

    console.log("✅ Seeding finished");
  } catch (err) {
    console.error(err);
    throw new Error("❌ Failed to seed the database");
  }
};

main();
