const faker = require('faker');
export default data = [
  {
    image: faker.random.image(),
    avatar: 'https://picsum.photos/id/1005/400',
    desc: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    rating: 3,
    key: '1',
    phoneNumber: faker.phone.phoneNumber().toString(),
    sellerName: faker.name.findName().toString(),
  },
  {
    image: faker.random.image(),
    avatar: 'https://picsum.photos/id/0/400',
    desc: faker.commerce.productDescription().toString(),
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    rating: 5,
    key: '2',
    phoneNumber: faker.phone.phoneNumber(),
    sellerName: faker.name.findName(),
  },
  {
    image: faker.random.image(),
    avatar: 'https://picsum.photos/id/0/400',
    desc: faker.commerce.productDescription().toString(),
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    rating: 5,
    key: '3',
    phoneNumber: faker.phone.phoneNumber(),
    sellerName: faker.name.findName(),
  },
  // {
  //   image: 'https://picsum.photos/id/205/400',
  //   avatar: 'https://picsum.photos/id/0/400',
  //   desc: faker.commerce.productDescription().toString(),
  //   name: faker.commerce.product(),
  //   price: faker.commerce.price(),
  //   rating: 5,
  //   key: '3',
  //   phoneNumber: faker.phone.phoneNumber(),
  //   sellerName: faker.name.findName(),
  // },
  // {
  //   image: 'https://picsum.photos/id/320/400',
  //   avatar: 'https://picsum.photos/id/0/400',
  //   desc: faker.commerce.productDescription().toString(),
  //   name: faker.commerce.product(),
  //   price: 5600,
  //   rating: 5,
  //   key: '4',
  //   phoneNumber: faker.phone.phoneNumber(),
  //   sellerName: faker.name.findName(),
  // },
];

export const images = [
  {
    uri:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
  },
  {
    uri:
      'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg',
  },
  {
    uri:
      'https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg',
  },
];

export const listItems = [
  {
    image: 'https://picsum.photos/id/900/400',
    id: 'item1',
    name: 'mostafa benlagha',
  },
  {
    image: 'https://picsum.photos/id/901/400',
    id: 'item2',
    name: 'tamani karim',
  },
  {
    image: 'https://picsum.photos/id/902/400',
    id: 'item3',
    name: 'youcef saadi',
  },
  {
    image: 'https://picsum.photos/id/903/400',
    id: 'item4',
    name: 'nadir belhadj',
  },
];
