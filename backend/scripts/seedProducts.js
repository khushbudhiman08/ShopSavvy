const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const menProducts = [
  {
    id: 1,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-005-400x400.jpg",
    shoeTitle: "Men's Black Running",
    shoePrice: 4500,
    saleStatus: false,
    type: "Running",
    category: "Men",
    desc: "Introducing Men's Black Running - the epitome of style and performance in athletic footwear. Engineered for the modern runner, these shoes blend sleek aesthetics with cutting-edge technology to deliver an unparalleled running experience. With their lightweight design and responsive cushioning, they provide optimal support and comfort mile after mile. The all-black colorway exudes sophistication and versatility, effortlessly complementing any workout attire or casual ensemble."
  },
  {
    id: 2,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-019-400x400.jpg",
    shoeTitle: "Men's Classic Blue",
    oldShoePrice: 5500,
    shoePrice: 4750,
    saleStatus: true,
    type: "Sneaker",
    category: "Men",
    desc: "Introducing Men's Classic Blue – a timeless blend of elegance and comfort. Crafted with meticulous attention to detail, these shoes are the epitome of sophistication. Featuring a classic blue hue that exudes confidence and style, they effortlessly elevate any ensemble. Engineered for all-day wear, they offer plush cushioning and support, ensuring unparalleled comfort with every step. Whether you're heading to the office or stepping out for a casual outing, Men's Classic Blue shoes are the perfect choice for discerning gentlemen who appreciate both style and substance. Step into sophistication and make a statement with these iconic classics."
  },
  {
    id: 3,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-020-400x400.jpg",
    shoeTitle: "Men's Classic Mint",
    shoePrice: 5500,
    saleStatus: false,
    type: "Sneaker",
    category: "Men",
    desc: "Introducing Men's Classic Mint – a fusion of timeless style and refreshing comfort. Crafted with precision, these shoes exude sophistication and versatility. With a soothing mint hue, they add a pop of color to your wardrobe while maintaining an understated elegance. Engineered for all-day wear, they offer superior cushioning and support, ensuring maximum comfort throughout your day. Whether you're strolling through the city streets or attending a casual gathering, Men's Classic Mint shoes provide the perfect combination of style and functionality. Elevate your look and embrace effortless sophistication with these iconic classics."
  },
  {
    id: 4,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-017-400x400.jpg",
    shoeTitle: "Men's Earth-Tone Sneaker",
    shoePrice: 4800,
    saleStatus: false,
    type: "Sneaker",
    category: "Men",
    desc: "Introducing Men's Earth-Tone Sneaker – a harmonious blend of style and sustainability. These sneakers boast a palette inspired by nature's earthy hues, exuding a timeless yet contemporary charm. Crafted with eco-friendly materials, they reflect a commitment to environmental consciousness without compromising on quality or comfort. Engineered for urban adventures, they offer exceptional cushioning and support for all-day wear. Whether you're exploring the city streets or meeting friends for a casual outing, Men's Earth-Tone Sneakers are the epitome of versatile footwear. Elevate your style while treading lightly on the planet with these eco-conscious sneakers."
  },
  {
    id: 5,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-007-400x400.jpg",
    shoeTitle: "Men's Green Running",
    oldShoePrice: 4200,
    shoePrice: 3500,
    saleStatus: true,
    type: "Running",
    category: "Men",
    desc: "Introducing Men's Green Running, a dynamic fusion of style and performance. These running shoes are designed to make a statement with their vibrant green colorway, adding a bold touch to your athletic attire. Engineered for runners who demand both comfort and functionality, they feature responsive cushioning and supportive midsoles to enhance your performance. With a breathable upper construction, they ensure optimal airflow to keep your feet cool and comfortable throughout your run. Whether you're hitting the track or pounding the pavement, Men's Green Running shoes provide the perfect balance of style and support. Step into these sleek sneakers and conquer every mile with confidence and style."
  },
  {
    id: 6,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-018-400x400.jpg",
    shoeTitle: "Men's Moonstone Sneaker",
    shoePrice: 5200,
    saleStatus: false,
    type: "Sneaker",
    category: "Men",
    desc: "Introducing Men's Moonstone Sneaker, a pinnacle of modern style and comfort. These sneakers exude sophistication with their sleek design and subtle moonstone hue, making them a versatile addition to any wardrobe. Crafted with premium materials, they offer superior durability and long-lasting wear. The lightweight construction and cushioned footbed ensure all-day comfort, whether you're exploring the city or running errands. With their timeless appeal and understated elegance, Men's Moonstone Sneakers effortlessly elevate any casual ensemble. Step into these iconic sneakers and experience the perfect blend of style and functionality for the modern gentleman."
  },
  {
    id: 7,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-008-400x400.jpg",
    shoeTitle: "Men's Navy Running",
    shoePrice: 4750,
    saleStatus: false,
    type: "Running",
    category: "Men",
    desc: "Introducing Men's Navy Running, the epitome of style and performance for the modern runner. These sleek running shoes feature a timeless navy hue that exudes sophistication and versatility. Engineered with precision, they offer optimal support and cushioning to enhance your running experience. The breathable mesh upper ensures airflow and comfort, while the durable outsole provides traction on various surfaces. Whether you're hitting the track or pounding the pavement, Men's Navy Running shoes are designed to keep you comfortable and stylish mile after mile. Elevate your running game with these iconic sneakers that seamlessly blend fashion and function."
  },
  {
    id: 8,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-400x400.jpg",
    shoeTitle: "Men's Red Running",
    oldShoePrice: 4750,
    shoePrice: 4150,
    saleStatus: true,
    type: "Running",
    category: "Men",
    desc: "Introducing Men's Red Running, a bold statement of style and performance. These vibrant running shoes boast a striking red colorway that adds a pop of personality to your athletic ensemble. Crafted with precision engineering, they offer superior support and cushioning to enhance your running experience. The lightweight design and breathable upper ensure maximum comfort and ventilation, keeping you cool and focused on your goals. Whether you're sprinting on the track or logging miles on the road, Men's Red Running shoes provide the perfect combination of style and functionality. Step into these dynamic sneakers and make a statement with every stride."
  }
];

const womenProducts = [
  {
    id: 101,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-003-400x400.jpg",
    shoeTitle: "Women's Blue Training",
    oldShoePrice: 3200,
    shoePrice: 2550,
    saleStatus: true,
    type: "Training",
    category: "Women",
    desc: "Introducing Women's Blue Training, the ultimate fusion of style and functionality for the active woman. These training shoes feature a sleek design and a captivating blue hue that exudes confidence and versatility. Engineered with precision, they provide exceptional support and stability for all your training sessions. The lightweight construction and responsive cushioning ensure optimal comfort and energy return, helping you push through your workouts with ease. Whether you're hitting the gym or taking on outdoor activities, Women's Blue Training shoes are designed to keep up with your active lifestyle. Elevate your training routine with these stylish and performance-driven sneakers that empower you to reach new heights."
  },
  {
    id: 102,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-014-400x400.jpg",
    shoeTitle: "Women's Candy City Run",
    oldShoePrice: 3800,
    shoePrice: 3200,
    saleStatus: true,
    type: "Running",
    category: "Women",
    desc: "Introducing Women's Candy City Run, the perfect blend of fashion and function for the urban adventurer. These vibrant sneakers feature a playful candy-inspired color palette that adds a touch of sweetness to your cityscape. Engineered for the modern woman on the move, they offer lightweight construction and responsive cushioning for superior comfort and support. With a sleek design and eye-catching hues, Women's Candy City Run shoes are sure to turn heads as you navigate the bustling streets. Whether you're running errands or exploring the city, these stylish sneakers keep you on-trend and ready for anything. Step into Women's Candy City Run and make a bold statement with every step."
  },
  {
    id: 103,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-010-400x400.jpg",
    shoeTitle: "Women's Mint Sneaker",
    shoePrice: 3300,
    saleStatus: false,
    type: "Sneaker",
    category: "Women",
    desc: "Introducing Women's Mint Sneaker, a delightful combination of style and comfort for the modern woman. These sneakers feature a refreshing mint hue that adds a pop of color to any ensemble. Crafted with premium materials, they offer durability and long-lasting wear. The lightweight design and cushioned footbed ensure all-day comfort, making them perfect for both casual outings and active adventures. With their versatile appeal and understated elegance, Women's Mint Sneakers effortlessly elevate your look with a touch of sophistication. Step into these chic sneakers and experience the perfect blend of fashion and functionality for the contemporary woman."
  },
  {
    id: 104,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-013-400x400.jpg",
    shoeTitle: "Women's Choco City Run",
    shoePrice: 3750,
    saleStatus: false,
    type: "Running",
    category: "Women",
    desc: "Introducing Women's Choco City Run, a delicious blend of style and performance for the urban explorer. These sneakers feature a rich chocolate brown hue that exudes warmth and sophistication. Crafted with precision engineering, they provide optimal support and cushioning for all-day comfort during your city adventures. The lightweight design and breathable materials keep your feet feeling fresh, while the durable outsole offers traction on various surfaces. Whether you're strolling through the streets or running errands, Women's Choco City Run shoes ensure you step out in style. Elevate your city escapades with these chic and versatile sneakers that perfectly complement your on-the-go lifestyle."
  },
  {
    id: 105,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-015-400x400.jpg",
    shoeTitle: "Women's Cream Suede",
    shoePrice: 4800,
    saleStatus: false,
    type: "Sneaker",
    category: "Women",
    desc: "Introducing Women's Cream Suede, a luxurious fusion of elegance and comfort. These sneakers feature a creamy suede upper that exudes sophistication and refinement. Crafted with premium materials, they offer a plush feel and timeless style. The sleek design and neutral color make them versatile enough to pair with any outfit, from casual to dressy. Whether you're running errands or meeting friends for brunch, Women's Cream Suede shoes elevate your look with understated glamour. The cushioned footbed ensures all-day comfort, while the durable outsole provides traction and stability. Step into these chic sneakers and experience the epitome of luxury for the modern woman."
  },
  {
    id: 106,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-001-400x400.jpg",
    shoeTitle: "Women's Green Training",
    oldShoePrice: 3500,
    shoePrice: 2600,
    saleStatus: true,
    type: "Training",
    category: "Women",
    desc: "Introducing Women's Green Training, the epitome of style and performance for the active woman. These training shoes feature a vibrant green colorway that exudes energy and vitality. Engineered with precision, they offer optimal support and stability for all your training needs. The lightweight design and responsive cushioning ensure maximum comfort and flexibility, allowing you to push yourself further with each workout. Whether you're hitting the gym or enjoying outdoor activities, Women's Green Training shoes are designed to keep up with your active lifestyle. Elevate your training routine with these stylish and functional sneakers that empower you to reach new heights. Step into Women's Green Training and make a statement with every step."
  },
  {
    id: 107,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-009-400x400.jpg",
    shoeTitle: "Women's Orange Sneaker",
    shoePrice: 2750,
    saleStatus: false,
    type: "Sneaker",
    category: "Women",
    desc: "Introducing Women's Orange Sneaker, a vibrant blend of style and comfort for the modern woman. These sneakers feature a bold orange hue that adds a pop of color to any outfit. Crafted with attention to detail, they offer a perfect balance of fashion and functionality. The lightweight design and cushioned footbed ensure all-day comfort, making them ideal for everyday wear. Whether you're running errands or meeting friends for coffee, Women's Orange Sneaker keeps you stylish and on-the-go. Step into these chic sneakers and elevate your look with a touch of playful sophistication. Experience the perfect combination of style and comfort with Women's Orange Sneaker."
  },
  {
    id: 108,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-004-400x400.jpg",
    shoeTitle: "Women's Peach Training",
    oldShoePrice: 3500,
    shoePrice: 2600,
    saleStatus: true,
    type: "Training",
    category: "Women",
    desc: "Introducing Women's Peach Training, the epitome of elegance and functionality in athletic footwear. These training shoes boast a delicate peach hue that exudes femininity and style. Crafted with precision, they offer optimal support and stability for intense workouts and training sessions. The lightweight design and responsive cushioning ensure comfort and flexibility, empowering you to achieve your fitness goals with confidence. Whether you're hitting the gym or engaging in outdoor activities, Women's Peach Training shoes are your perfect companion for staying active in style. Step into these chic sneakers and experience the perfect fusion of fashion and performance. Elevate your training routine with Women's Peach Training and stand out with every step."
  },
  {
    id: 109,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-016-400x400.jpg",
    shoeTitle: "Women's Pink Suede",
    shoePrice: 4900,
    saleStatus: false,
    type: "Sneaker",
    category: "Women",
    desc: "Introducing Women's Pink Suede, a symbol of sophistication and comfort. These sneakers feature a soft pink suede upper that exudes elegance and femininity. Crafted with meticulous attention to detail, they offer a luxurious feel and timeless style. The sleek design and delicate hue make them a versatile addition to any wardrobe, perfect for both casual and dressy occasions. With a cushioned footbed for all-day comfort and a durable outsole for traction, Women's Pink Suede shoes are designed to keep you stylish and comfortable wherever you go. Step into these chic sneakers and elevate your look with a touch of refined glamour. Experience luxury and sophistication with Women's Pink Suede."
  },
  {
    id: 110,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-002-400x400.jpg",
    shoeTitle: "Women's Pink Training",
    oldShoePrice: 3500,
    shoePrice: 2600,
    saleStatus: true,
    type: "Training",
    category: "Women",
    desc: "Introducing Women's Pink Training, a perfect blend of style and functionality for the active woman. These training shoes boast a vibrant pink hue that adds a touch of femininity to your workout ensemble. Crafted with precision, they offer optimal support and stability for your training sessions. The lightweight design and responsive cushioning ensure maximum comfort and flexibility, allowing you to push your limits with confidence. Whether you're hitting the gym or engaging in outdoor activities, Women's Pink Training shoes keep you stylish and comfortable throughout your fitness journey. Step into these chic sneakers and elevate your workout attire with a splash of color. Experience the perfect fusion of fashion and performance with Women's Pink Training."
  },
  {
    id: 111,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-011-400x400.jpg",
    shoeTitle: "Women's Tan Sneaker",
    oldShoePrice: 5200,
    shoePrice: 4550,
    saleStatus: true,
    type: "Sneaker",
    category: "Women",
    desc: "Introducing Women's Tan Sneaker, a timeless fusion of style and comfort. These sneakers feature a classic tan hue that exudes sophistication and versatility. Crafted with attention to detail, they offer a perfect balance of fashion and functionality. The sleek design and neutral color make them a versatile addition to any wardrobe, effortlessly complementing both casual and dressy outfits. With a cushioned footbed for all-day comfort and a durable outsole for traction, Women's Tan Sneaker is designed to keep you comfortable and stylish wherever you go. Step into these chic sneakers and elevate your look with understated elegance. Experience the perfect blend of style and comfort with Women's Tan Sneaker."
  },
  {
    id: 112,
    image: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-012-400x400.jpg",
    shoeTitle: "Women's Tosca City Run",
    shoePrice: 2499,
    saleStatus: false,
    type: "Running",
    category: "Women",
    desc: "Introducing Women's Tosca City Run, a vibrant embodiment of urban style and functionality. These sneakers feature a striking tosca hue that adds a bold pop of color to your cityscape ensemble. Crafted with meticulous detail, they offer a perfect balance of fashion-forward design and athletic performance. The lightweight construction and responsive cushioning ensure all-day comfort and support for your urban adventures. Whether navigating busy streets or exploring hidden gems, Women's Tosca City Run shoes keep you effortlessly chic and on-the-go. Step into these sleek sneakers and make a statement with every step, embracing the dynamic spirit of city life with unmatched style and confidence."
  }
];

async function seedProducts() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/futwrk';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert all products
    const allProducts = [...menProducts, ...womenProducts];
    await Product.insertMany(allProducts);
    console.log(`Seeded ${allProducts.length} products successfully`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();

