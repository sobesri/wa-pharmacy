import bcrypt from 'bcrypt';

const usersData = [
  {
    id: 1,
    name: 'Test Owner',
    username: 'testOwner',
    password: 'test123',
    role: 'owner',
  },
  {
    id: 2,
    name: 'Test Manager',
    username: 'testManager',
    password: 'test456',
    role: 'manager',
  },
  {
    id: 3,
    name: 'Test Cashier',
    username: 'testCashier',
    password: 'test789',
    role: 'cashier',
  },
  {
    id: 4,
    name: 'Test Customer',
    username: 'testCustomer',
    password: 'test012',
    role: 'customer',
  }
];

async function seedUsers(db) {
  try {
    // Hash passwords before seeding using bcrypt
    const seededUsers = await Promise.all(usersData.map(async (userData) => {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      return {
        ...userData,
        password: hashedPassword,
      };
    }));

    let query = 'INSERT INTO users (name, username, password, role) VALUES';
    let values = []
    seededUsers.forEach(({ name, username, password, role }) => {
      values.push(`('${name}', '${username}', '${password}', '${role}')`);
    });
    query += values.join(',');

    db.serialize(() => {
      db.exec(query, () => {
        console.log('Users seeded successfully');
        const query = 'SELECT * FROM users';

        db.all(query, (err, row) => {
          if (err) {
            console.log('error', err);
          } else {
            // console.log('success', row);
          }
        });
      });
    });
  } catch (error) {
    throw error;
    // console.error('Error seeding users:', error);
  }
}

export default seedUsers;
