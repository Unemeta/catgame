// 1,2,3是kitty kibble, sashimi, dried fish
// 4,5,6是shiny cat tree, mouse, ball

const itemList = [
    {
        id: 1,
        name: "Kitty Kibble",
        img: "/img/1.jpg",
        des: 'Crunchy bites for happy!'
    },
    {
        id: 2,
        name: "Sashimi",
        img: "/img/2.jpg",
        des: 'Sliced from fish, with the wasabi removed.'
    },
    {
        id: 3,
        name: "Dried Fish",
        img: "/img/3.jpg",
        des: 'Sourced from the freshest catch and dried to perfection.'
    },
    //toys 按照文档里的进行排序
    {
        id: 4,
        name: "Ballon",
        img: "/img/4.jpg",
        des: 'The kitty loves ballon'
    },
    {
        id: 5,
        name: "Crystal Ball",
        img: "/img/5.jpg",
        des: '"Kitty loves chasing it'
    },
    {
        id: 6,
        name: "Shiny Cat Tree",
        img: "/img/6.jpg",
        des: '"Climb, scratch,and play freely!'
    },

    {
        id: 7,
        name: "Teaser",
        img: "/img/4.jpg",
        des: '"It drives kitty crazy'
    },
    {
        id: 8,
        name: "Mouse Doll",
        img: "/img/5.jpg",
        des: 'Soft to be biten'
    },
    {
        id: 9,
        name: "Bunny Doll",
        img: "/img/6.jpg",
        des: 'Think it will jump'
    },



    {
        id: 10,
        name: "Shopping-box",
        img: "/img/4.jpg",
        des: 'Empty of stuff and yet full of mystery'
    },
    {
        id: 11,
        name: "Tunnel（T Piece）",
        img: "/img/5.jpg",
        des: 'A tunnel shaped like the letter T'
    },

    // 家具
    {
        id: 12,
        name: "Egg Bed(Pink)",
        img: "/img/6.jpg",
        des: 'Tucked in a soft fluffy bed, a sweet dream is guaranteed.'
    },




    {
        id: 13,
        name: "Egg Bed(Night)",
        img: "/img/4.jpg",
        des: '"Soft bed with a incredible nitghtview'
    },
    {
        id: 14,
        name: "Hammock",
        img: "/img/5.jpg",
        des: 'Kitty loves lying on it.'
    },
    {
        id: 15,
        name: "Tart Bed",
        img: "/img/6.jpg",
        des: 'A soft bed with tart design'
    },



    {
        id: 16,
        name: "Tent(Nature)",
        img: "/img/4.jpg",
        des: 'A classic tent makes Kitty feel safe.'
    },
    {
        id: 17,
        name: "Tent (Modern Red)",
        img: "/img/5.jpg",
        des: 'A pleasantly cool pop tent is best described as modern.'
    },
    {
        id: 18,
        name: "Antique Chair",
        img: "/img/6.jpg",
        des: 'Old-fashioned noble armchair '
    },

    {
        id: 19,
        name: "Earthenware pot",
        img: "/img/6.jpg",
        des: "The pot's opening is just the right size for a cat."
    },



];

export const getItem = (id: number) => {
    const item = itemList.find((item) => id === item.id);
    return item;
};