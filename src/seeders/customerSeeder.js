const customersData = [
  {
    address: 'Test Customer Address',
    phone: 'Test Customer Phone',
    user_id: 4,
  }
];

async function seedCustomers(db) {
  try {
    let query = 'INSERT INTO customers (address, phone, user_id) VALUES';
    let values = []
    customersData.forEach(({ address, phone, user_id }) => {
      values.push(`('${address}', '${phone}', ${user_id})`);
    });
    query += values.join(',');

    db.serialize(() => {
      db.exec(query);
      console.log('Customers seeded successfully');
    });
  } catch (error) {
    // throw error;
    console.error('Error seeding customers:', error);
  }
}

export default seedCustomers;
