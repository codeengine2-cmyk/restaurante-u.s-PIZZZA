import { Product, ExtraOption } from './types';

export const availableExtras: ExtraOption[] = [
  { id: 'ext1', name: 'Extra Queijo Mozzarella', price: 800 },
  { id: 'ext2', name: 'Bacon Crocante Fatiado', price: 1200 },
  { id: 'ext3', name: 'Molho Especial Chipotle', price: 500 },
  { id: 'ext4', name: 'Jalapeños Frescos', price: 400 },
  { id: 'ext5', name: 'Cogumelos Frescos', price: 700 },
  { id: 'ext6', name: 'Salsicha de Frango Extra', price: 900 },
  { id: 'ext7', name: 'Azeitonas Pretas', price: 450 }
];

export const availableSides = [
  { id: 's1', name: 'Batata Frita Palito Crocante', price: 1000 },
  { id: 's2', name: 'Anéis de Cebola Empanados', price: 1200 },
  { id: 's3', name: 'Coleslaw Fresco da Casa', price: 800 },
  { id: 's4', name: 'Molho Garlic Ranch Especial', price: 400 }
];

export const products: Product[] = [
  // Pizzas
  {
    id: 'p1',
    name: 'Hot Stuff',
    description: 'Puré Nashville quente, pimento verde, chili, frango com ervas, tomate e queijo derretido.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKuFDTMqCjl5qLl6dbXbtLcClzuOwovW2UbC_P1WdNqJjhgdCnNhVPbpzrS8BXVayb_91KlH7ZN6vl10clgc78EqdG17Zg3Pg4z6eI61MizpA3ruZ-m6bOl20XbkAI4zT6s3iGJXRFtyFzQeIZTR6ZBRxmw6BNLHhSpe5nZU7qCJjqgpoJaSllaQUwhxN3qZtHLZXbTCz3mpPwnXw5sBXDU7f83vdnUiyvMC-jxCOteJy2K1m3jE04zYB_7XxWKlP6bnAQ13UL2Q',
    category: 'pizza',
    spicy: true,
    price: 5499,
    prices: { regular: 5499, medium: 7499, large: 10500 },
    prepTime: '15-20 min',
    ingredients: ['Puré Nashville', 'Pimento Verde', 'Chili Picante', 'Frango com Ervas', 'Tomate Fresco', 'Mozzarella'],
    badge: 'Especial do Chef',
    highlightCategory: 'Especialidades'
  },
  {
    id: 'p2',
    name: 'Texas BBQ',
    description: 'Puré de Churrasco Coreano, Salsicha de Frango Fatiada, Frango para Churrasco, Milho Doce, Azeitonas.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_KaQB51sr2ECLDmeVIQSSUav-BG9K8nTy7_m0VWbZpDW22KnaNqoHNd98IdJBjGctMboak5QEh1_h7ce7sEYHXNijjyiIlu79em-TV7P85Legc0cARM3d2CkZWuNc4xjY_GH-pKKl8JiIQwxbieoE99d95NNGvf1SLGhlTFTH9E3o2N_rRjOmQdd7AywYS_QckBclqvf12tGz9eFpCXRqdcUQdRBd4jMmDGu9xRG4oiYjfJp_0aFB3XVcW8IR2lQZarkr8LkCQ',
    category: 'pizza',
    price: 5499,
    prices: { regular: 5499, medium: 7499, large: 10500 },
    prepTime: '15-20 min',
    ingredients: ['Molho BBQ Texas', 'Frango BBQ', 'Salsicha de Frango', 'Milho Doce', 'Azeitonas', 'Queijo'],
    badge: 'Mais Vendido',
    highlightCategory: 'Mais Pedidos'
  },
  {
    id: 'p3',
    name: 'Mexican Passion',
    description: 'Molho Chipotle picante, mini milho, frango mexicano, jalapeno e cogumelos fatiados.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdSm1bFtxS9KfUVWpKDwO-8T0CXDeqbPuI5x4dMnUoT2KqTwrr3APgMBJHPihoVgkpJlb1cmTw0rECjfUNTT4fjUEe69u67RORVGYAujA4tSPThnesZW-AStDfCrJjOX2mBk0SzV8vkxy_24XMkt_EdRoSNZh3r3wJ54ordNL2g8UVGWUjbN6cqCsjN_DDhhpWKIk9NpuQUtFsibzz-7tNBXi2aQ8TU2TkL1DTkTXRBtENBvIx4bS91oatbxP3BdlCeUxObMBl2g',
    category: 'pizza',
    price: 5499,
    prices: { regular: 5499, medium: 7499, large: 10500 },
    prepTime: '18-22 min',
    ingredients: ['Molho Chipotle', 'Frango Mexicano', 'Mini Milho', 'Jalapeños', 'Mozzarella Cremosa'],
    badge: 'Promoção',
    highlightCategory: 'Promoções'
  },
  {
    id: 'p4',
    name: 'Meateor',
    description: 'Salsicha de frango, frango para churrasco, frango mexicano e frango temperado com ervas finas.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAja5SHMWr57SMUojKj52wOmY4zOwbbK6F1R01oa3v3AotbILOpB3WStX6EJ2TI7YzZGSJYNtvdSen5jik409tImarbMlbjwcclcLxh5tMD0nekcrHJ5VMbf1NJlQhPERezty_0oGQlZykPHV8dKyWdiCsl6XPT7YocEgs3zSBTfxSXLRpB9UXvIYpaaUzxNklLdZGoKEStFaAiGU88Oid2cK5Y8kYTPAU7D7xNFAcktOOPPxk8ms0rVa8MDtTVfJ_vaJ9uEOzNNw',
    category: 'pizza',
    price: 6099,
    prices: { regular: 6099, medium: 8200, large: 12000 },
    prepTime: '20 min',
    ingredients: ['Salsicha de Frango', 'Frango BBQ', 'Frango Mexicano', 'Frango com Ervas', 'Massa Tradicional'],
    badge: 'Recomendados pelo Chef',
    highlightCategory: 'Recomendados'
  },
  // Chicken / Combos
  {
    id: 'c1',
    name: 'Combo Hambúrguer',
    description: 'Hambúrguer de frango frito crocante (1 pc), frango frito (1 pc), batata frita e Coca-Cola gelada.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT5JtagW0A0fuzD2HlzDAsaQz61AB-bAMMSzixhFivYc-ZzsPGtCtcZmnbsBdiG8ncYtRKuEnqYImki6ipQa9AitqaGm6fbU-4PJbfIcsAvQUHbixm_T-S20js1STEXimpocgj7B9p14SYmztJysS_0LfU3-M52bCM0vJWJa51pfDkC9_Rilyks9h3MCfvaePniDiTOI5euuOsYAW2-nujPwqtiUkL8AznskKj_Qg5fw4GYpa_RDzHTpD18IzldkUzm4zYecCyzw',
    category: 'chicken',
    price: 3999,
    prepTime: '12-15 min',
    ingredients: ['Peito de Frango Empanado', 'Brioche Toast', 'Salada Fresca', 'Batata Frita', 'Coca-Cola'],
    badge: 'Mais Vendido',
    highlightCategory: 'Mais Pedidos'
  },
  {
    id: 'c2',
    name: 'Balde de Frango (Grande)',
    description: 'Frango Frito (2 peças) ou Tiras de Frango (4 pc) com Batatas Fritas e 2 Coca-Colas.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFuh4706sLbZ-TZUx1iZXajeZ-N_ud1c64eGf7icDvwRKEMawR3i0zUQME1gk5hND4MVTdXTR0Y5vXYklKEndbsIjZDbADzKJpy83I-a_jH7aWlc37wteYuxulyiFqcQedGn-wGSA2-C5A370d1QW5i7nnOru0lIsPEOcHpI1D5n4WO5gMjUbE3jfPuQ0mvgCopsaSqDjQxYUhwivS6lPdZ0JLvLlLCzmfEjjE-26mbGP1nXaEvkRCMr1oK6EfNsIE6IkcU4Vvig',
    category: 'chicken',
    price: 3999,
    prepTime: '15 min',
    ingredients: ['Frango Frito Crocante', 'Batatas Fritas Crocantes', 'Molho Garlic', '2 Refrigerantes'],
    badge: 'Novo',
    highlightCategory: 'Novidades'
  },
  {
    id: 'c3',
    name: 'Tandys Zinger Burger',
    description: 'Filé de peito crocante picante, alface fresca, maionese especial em pão de brioche tostado.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUAeih02hgYGXNrG4g_DsgcKKEdc4Hwduj0HwAKEVzjSZ8LMgPzkMfYboPsLZh7RDwu5bDdKNRpWcLFxSOkkorcPwanKfwMpJrfJMGqDjir6pg0Evlx_8FfxsZIfuFcB06tOWBn-BJpGtsMXDNiWHR2m4L9xOfmG_v-qOACjwyvGETmjcT-UolmmPRGyAwUpqPi3hAXIOaRby6p_Tc-AcRB7jOI6r6cwN0qgkruVLOybl1_hP4Olfif1T2RMP7ZSCk50rbPOBN9w',
    category: 'chicken',
    price: 2800,
    prepTime: '10-12 min',
    ingredients: ['Filé Zinger Picante', 'Pão Brioche', 'Alface Americana', 'Maionese Tandy Especial'],
    badge: 'Especial do Chef',
    highlightCategory: 'Especialidades'
  },
  {
    id: 'c4',
    name: 'Family Feast Bucket',
    description: '8 Pedaços de Frango Frito, 2 Batatas Grandes, 1 Coleslaw Grande, 4 Pães de Manteiga.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUAeih02hgYGXNrG4g_DsgcKKEdc4Hwduj0HwAKEVzjSZ8LMgPzkMfYboPsLZh7RDwu5bDdKNRpWcLFxSOkkorcPwanKfwMpJrfJMGqDjir6pg0Evlx_8FfxsZIfuFcB06tOWBn-BJpGtsMXDNiWHR2m4L9xOfmG_v-qOACjwyvGETmjcT-UolmmPRGyAwUpqPi3hAXIOaRby6p_Tc-AcRB7jOI6r6cwN0qgkruVLOybl1_hP4Olfif1T2RMP7ZSCk50rbPOBN9w',
    category: 'chicken',
    price: 9500,
    prepTime: '20 min',
    ingredients: ['8 Pedaços de Frango Crocante', 'Batatas Fritas XXL', 'Salada Coleslaw', 'Pães Especiais'],
    badge: 'Promoção',
    highlightCategory: 'Promoções'
  },
  // Wings
  {
    id: 'w1',
    name: 'American Nashville Hot Wings',
    description: '6 Asas de frango crocantes envolvidas com o famoso e incrivelmente picante molho de Nashville.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz18YeI_2VeX4xeQ6UYi5uZEcp0JlaxCPGBq27ojBKyLPUHn5EnPfIHmDWkq90B8aCdSnCNnt4pxyQC9ZaJ05_qK96i5qyG_VM_Q97bESNRn3eeCTdvtA72hiujO2D8I73Q6WIEI5qM6cxoWKTqFJoMhJaSR3InGZuRABWftiOGSQILsQCRqxyi4Kk8x6WpIoIEppEs51_u38kw2x70pT77E4wy44wIDWQU21jALBTjNsKBlXtedZe9z9jizmPgm-t8YqSzooxgw',
    category: 'wings',
    spicy: true,
    price: 2499,
    prepTime: '12 min',
    ingredients: ['6 Asas Selecionadas', 'Molho Nashville Hot', 'Pimenta Malagueta', 'Pica-pau verde'],
    badge: 'Novo',
    highlightCategory: 'Novidades'
  },
  // Desserts
  {
    id: 's1_brownie',
    name: 'Brownie Supremo com Gelado',
    description: 'Brownie quente de chocolate belga acompanhado de uma bola de gelado de baunilha e calda de chocolate.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    category: 'desserts',
    price: 2200,
    prepTime: '8 min',
    ingredients: ['Chocolate Amargo Belga', 'Gelado de Baunilha', 'Calda Quente', 'Noses Tostadas'],
    badge: 'Recomendados pelo Chef',
    highlightCategory: 'Recomendados'
  },
  {
    id: 's2_mousse',
    name: 'Mousse de Maracujá Cremosa',
    description: 'Mousse leve e refrescante com calda artesanal de maracujá fresco e sementes estaladiças.',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&q=80&w=800',
    category: 'desserts',
    price: 1800,
    prepTime: '5 min',
    ingredients: ['Maracujá Natural', 'Leite Condensado', 'Creme de Leite', 'Sementes Crocantes'],
    badge: 'Mais Vendido',
    highlightCategory: 'Mais Pedidos'
  },
  // Drinks
  {
    id: 'd1',
    name: 'Coca-Cola',
    description: 'Lata 330ml gelada',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD154OycaMz-8JVH7DmbEmsWGnUaVIHpgCZZ_PUvVkg3s9551vy0aDdF-iZBX0nz3SSpCSJSlJ5ddiewveTb77NgJ2bJ4Ns1Uwk3bxWLVqMIfpKKvVe5XKugz2UO0aSiE_1w4Amcd4xBqekvIxw2TbtmFJneisTYAdZTYV0rQpacoUtkkKf-4lB4HEfHdCXc1bfDmNtNiWmIABg-AM7LXgJSKCCc4VY5-W6g6dyjlvS9YY1ZHFL4VTxHvsuAKmrcxGy7gLhiukoVw',
    category: 'drinks',
    price: 500,
    prepTime: '2 min',
    ingredients: ['Lata 330ml'],
  },
  {
    id: 'd2',
    name: 'Fanta Laranja',
    description: 'Lata 330ml gelada',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3DHiigtDmhP0tHHz384znLohDR6gcQ92TsxjbmKN__rS7EAOsYBPnrtvIMuUs66vfTH0hH42s7MMqjhmxQPCQDB2-Oma3IznoX8oEp2wiCk82w1Q8KbH66NbB2bIwv6xpGzEbNVYgD_WmWemSnHHjmGqacZfgVM8rzYL1OvlNnL2ZclVSlspjJ0F9bjuuPmxzUgPU2tOJ8mZAXReYWxcCGnToqBJ25H81AakfblRUdg7LhNlSyqyGEMI5X3SOf5_ghyDKuZmo6w',
    category: 'drinks',
    price: 500,
    prepTime: '2 min',
    ingredients: ['Lata 330ml'],
  },
  {
    id: 'd3',
    name: 'Sprite',
    description: 'Lata 330ml gelada',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb3NoaR9FoAFWFH8SNZdewL5Qtlv5TZ3TVMV-IBguLqEJg5l753aekDCdQexiQ4btVTOe9Hqoxb0npDPkVoIaYqZzqbqy7ff3xECp1xeoxppAAdAFn0EU2de1rN00q9z0dy07nRwuE5IfXldNcD5BE2Y-abMwCisxLAYA1Zi4zlF1QXzrPR-XKRoq5EJYt9Qf5NDW_UY6Ogc52ZLj4-dD4qEz6WgLZ5kydBczNNw5sK4WZkIdJrGzCxYta4U9wV_HNvvaBeWAisQ',
    category: 'drinks',
    price: 500,
    prepTime: '2 min',
    ingredients: ['Lata 330ml'],
  },
  {
    id: 'd4',
    name: 'Água Mineral',
    description: 'Garrafa 500ml',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDODdGAMiDyp3HFBaXxPJv433aUhLcH0ywiC7JwJk_3-BD9zCqt3cx1kJY1rHeagaKkeOH9O4yoQFQe6fIIXWlkqI8sDa3rxd38wX88vBgie6vxMetII6tOpfcVIqIQs3m-n81u2E7ie9mJkqbdX283wa0TT3TqtRk9995nKGEWlCM7jWpdXyBTU2zqLRMMkQ_Ke1dqZaMcfKghnM7zFWCdRj6UR93xoyinyWGtRSmA2Zxnn4_H2MHKq5SiOS1R4Hgh3fx-kWkVRg',
    category: 'drinks',
    price: 300,
    prepTime: '1 min',
    ingredients: ['Garrafa 500ml']
  }
];