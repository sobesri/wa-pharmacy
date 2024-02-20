import bcrypt from 'bcrypt';

const medicinesData = [
  {
    name: 'Test Med1',
    description: 'This is test medicine 1',
    quantity: 2,
  },
  {
    name: 'Test Med2',
    description: 'This is test medicine 2',
    quantity: 5,
  },
  {
    name: 'Test Med3',
    description: 'This is test medicine 3',
    quantity: 11,
  },
  {
    name: 'Test Med4',
    description: 'This is test medicine 4',
    quantity: 6,
  }
];

async function seedMedicines(db) {
  try {
    let query = 'INSERT INTO medicines (name, description, quantity) VALUES';
    let values = []
    medicinesData.forEach(({ name, description, quantity }) => {
      values.push(`('${name}', '${description}', ${quantity})`);
    });
    query += values.join(',');

    db.serialize(() => {
      db.exec(query);
      console.log('Medicines seeded successfully');
    });
  } catch (error) {
    // throw error;
    console.error('Error seeding medicines:', error);
  }
}

export default seedMedicines;
