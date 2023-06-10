const data = [
  {
    id: 1,img: 'https://m.media-amazon.com/images/I/61x38kEipaL._AC_UL600_QL65_.jpg',
    title: 'Graphic T-shirt',
    category: 'Men',
    price: 576
  },
  {
    id: 2,
    img: 'https://m.media-amazon.com/images/I/61JvGG00JBS._AC_UL600_QL65_.jpg',
    title: 'Round Neck T-shirt',
    category: 'Men',
    price: 734
  },
  {
    id: 3,
    img: 'https://m.media-amazon.com/images/I/81fCzXR0WyL._AC_UL600_QL65_.jpg',
    title: 'Women T-Shirt',
    category: 'Women',
    price: 349
  },
  {
    id: 4,
    img: 'https://m.media-amazon.com/images/I/71+ZShLtNsL._AC_UL600_QL65_.jpg',
    title: 'Printed Denim Jacket',
    category: 'Men',
    price: 2015
  },
  {
    id: 5,
    img: 'https://m.media-amazon.com/images/I/91VUHcww2pL._AC_UL600_QL65_.jpg',
    title: 'Maurauders Map',
    category: 'Stationery',
    price: 499
  },
  {
    id: 6,
    img: 'https://m.media-amazon.com/images/I/81udqYB5obL._AC_UL600_QL65_.jpg',
    title: 'Backpack (25L)',
    category: 'Accessories',
    price: 1200
  },
  {
    id: 7,
    img: 'https://m.media-amazon.com/images/I/41jkrjwW8BL._SX300_SY300_QL70_FMwebp_.jpg',
    title: 'Harry Potter Music Box',
    category: 'Stationery',
    price: 449
  },
  {
    id: 8,
    img: 'https://m.media-amazon.com/images/I/416b2UV8GKL._AC_UL600_QL65_.jpg',
    title: 'Cotton Hoodie',
    category: 'Men',
    price: 799
  },
  {
    id: 9,
    img: 'https://m.media-amazon.com/images/I/81Sn3W3gYlL._AC_UL600_QL65_.jpg',
    title: 'Multicolor A5 Notebook',
    category: 'Stationery',
    price: 349
  },
  {
    id: 10,
    img: 'https://m.media-amazon.com/images/I/51oRB-F3gAL._AC_UL600_QL65_.jpg',
    title: 'Deathly Hallows Pendant',
    category: 'Accessories',
    price: 185
  },
  {
    id: 11,
    img: 'https://m.media-amazon.com/images/I/61QcFGiYNvL._AC_UL600_QL65_.jpg',
    title: 'Spell and Charm Pocket Dress',
    category: 'Women',
    price: 949
  },
  {
    id: 12,
    img: 'https://m.media-amazon.com/images/I/81zqe4fNdlL._AC_UY327_FMwebp_QL65_.jpg',
    title: 'Harry Potter Books Set (Paperback)',
    category: 'Stationery',
    price: 2240
  },
  {
    id: 13,
    img: 'https://m.media-amazon.com/images/I/61wrzJBwrwL._AC_UL600_QL65_.jpg',
    title: 'Multicolor Scarf',
    category: 'Accessories',
    price: 699
  },
  {
    id: 14,
    img: 'https://m.media-amazon.com/images/I/81NtRnbdJKL._AC_UL600_QL65_.jpg',
    title: 'Knit Scarf Set',
    category: 'Kids',
    price: 9648
  },
  {
    id: 15,
    img: 'https://m.media-amazon.com/images/I/718rHbRVZ9L._AC_UL600_QL65_.jpg',
    title: 'Hermione Costume',
    category: 'Women',
    price: 9098
  },
  {
    id: 16,
    img: 'https://m.media-amazon.com/images/I/81sE4hJRhVL._AC_UL600_QL65_.jpg',
    title: 'Hufflepuff Tie',
    category: 'Accessories',
    price: 6168
  },
  {
    id: 17,
    img: 'https://m.media-amazon.com/images/I/61u6FwFCcCL._AC_UL600_QL65_.jpg',
    title: 'Kids Hoodie',
    category: 'Kids',
    price: 650
  },
  {
    id: 18,
    img: 'https://m.media-amazon.com/images/I/61ehUGm-UrL._AC_UL600_QL65_.jpg',
    title: 'Round Neck T-shirt',
    category: 'Men',
    price: 1855
  },
  {
    id: 19,
    img: 'https://m.media-amazon.com/images/I/71V9mhQeAML._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Double Strap Backpack',
    category: 'Accessories',
    price: 9929
  },
  {
    id: 20,
    img: 'https://m.media-amazon.com/images/I/61bxewzVk6L._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Women Clutch Bag',
    category: 'Women',
    price: 12378
  },
  {
    id: 21,
    img: 'https://m.media-amazon.com/images/I/61aRtUJfDSL._AC_UY327_FMwebp_QL65_.jpg',
    title: 'Hogwarts Acceptance Letter',
    category: 'Stationery',
    price: 2919
  }
  ,
  {
    id: 22,
    img: 'https://m.media-amazon.com/images/I/71hVEPGVuXL._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Printed Half Sleeve TShirt',
    category: 'Kids',
    price: 329
  }
  ,
  {
    id: 23,
    img: 'https://m.media-amazon.com/images/I/61d77CmVRhL._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Floating Fake Candles With Wand Remote',
    category: 'Electronics',
    price: 5923
  }
  ,
  {
    id: 24,
    img: 'https://m.media-amazon.com/images/I/51PK4KcR-5L._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Scratch Resistant Vinyl Phone Cover',
    category: 'Electronics',
    price: 201
  },
  {
    id: 25,
    img: 'https://m.media-amazon.com/images/I/81-cJw8SwUL._UX679_.jpg',
    title: 'Pocket Watch Keychain',
    category: 'Accessories',
    price: 499
  }
  ,
  {
    id: 26,
    img: 'https://m.media-amazon.com/images/I/61vnltk9gBL._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Coin Purse',
    category: 'Women',
    price: 3673
  }
  ,
  {
    id: 27,
    img: 'https://m.media-amazon.com/images/I/71u5R8iivdL._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Kids Flip Flops',
    category: 'Kids',
    price: 769
  }
  ,
  {
    id: 28,
    img: 'https://m.media-amazon.com/images/I/618GH+5l5xL._AC_UL600_FMwebp_QL65_.jpg',
    title: 'Dumbledore Flash Drive',
    category: 'Electronics',
    price: 4958
  }
];

export default data;
