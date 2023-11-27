import hamburguer_2 from '../assets/hamburguer - Product/receita-ceboloni-bacon.jpg'
import hamburguer_1 from '../assets/hamburguer - Product/dia-do-hamburguer-13-lugares-descolados-em-sp-910x607.jpg'
import hamburguer_3 from '../assets/hamburguer - Product/L3LYN5Y4MRG6BB47MNHEEXDRGA.jpg'
import hamburguer_4 from '../assets/hamburguer - Product/receita-ceboloni-bacon.jpg'
import hamburguer_5 from '../assets/hamburguer - Product/Hamburguer-Caseiro-scaled.jpg'

import combo_1 from '../assets/hamburguer - Product/combo.jpg'
import combo_2 from '../assets/hamburguer - Product/combo2.jpg'
import combo_3 from '../assets/hamburguer - Product/combo3.jpg'
import combo_4 from '../assets/hamburguer - Product/combo4.jpg'

import bebida_1 from '../assets/bebida/com_file_.jpg'
import bebida_2 from '../assets/bebida/cocaLata.png'
import bebida_3 from '../assets/bebida/pepsi.png'

import acai_1 from '../assets/açai/acaiTigela2.png'
import acai_2 from '../assets/açai/açai.png'
import acai_3 from '../assets/açai/açai_tigela.png'

const listFood = [
    {
        id: 1,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: hamburguer_1,
        name: 'Brazilian BBQ Burger',
        price: 20,
        type: 'burguer'
    },
    {
        id: 2,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: hamburguer_2,
        name: 'Mediterranean Sunshine Burger',
        price: 20.53,
        type: 'burguer'

    }
    ,
    {
        id: 3,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: hamburguer_3,
        name: 'Vegan Tropical Bliss Burger',
        price: 32.44,
        type: 'burguer'

    }
    ,
    {
        id: 4,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: hamburguer_4,
        name: 'Asian Fusion Delight Burger',
        price: 27.70,
        type: 'burguer'

    }
    ,
    {
        id: 5,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: hamburguer_5,
        name: 'Gourmet Coffee Infusion Burger',
        price: 17.90,
        type: 'burguer'

    }
    ,
    {
        id: 6,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: combo_1,
        name: 'Gourmet Coffee Infusion Burger',
        price: 17.90,
        type: 'comb'

    }
    ,
    {
        id: 7,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: combo_2,
        name: 'COMBO burgue X',
        price: 37.90,
        type: 'comb'

    }
    ,
    {
        id: 8,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: combo_3,
        name: 'COMBO Gourmet Coffee  ',
        price: 47.90,
        type: 'comb'

    }
    ,
    {
        id: 9,
        description: 'Pão de brioche, hambúrguer artesanal de 130g grelhado, queijo prato gratinado, alface, tomate, picles, cebola caramelizada, maionese caseira, barbecue. Acompanha fritas 200g, 3 anéis de cebola fritos e 1 refri lata.',
        img: combo_4,
        name: 'COMBO Gourmet Infusion Burger',
        price: 37.90,
        type: 'comb'

    }
    ,

    {
        id: 10,
        description: 'coca-cola de 1,5 litros',
        img: bebida_1,
        name: 'Coca-Cola 1,5L',
        price: 6,
        type: 'drink'
    },
    {
        id: 11,
        description: 'coca-cola de 2 litros',
        img: bebida_1,
        name: 'Coca-Cola 2L',
        price: 8.50,
        type: 'drink'

    },
    {
        id: 12,
        description: 'Coca cola 350ml',
        img: bebida_2,
        name: 'Coca-Cola 2L',
        price: 8.50,
        type: 'drink'

    },
    {
        id: 13,
        description: 'Pepsi 350ml',
        img: bebida_3,
        name: 'Pepsi',
        price: 8.50,
        type: 'drink'

    },
    {
        id: 14,
        description: 'O açaí tradicional é uma opção clássica, conhecida por sua textura cremosa e sabor rico e frutado. Originário da região amazônica, este açaí é frequentemente servido em tigelas com complementos como granola, banana e mel, proporcionando uma combinação equilibrada de doçura e energia.l',
        img: acai_3,
        name: 'Açai 350ml',
        price: 18.50,
        type: 'acai'

    },
    {
        id: 15,
        description: 'A versão com frutas tropicais eleva a experiência do açaí ao incorporar uma variedade de frutas frescas, como morangos, kiwi e abacaxi. Essa combinação acrescenta camadas de sabores vibrantes, criando uma tigela refrescante e repleta de nutrientes, perfeita para aqueles que buscam uma opção mais tropical.',
        img: acai_2,
        name: 'Açai 1L',
        price: 23.50,
        type: 'acai'

    },
    {
        id: 16,
        description: 'A variante gourmet do açaí é conhecida por suas adições indulgentes, como pedaços de brownie, lascas de coco torrado e até mesmo calda de chocolate. Essa versão mais indulgente oferece uma experiência decadente, equilibrando a cremosidade do açaí com a riqueza de sabores adicionais para um deleite verdadeiramente luxuoso.',
        img: acai_1,
        name: 'Açai 500ML',
        price: 32.50,
        type: 'acai'

    }
]
export default listFood;
