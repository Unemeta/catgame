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
    {
        id: 4,
        name: "Shiny Cat Tree",
        img: "/img/4.jpg",
        des: 'Climb, scratch, and play freely!'
    },
    {
        id: 5,
        name: "Mouse",
        img: "/img/5.jpg",
        des: 'Designed to mimic real prey！'
    },
    {
        id: 6,
        name: "Ball",
        img: "/img/6.jpg",
        des: 'Encourages active chasing and swatting！'
    },
];

export const getItem = (id: number) => {
    const item = itemList.find((item) => id === item.id);
    return item;
};