// 1,2,3是kitty kibble, sashimi, dried fish
// 4,5,6是shiny cat tree, mouse, ball

const itemList = [
    {
        id: 1,
        name: "Kitty Kibble",
        img: "/img/1.jpg",
        des: 'Crunchy bites for happy!',
        reward: ''
    },
    {
        id: 2,
        name: "Sashimi",
        img: "/img/2.jpg",
        des: 'Sliced from fish, with the wasabi removed.',
        reward: ''
    },
    {
        id: 3,
        name: "Dried Fish",
        img: "/img/3.jpg",
        des: 'Sourced from the freshest catch and dried to perfection.',
        reward: ''
    },
    //toys 按照文档里的进行排序
    {
        id: 4,
        name: "Ballon",
        img: "/img/4.jpg",
        des: 'The kitty loves ballon',
        reward: '500'
    },
    {
        id: 5,
        name: "Crystal Ball",
        img: "/img/5.jpg",
        des: '"Kitty loves chasing it',
        reward: '800'
    },
    {
        id: 6,
        name: "Shiny Cat Tree",
        img: "/img/6.jpg",
        des: '"Climb, scratch,and play freely!',
        reward: '1500'

    },

    {
        id: 7,
        name: "Teaser",
        img: "/img/4.jpg",
        des: '"It drives kitty crazy',
        reward: '800'
    },
    {
        id: 8,
        name: "Mouse Doll",
        img: "/img/5.jpg",
        des: 'Soft to be biten',
        reward: '800'

    },
    {
        id: 9,
        name: "Bunny Doll",
        img: "/img/6.jpg",
        des: 'Think it will jump',
        reward: '800'

    },



    {
        id: 10,
        name: "Shopping-box",
        img: "/img/4.jpg",
        des: 'Empty of stuff and yet full of mystery',
        reward: '1000'

    },
    {
        id: 11,
        name: "Tunnel（T Piece）",
        img: "/img/5.jpg",
        des: 'A tunnel shaped like the letter T',
        reward: '1200'

    },

    // 家具
    {
        id: 12,
        name: "Egg Bed(Pink)",
        img: "/img/6.jpg",
        des: 'Tucked in a soft fluffy bed, a sweet dream is guaranteed.',
        reward: '1200'

    },




    {
        id: 13,
        name: "Egg Bed(Night)",
        img: "/img/4.jpg",
        des: '"Soft bed with a incredible nitghtview',
        reward: '1500'

    },
    {
        id: 14,
        name: "Hammock",
        img: "/img/5.jpg",
        des: 'Kitty loves lying on it.',
        reward: '1200'
    },
    {
        id: 15,
        name: "Tart Bed",
        img: "/img/6.jpg",
        des: 'A soft bed with tart design',
        reward: '800'
    },



    {
        id: 16,
        name: "Tent(Nature)",
        img: "/img/4.jpg",
        des: 'A classic tent makes Kitty feel safe.',
        reward: '800'
    },
    {
        id: 17,
        name: "Tent (Modern Red)",
        img: "/img/5.jpg",
        des: 'A pleasantly cool pop tent is best described as modern.',
        reward: '1000'
    },
    {
        id: 18,
        name: "Antique Chair",
        img: "/img/6.jpg",
        des: 'Old-fashioned noble armchair ',
        reward: '2000'
    },

    {
        id: 19,
        name: "Earthenware pot",
        img: "/img/6.jpg",
        des: "The pot's opening is just the right size for a cat.",
        reward: '800'
    },



];

export const getItem = (id: number) => {
    const item = itemList.find((item) => id === item.id);
    return item;
};