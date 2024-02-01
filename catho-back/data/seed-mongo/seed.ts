import { faker } from '@faker-js/faker/locale/pt_BR';
import { config as configEnv } from 'dotenv';
import { MongoClient } from 'mongodb';

configEnv();

function getRandomSkills(
  skills: string[],
  minCount: number,
  maxCount: number,
): string[] {
  const count =
    Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  return skills.slice(0, count);
}

async function seedDB() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db('catho').collection('candidates');

    const candidatesSeriesData = [];
    const programmingSkills = [
      'javascript',
      'python',
      'java',
      'c++',
      'c#',
      'rust',
      'go',
      'ruby',
      'php',
      'swift',
      'lua',
      'scala',
      'kotlin',
      'objective-c',
      'dart',
      'c',
    ];

    const minSkills = 3;
    const maxSkills = 7;

    for (let i = 0; i < 1000; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const newCandidate = {
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        skills: getRandomSkills(programmingSkills, minSkills, maxSkills),
        avatar: faker.image.avatar(),
      };

      candidatesSeriesData.push(newCandidate);
    }

    await collection.insertMany(candidatesSeriesData).catch(() => {});

    console.log('Database seeded! :)');
    await client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
